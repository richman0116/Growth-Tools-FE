"use client";

import { HTMLAttributes, SyntheticEvent } from "react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";

import GOOGLE_ICON from "@/assets/images/google.png";
import CookieHandler, { TOKEN } from "@/helpers/cookie";
import { toastError, toastSuccess } from "@/helpers/toasts";
import { AuthRequest, googleSignIn, register } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import LocalStorageHandler, {
  REFRESH_TOKEN,
  USER,
  ADMIN
} from "@/helpers/localStorage";
import { useAuthContext } from "@/hooks/AuthContext";
import { Router } from "lucide-react";

interface UserAuthRegisterFormProps extends HTMLAttributes<HTMLDivElement> {}

const FormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
    phone: z.string().min(1, { message: "This field has to be filled." }),
    password: z.string().min(6, {
      message: "Your password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Your password must be at least 6 characters.",
    }),
    firstName: z.string(),
    lastName: z.string(),
    company: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function UserAuthRegisterForm({
  className,
  ...props
}: UserAuthRegisterFormProps) {
  const router = useRouter();
  const { replace } = useRouter();
  const { setIsLoggedIn, setIsAdmin } = useAuthContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      firstName: "string",
      lastName: "string",
      company: "string",
    },
  });

  const registerMutation = useMutation({
    mutationFn: (authData: AuthRequest) => register(authData),
    mutationKey: ["register"],
    async onSuccess(data, _variables, _context) {

      const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;

      if (!apiKey) {
        console.log('API key is missing');
        return;
      }

      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'api-key': apiKey,
        }),
        body: JSON.stringify({
          email: _variables.email,
          // listIds: [2],  // Replace with your actual list ID
          updateEnabled: true,
        }),
      });

      if (response.ok) {
        console.log('Subscription successful!');
      } else {
        const errorData = await response.json();
        console.log(`Subscription failed: ${errorData.message}`);
      }

      toastSuccess("Create user successfully!, you can login now");
      router.push('sign-in')
      form.reset();
    },
    onError(data) {
      toastError(data?.message ?? "Oop's! Something wrong");
      form.reset();
    },
  });

  const googleSignInMutaion = useMutation({
    mutationFn: (token: string) => googleSignIn(token),
    mutationKey: ["login-google"],
    onSuccess(data, variables, context) {
      setIsLoggedIn(true);
      const userInfo: any = data;
      const email = userInfo.user.email;
      if (email && (email === "testaustin@test.com" || email === "admin@gmail.com")) {
          setIsAdmin(true)
          LocalStorageHandler.set(ADMIN, "admin");
      }
      CookieHandler.set(TOKEN, data?.accessToken);
      LocalStorageHandler.set(REFRESH_TOKEN, data?.refreshToken);
      LocalStorageHandler.set(USER, JSON.stringify(data?.user));
      replace("/");
    },
    onError: (error, variables, _context) => {
      toastError(
        error?.message ?? "Oop's! Something wrong when try to login with google"
      );
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    registerMutation.mutate(data);
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone number"
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
                  <Input
                    placeholder="Password"
                    type="password"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    className="h-14 py-3 px-4 font-satoshi dark:shadow-gray-400"
                    {...field}
                  />
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
              "Sign Up"
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full mt-9 h-14 py-3 px-4 font-bold border border-grGray flex items-center justify-center gap-2 text-base"
            onClick={onGoogleSignIn}
            type="button"
          >
            <Image src={GOOGLE_ICON} width={26} height={26} alt="" style={{ width:'auto', height:'auto'}}/>
            <span>Sign In with Google</span>
          </Button>

          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full mt-9 h-14 py-3 px-4 font-bold text-secondary text-base dark:text-white"
            )}
          >
            Already have an account?
          </Link>
        </form>
      </Form>
    </div>
  );
}
