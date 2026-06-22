import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/zustand/userAuth";

export const useRegister = () => {
  const register = useAuthStore((state) => state.register);

  return useMutation({
    mutationFn: register,
  });
};

export const useSignin = () => {
  const signin = useAuthStore((state) => state.signin);

  return useMutation({
    mutationFn: signin,
  });
};

export const useForgotPassword = () => {
  const forgotPassword = useAuthStore((state) => state.forgotPassword);

  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
};

export const useResetPassword = () => {
  const resetPassword = useAuthStore((state) => state.resetPassword);

  return useMutation({
    mutationFn: (newPassword: string) => resetPassword(newPassword),
  });
};