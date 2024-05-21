"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";

import GOOGLE_ICON from "@/assets/images/google.png";
import CookieHandler, { TOKEN } from "@/helpers/cookie";
import LocalStorageHandler, {
    REFRESH_TOKEN,
    USER,
} from "@/helpers/localStorage";
import { AuthRequest, googleSignIn, login } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "../common/icon";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { toastError } from "@/helpers/toasts";
import { useGoogleLogin } from "@react-oauth/google";
import { SyntheticEvent, useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/AuthContext";

interface UserAuthLoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const FormSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
    password: z.string().min(6, {
        message: "Your password must be at least 6 characters.",
    }),
});

export function UserAuthLoginForm({
    className,
    ...props
}: UserAuthLoginFormProps) {
    const { setIsLoggedIn } = useAuthContext();

    const [redirectUrl, setRedirectUrl] = useState('/');

    useEffect(() => {
        if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const redirect = searchParams.get('redirect') ?? '/';
        setRedirectUrl(redirect);
        }
    }, []);
    const { replace } = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginMutation = useMutation({
        mutationFn: (authData: Pick<AuthRequest, "email" | "password">) =>
            login(authData),
        mutationKey: ["login"],
        onSuccess(data, variables, context) {
            setIsLoggedIn(true);
            CookieHandler.set(TOKEN, data?.accessToken);
            LocalStorageHandler.set(REFRESH_TOKEN, data?.refreshToken);
            LocalStorageHandler.set(USER, data?.user);
            replace(redirectUrl);
        },
        onError: (error, variables, _context) => {
            form.reset({ ...variables });
            toastError(error?.message ?? "Oop's! Something went wrong");
        },
    });

    const googleSignInMutaion = useMutation({
        mutationFn: (token: string) => googleSignIn(token),
        mutationKey: ["login-google"],
        onSuccess(data, variables, context) {
            setIsLoggedIn(true);
            CookieHandler.set(TOKEN, data?.accessToken);
            LocalStorageHandler.set(REFRESH_TOKEN, data?.refreshToken);
            LocalStorageHandler.set(USER, data?.user);
            replace(redirectUrl);
        },
        onError: (error, variables, _context) => {
            toastError(
                error?.message ?? "Oop's! Something wrong when try to login with google"
            );
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        loginMutation.mutate(data);
    };

    const loginGg = useGoogleLogin({
        onSuccess: (tokenResponse: any) => {
            // Example data
            // const response = {
            //   access_token:
            //     "ya29.a0Ad52N390T-FXqqs4X4qNgUW6njOpun9x9-Kbg8wfwAQ6yLTarSzwD74QuDNqUHNV42QLEMZKv3qDZSQp3tI6HxZOZ8DEDtJNVRsJZxHrjQ3BM8u2IPdJez0q7evryq7Azea_AvvKBlXk83pcFmmmAM34wvQEFFD6mQaCgYKAS4SARESFQHGX2MiuNlrX9z8pNbpG7m4i_X7qQ0169",
            //   token_type: "Bearer",
            //   expires_in: 3599,
            //   scope:
            //     "email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
            //   authuser: "0",
            //   prompt: "consent",
            // };
            console.log("-----google-signin-----", tokenResponse);
            googleSignInMutaion.mutate(tokenResponse?.access_token);
        },
    });

    const onGoogleSignIn = (e: SyntheticEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        loginGg();
    };

    return (

        <div
            className={cn("grid gap-6 w-full md:max-w-md md:w-full", className)}
            {...props}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Email address"
                                        type="email"
                                        className="h-14 py-3 px-4 font-satoshi dark:shadow-gray-400"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            className="h-14 py-3 px-4 font-satoshi dark:shadow-gray-400"
                                            {...field}
                                        />
                                        <span className="absolute right-6 text-base text-secondary font-medium top-1/2 -translate-y-1/2 cursor-pointer font-satoshi">
                                            Forgot Password?
                                        </span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={form.formState.isSubmitSuccessful}
                        type="submit"
                        className="w-full mt-9 h-14 py-3 px-4 font-bold text-base"
                    >
                        {form.formState.isSubmitSuccessful ? (
                            <Icons.spinner className="mr-2 h-4 w-full animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        onClick={onGoogleSignIn}
                        type="button"
                        className="w-full mt-9 h-14 py-3 px-4 font-bold border border-grGray flex items-center justify-center gap-2 text-base"
                    >
                        <Image src={GOOGLE_ICON} width={26} height={26} alt="" style={{width: 'auto', height:'auto'}} />
                        <span>Sign In with Google</span>
                    </Button>

                    <Link
                        href="/sign-up"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full mt-9 h-14 py-3 px-4 font-bold text-secondary text-base dark:text-white"
                        )}
                    >
                        Create new Account
                    </Link>
                </form>
            </Form>
        </div>
    );
}
