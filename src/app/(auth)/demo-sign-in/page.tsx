"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use next/navigation for /app directory
import { useToast } from "@/components/ui/use-toast";
import { signInSchema } from "@/schemas/signInschema";
import { useEffect, useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();

  // Initialize the form using zod for validation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const [redirect, setRedirect] = useState(false);

  // Handle form submission and sign-in logic
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false, // Disable automatic redirect by next-auth
      identifier: data.identifier,
      password: data.password,
    });

    // If there is an error, display the toast message
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    // If login is successful and a redirect URL is present, set redirect state
    if (result?.url) {
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (redirect && typeof window !== "undefined") {
      setTimeout(() => {
        router.replace("/dashboard"); // Replace to avoid browser back navigation
      }, 500); // Delay to ensure the page is fully rendered
    }
  }, [redirect, router]);

  return (
    <div>
      {/* Main form container */}
      <div className="flex justify-center items-center min-h-screen bg-gray-800 login-background">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              FeedBack Genius
            </h1>
            <p className="mb-4">Sign in to embark on your Secret Success</p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Identifier (Email/Username) Field */}
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email/Username (&apos;testuser&apos; for demo)
                    </FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password (&apos;testuser123&apos; for demo)
                    </FormLabel>
                    <Input type="password" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sign In Button */}
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </form>
          </Form>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p>
              Make sure to Join us Here First!{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
