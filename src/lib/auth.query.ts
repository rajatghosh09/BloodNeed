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