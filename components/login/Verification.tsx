"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchema, type OtpFormData } from "@/types/auth";
import { showToast } from "@/lib/toast";
import { Loader2 } from "lucide-react";

interface VerificationProps {
  userEmail: string;
  onBack: () => void;
}

export default function Verification({ userEmail, onBack }: VerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const router = useRouter();

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleOtpVerification = async (data: OtpFormData) => {
    if (!signUp) {
      showToast.error("Verification is not available");
      return;
    }

    setIsVerifying(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (result.status === "complete") {
        await setActiveSignUp({ session: result.createdSessionId });
        showToast.success("Email verified! Account created successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid verification code";
      showToast.error(message);
      otpForm.reset();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!signUp) return;

    setIsResending(true);
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      showToast.info("Verification code resent to your email");
    } catch {
      showToast.error("Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Verify Your Email
        </h1>
        <p className="text-base text-black dark:text-white">
          Enter the verification code sent to {userEmail}
        </p>
      </div>

      <Form {...otpForm}>
        <form onSubmit={otpForm.handleSubmit(handleOtpVerification)} className="space-y-6">
          <FormField
            control={otpForm.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white text-center block">
                  Verification Code
                </FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isVerifying}
                  >
                    <InputOTPGroup className="w-full gap-2">
                      <InputOTPSlot index={0} className="flex-1 h-12 rounded-lg" />
                      <InputOTPSlot index={1} className="flex-1 h-12 rounded-lg" />
                      <InputOTPSlot index={2} className="flex-1 h-12 rounded-lg" />
                      <InputOTPSlot index={3} className="flex-1 h-12 rounded-lg" />
                      <InputOTPSlot index={4} className="flex-1 h-12 rounded-lg" />
                      <InputOTPSlot index={5} className="flex-1 h-12 rounded-lg" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-linear-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white h-11 rounded-md"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {isResending && <Loader2 className="h-3 w-3 animate-spin" />}
              Resend Code
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onBack}
              disabled={isVerifying || isResending}
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back to Sign Up
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

