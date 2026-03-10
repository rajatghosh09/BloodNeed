"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignin } from "@/lib/auth.query";
import { SigninFromvalues, signinValidation } from "@/services/validations/regestervalidations";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IoMdArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import LogIn from "../../../../assets/LogIn.png";
import { useAuthStore } from "@/zustand/userAuth";
import { LoaderCircle } from "lucide-react";


const Signin = () => {
  const mutation = useSignin();
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninFromvalues>({
    resolver: yupResolver(signinValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SigninFromvalues) => {
    mutation.mutate(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Login successfully");
        reset();

        // Redirect based on role
        const role = res?.role || useAuthStore.getState().role;

        if (role === "admin") {
          navigate.push("/admin/dashboard");
        } else if (role === "user") {
          navigate.push("/user");
        } else if (role === "hospital") {
          navigate.push("/hospital");
        }
      },

      onError: (error: any) => {
        toast.error(error?.message || "Login failed");
      },
    });
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-6 left-6 text-red-600 hover:scale-110 transition"
        >
          <IoMdArrowRoundBack size={32} />
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl w-full">

          {/* Image Section */}
          <div className="hidden md:flex justify-center">
            <Image
              src={LogIn}
              alt="Login"
              className="h-96 w-96 rounded-3xl shadow-md hover:bg-red-50 transition-colors duration-500 ease-in-out"
            />
          </div>

          {/* Form Section */}
          <Card className="shadow-2xl border-none rounded-3xl">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold text-red-600">
                Welcome Back
              </CardTitle>
              <CardDescription>
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Email */}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" {...register("email")} />
                  <p className="text-red-500 text-sm">
                    {errors.email?.message}
                  </p>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" {...register("password")} />
                  <p className="text-red-500 text-sm">
                    {errors.password?.message}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-2 transition"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? <LoaderCircle className="animate-spin h-5 w-5 mx-auto" /> : "Sign In"}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Don’t have an account?{" "}
                  <Link
                    href="/registeruser"
                    className="text-red-600 font-medium hover:underline"
                  >
                    Register
                  </Link>
                </p>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signin;
