"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, type LoginFormData } from "@/types/auth";
import { showToast } from "@/lib/toast";
import Verification from "./Verification";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const { signIn, setActive } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const router = useRouter();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  const validateForm = (data: LoginFormData) => {
    if (isSignUp && !data.agreeToTerms) {
      loginForm.setError("agreeToTerms", {
        message: "You must agree to the terms and conditions",
      });
      return false;
    }
    return true;
  };

  const handleSignUp = async (data: LoginFormData) => {
    if (!signUp) {
      showToast.error("Sign up is not available");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActiveSignUp({ session: result.createdSessionId });
        showToast.success("Account created successfully!");
        router.push("/dashboard");
      } else if (result.status === "missing_requirements") {
        if (result.unverifiedFields?.includes("email_address")) {
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
          setUserEmail(data.email);
          setShowOtp(true);
          showToast.info("Verification code sent to your email");
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign up failed";
      showToast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = async (data: LoginFormData) => {
    if (!signIn) {
      showToast.error("Sign in is not available");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        if (result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
          showToast.success("Logged in successfully!");
          router.push("/dashboard");
        } else {
          showToast.error("Session creation failed. Please try again.");
        }
      } else if (result.status === "needs_first_factor") {
        showToast.info("Please complete multi-factor authentication.");
      } else if (result.status === "needs_second_factor") {
        showToast.info("Please complete second factor authentication.");
      } else {
        showToast.warning("Sign in incomplete. Please try again.");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      
      let errorMessage = "Sign in failed. Please check your credentials.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "errors" in error
      ) {
        const errors = error.errors as Array<{ message?: string; code?: string }>;
        if (errors && errors.length > 0) {
          errorMessage = errors[0].message || errors[0].code || errorMessage;
        }
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = String(error.message);
      }

      showToast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    try {
      if (isSignUp && signUp) {
        signUp.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/dashboard",
          redirectUrlComplete: "/dashboard",
        });
      } else if (signIn) {
        signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/dashboard",
          redirectUrlComplete: "/dashboard",
        });
      }
    } catch {
      showToast.error("Failed to initiate Google sign in");
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookSignIn = () => {
    setIsFacebookLoading(true);
    try {
      if (isSignUp && signUp) {
        signUp.authenticateWithRedirect({
          strategy: "oauth_facebook",
          redirectUrl: "/dashboard",
          redirectUrlComplete: "/dashboard",
        });
      } else if (signIn) {
        signIn.authenticateWithRedirect({
          strategy: "oauth_facebook",
          redirectUrl: "/dashboard",
          redirectUrlComplete: "/dashboard",
        });
      }
    } catch {
      showToast.error("Failed to initiate Facebook sign in");
      setIsFacebookLoading(false);
    }
  };

  const onSubmit = (data: LoginFormData) => {
    if (!validateForm(data)) {
      return;
    }

    if (isSignUp) {
      handleSignUp(data);
    } else {
      handleSignIn(data);
    }
  };

  if (showOtp) {
    return (
      <Verification
        userEmail={userEmail}
        onBack={() => {
          setShowOtp(false);
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Welcome Back
        </h1>
        <p className="text-base text-black dark:text-white">
          {isSignUp ? "Sign Up For Free" : "Sign In to Your Account"}
        </p>
      </div>

      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-black dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-black dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isSignUp && (
            <FormField
              control={loginForm.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-primary data-[state=checked]:bg-primary"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-black dark:text-white font-normal cursor-pointer">
                      I agree to all Term, Privacy Policy and fees
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-linear-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white h-11 rounded-md disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </>
            ) : (
              isSignUp ? "Get Started" : "Sign In"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-black px-2 text-muted-foreground">
            OR
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          disabled={isGoogleLoading || isFacebookLoading || isSubmitting}
          className="w-full bg-white dark:bg-black border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-black dark:text-white h-11 rounded-md disabled:opacity-50"
          onClick={handleGoogleSignIn}
        >
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          )}
          Sign in with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={isGoogleLoading || isFacebookLoading || isSubmitting}
          className="w-full bg-white dark:bg-black border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-black dark:text-white h-11 rounded-md disabled:opacity-50"
          onClick={handleFacebookSignIn}
        >
          {isFacebookLoading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          )}
          Sign in with Facebook
        </Button>
      </div>

      <div className="text-center text-sm">
        <span className="text-black dark:text-white">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
        </span>
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            loginForm.reset();
          }}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
