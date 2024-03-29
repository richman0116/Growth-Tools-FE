"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
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
import GOOGLE_ICON from "@/assets/images/google.png";
import Image from "next/image";
import Link from "next/link";

interface UserAuthLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
  password: z.string().min(8, {
    message: "Your password must be at least 8 characters.",
  }),
});

export function UserAuthLoginForm({
  className,
  ...props
}: UserAuthLoginFormProps) {
  const { replace } = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const loginMutation = useMutation({
  //   mutationFn: (authData: AuthRequest) => login(authData),
  //   mutationKey: ["login"],
  //   onSuccess(data, variables, context) {
  //     setCookieToken(data?.access_token);
  //     replace("/");
  //   },
  //   onError: (_error, variables, _context) => {
  //     form.reset({ ...variables });
  //   },
  // });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
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
                    className="h-14 py-3 px-4"
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
                      className="h-14 py-3 px-4"
                      {...field}
                    />
                    <span className="absolute right-6 text-base text-secondary font-medium top-1/2 -translate-y-1/2 cursor-pointer">
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
            className="w-full mt-9 h-14 py-3 px-4 font-bold border border-grGray flex items-center justify-center gap-2 text-base"
          >
            <Image src={GOOGLE_ICON} width={26} height={26} alt="" />
            <span>Sign In with Google</span>
          </Button>

          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full mt-9 h-14 py-3 px-4 font-bold text-secondary text-base"
            )}
          >
            Create new Account
          </Link>
        </form>
      </Form>
    </div>
  );
}
