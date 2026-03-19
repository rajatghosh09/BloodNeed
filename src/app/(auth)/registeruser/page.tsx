"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/lib/auth.query";
import { RegisterFromvalues, registerValidation } from "@/services/validations/regestervalidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import LogIn from "../../../../assets/LogIn.png";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LoaderCircle } from "lucide-react";
import DecryptedText from "@/components/react-bits/DecryptedText";




const RegisterUser = () => {
  const mutation = useRegister()
  const navigate = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFromvalues>({
    resolver: yupResolver(registerValidation),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      blood_group: ""
    },
  });

  const onSubmit = (data: RegisterFromvalues) => {
    mutation.mutate(
      { ...data, role: "user" },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Registered successfully ✔️");
          reset();
          navigate.push("/signin");
        },
        onError: (error: any) => {
          toast.error(error?.message || "Registration failed");
        },
      }
    );
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-red-600 hover:scale-110 transition"
      >
        <IoMdArrowRoundBack size={32} />
      </Link>
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full h-full">

        {/* Image Section */}
        <div className="hidden md:flex justify-center items-center h-full">
          <Image
            src={LogIn}
            alt="Register"
            className="h-80 w-80 rounded-3xl shadow-md hover:bg-red-50 transition-colors duration-500 ease-in-out"
            priority
          />
        </div>

        {/* Form Section */}
        <Card className="w-full max-w-md mx-auto shadow-2xl rounded-3xl border-none bg-white h-[90vh] flex flex-col">

          <CardHeader className="text-center space-y-3 pb-4">
            <CardTitle className="flex justify-center gap-2 text-3xl font-bold text-red-600">
              Become a Blood 
              <CardTitle className="flex justify-center text-3xl font-bold text-red-600">
              <DecryptedText 
                text="Donor"
                animateOn="view"
                speed={80}
                maxIterations={5}
                className="text-3xl font-bold text-red-600"
              />
            </CardTitle>
            </CardTitle>
            <CardDescription className="text-gray-500">
              Save lives by registering today
            </CardDescription>

            <Tabs defaultValue="user" className="mt-4">
              <TabsList className="grid w-full grid-cols-2 bg-red-100 rounded-xl">
                <TabsTrigger value="user" className="rounded-xl">
                  Blood Donor
                </TabsTrigger>
                <TabsTrigger
                  value="hospital"
                  onClick={() => navigate.push("/registerhospital")}
                  className="rounded-xl"
                >
                  Hospital
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          {/* 🔥 Scrollable Form Area */}
          <CardContent className="overflow-y-auto px-6 pb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

              <div className="space-y-1">
                <Label>Full Name</Label>
                <Input {...register("full_name")} />
                <p className="text-red-500 text-sm">
                  {errors.full_name?.message}
                </p>
              </div>

              <div className="space-y-1">
                <Label>Email</Label>
                <Input type="email" {...register("email")} />
                <p className="text-red-500 text-sm">
                  {errors.email?.message}
                </p>
              </div>

              <div className="space-y-1">
                <Label>Password</Label>
                <Input type="password" {...register("password")} />
                <p className="text-red-500 text-sm">
                  {errors.password?.message}
                </p>
              </div>

              <div className="space-y-1">
                <Label>Phone</Label>
                <Input {...register("phone")} />
                <p className="text-red-500 text-sm">
                  {errors.phone?.message}
                </p>
              </div>

              <div className="space-y-1">
                <Label>Address</Label>
                <Input {...register("address")} />
                <p className="text-red-500 text-sm">
                  {errors.address?.message}
                </p>
              </div>

              <div className="space-y-1">
                <Label>Blood Group</Label>
                <select
                  {...register("blood_group")}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                <p className="text-red-500 text-sm">
                  {errors.blood_group?.message}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-2 mt-2 transition"
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
                  : "Register as Donor"}
              </Button>

            </form>
          </CardContent>

          <CardFooter className="text-center text-sm text-gray-500 pb-4">
            Every donation can save up to 3 lives ❤️
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterUser;