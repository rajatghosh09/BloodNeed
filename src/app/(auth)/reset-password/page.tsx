"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/lib/auth.query";
import { supabase } from "@/lib/supabaseclient";

const resetSchema = yup.object({
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

interface ResetFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const mutation = useResetPassword();
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: yupResolver(resetSchema),
  });

  // Supabase sends the user to this page with a hash fragment
  // containing the access_token. We need to set the session from that.
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setIsValidSession(true);
      }
    });

    // Check if we already have a valid session (e.g. user landed with hash params)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsValidSession(true);
      else setIsValidSession(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const onSubmit = (data: ResetFormValues) => {
    mutation.mutate(data.password, {
      onSuccess: (res) => {
        if (res.success) {
          toast.success(res.message);
          setTimeout(() => navigate.push("/signin"), 1500);
        } else {
          toast.error(res.message);
        }
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong");
      },
    });
  };

  // Loading state while checking session
  if (isValidSession === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
        <LoaderCircle className="animate-spin text-red-600" size={40} />
      </div>
    );
  }

  // Invalid / expired link
  if (isValidSession === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
        <Card className="shadow-2xl border-none rounded-3xl w-full max-w-md text-center">
          <CardContent className="py-10 space-y-4">
            <p className="text-2xl font-bold text-red-600">Link Expired or Invalid</p>
            <p className="text-gray-500 text-sm">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              href="/forgot-password"
              className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-sm shadow-md hover:opacity-90 transition"
            >
              Request New Link
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-none rounded-3xl">
          <CardHeader className="space-y-3 text-center pb-2">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center">
              <KeyRound className="text-red-600" size={32} />
            </div>

            <CardTitle className="text-2xl font-bold text-red-600">
              Reset Password
            </CardTitle>
            <CardDescription className="text-sm">
              Enter your new password below.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* New Password */}
              <div className="space-y-2">
                <Label>New Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    {...register("password")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    {...register("confirmPassword")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className={`w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2
                  ${mutation.isPending ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99]"}`}
              >
                {mutation.isPending ? (
                  <>
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                <Link href="/signin" className="text-red-600 font-medium hover:underline">
                  Back to Sign In
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
