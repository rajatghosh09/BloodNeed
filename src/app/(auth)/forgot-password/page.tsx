"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { toast } from "sonner";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Mail, LoaderCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/lib/auth.query";

const forgotSchema = yup.object({
  email: yup.string().trim().email("Invalid email").required("Email is required"),
});

interface ForgotFormValues {
  email: string;
}

const ForgotPassword = () => {
  const mutation = useForgotPassword();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: yupResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotFormValues) => {
    mutation.mutate(data.email, {
      onSuccess: (res) => {
        if (res.success) {
          setEmailSent(true);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <Link href="/signin" className="absolute top-6 left-6 text-red-600 hover:scale-110 transition">
        <IoMdArrowRoundBack size={32} />
      </Link>

      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-none rounded-3xl">
          <CardHeader className="space-y-3 text-center pb-2">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center">
              <Mail className="text-red-600" size={32} />
            </div>

            <CardTitle className="text-2xl font-bold text-red-600">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-sm">
              Enter your registered email and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            {emailSent ? (
              /* Success State */
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
                  <CheckCircle2 className="text-green-500" size={36} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-lg">Check your inbox!</p>
                  <p className="text-sm text-gray-500 mt-1">
                    We sent a reset link to{" "}
                    <span className="font-medium text-red-600">{getValues("email")}</span>
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  Didn't receive it? Check your spam folder or{" "}
                  <button
                    onClick={() => setEmailSent(false)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    try again
                  </button>
                  .
                </p>
                <Link
                  href="/signin"
                  className="mt-2 w-full text-center py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium hover:opacity-90 transition"
                >
                  Back to Sign In
                </Link>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                  <p className="text-red-500 text-sm">{errors.email?.message}</p>
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className={`w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2
                    ${mutation.isPending ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99]"}`}
                >
                  {mutation.isPending ? (
                    <>
                      <LoaderCircle className="animate-spin h-4 w-4" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Remembered your password?{" "}
                  <Link href="/signin" className="text-red-600 font-medium hover:underline">
                    Sign In
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
