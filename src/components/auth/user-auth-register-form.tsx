"use client";

import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";

import GOOGLE_ICON from "@/assets/images/google.png";
import { zodResolver } from "@hookform/resolvers/zod";
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

interface UserAuthRegisterFormProps extends HTMLAttributes<HTMLDivElement> {}

const FormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
    password: z.string().min(8, {
      message: "Your password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Your password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function UserAuthRegisterForm({
  className,
  ...props
}: UserAuthRegisterFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // const registerMutation = useMutation({
  //   mutationFn: (authData: AuthRequest) => register(authData),
  //   mutationKey: ["register"],
  //   onSuccess(data, _variables, _context) {
  //     setSuccessRegiser(true);
  //     form.reset();
  //   },
  //   onError(data) {
  //     toastError(data?.message ?? "Oop's! Something wrong");
  //     form.reset();
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
                  <Input
                    placeholder="Password"
                    type="password"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    className="h-14 py-3 px-4"
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
          >
            <Image src={GOOGLE_ICON} width={26} height={26} alt="" />
            <span>Sign In with Google</span>
          </Button>

          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full mt-9 h-14 py-3 px-4 font-bold text-secondary text-base"
            )}
          >
            Already have an account?
          </Link>
        </form>
      </Form>
    </div>
  );
}
