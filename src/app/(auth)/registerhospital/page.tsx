"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/lib/auth.query";
import { RegisterHospitalFromvalues, registerHospitalValidation } from "@/services/validations/regestervalidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogIn from "../../../../assets/LogIn.png";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LoaderCircle } from "lucide-react";



const RegisterHospital = () => {
  const mutation = useRegister()
  const navigate = useRouter()


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterHospitalFromvalues>({
    resolver: yupResolver(registerHospitalValidation),
    defaultValues: {
      hospital_name: "",
      license_no: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    },
  });


  const onSubmit = (data: RegisterHospitalFromvalues) => {
    mutation.mutate(
      { ...data, role: "hospital" },
      {
        onSuccess: (res) => {
          console.log("response from hsopital", res);

          toast.success(res?.message || "Registered successfully ✔️");
          reset();
          navigate.push("/signin");
        },
        onError: (error: any) => {
          console.log("error from hsopital", error);
          toast.error(error?.message || "Registration failed");
        },
      }
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-red-600 hover:scale-110 transition"
      >
        <IoMdArrowRoundBack size={32} />
      </Link>
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full">

        {/* Image Section */}
        <div className="hidden md:flex justify-center">
          <Image
            src={LogIn}
            alt="Login"
            className="h-80 w-80 rounded-3xl shadow-md hover:bg-red-50 transition-colors duration-500 ease-in-out"
          />
        </div>

        {/* Form Section */}
        <Card className="w-full max-w-md mx-auto shadow-xl border-red-200">

          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-red-600">
              Become a Hospital
            </CardTitle>

            <Tabs defaultValue="hospital" className="mt-4">
              <TabsList className="grid w-full grid-cols-2 bg-red-100 rounded-xl">
                <TabsTrigger
                  value="user"
                  onClick={() => navigate.push("/registeruser")}
                  className="rounded-xl"
                >
                  Blood Donor
                </TabsTrigger>
                <TabsTrigger
                  value="hospital"
                  className="rounded-xl"
                >
                  Hospital
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

              <div>
                <Label>Hospital Name</Label>
                <Input {...register("hospital_name")} />
                <p className="text-red-500 text-sm">
                  {errors.hospital_name?.message}
                </p>
              </div>

              <div>
                <Label>License Number</Label>
                <Input {...register("license_no")} />
                <p className="text-red-500 text-sm">
                  {errors.license_no?.message}
                </p>
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" {...register("email")} />
                <p className="text-red-500 text-sm">
                  {errors.email?.message}
                </p>
              </div>

              <div>
                <Label>Password</Label>
                <Input type="password" {...register("password")} />
                <p className="text-red-500 text-sm">
                  {errors.password?.message}
                </p>
              </div>

              <div>
                <Label>Phone</Label>
                <Input {...register("phone")} />
                <p className="text-red-500 text-sm">
                  {errors.phone?.message}
                </p>
              </div>

              <div>
                <Label>Address</Label>
                <Input {...register("address")} />
                <p className="text-red-500 text-sm">
                  {errors.address?.message}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white mt-2"
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
                  : "Register as Hospital"}
              </Button>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterHospital;