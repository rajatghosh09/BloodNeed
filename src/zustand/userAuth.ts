import { supabase } from "@/lib/supabaseclient";
import { create } from "zustand";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { IRegisterHandler, Isignin } from "@/typescript/interface/auth.interface";

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  user: IRegisterHandler | null;
  role: "user" | "hospital" | null;
  token: string | null;

  register: (data: IRegisterHandler) => Promise<{ success: boolean; message: string }>;
  signin: (data: Isignin) => Promise<{role: string | null; success: boolean; message: string }>;
  logout: () => Promise<{ success: boolean; message: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  success: false,
  token: (getCookie("token") as string) || null,
  user: getCookie("user") ? JSON.parse(getCookie("user") as string) : null,
  role: (getCookie("role") as "user" | "hospital") || null,

  // ==========================
  // REGISTER (Single Table)
  // ==========================
  register: async (data: IRegisterHandler) => {
    set({ loading: true, error: null });

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

      if (authError) throw authError;

      const authUserId = authData.user?.id;

      // Insert into ONE register table
      const { data: register, error: registerError } = await supabase.from("register").insert({
        full_name: data.full_name,
        email: data.email,  
        password: data.password,
        phone: data.phone,
        address: data.address,
        blood_group: data.blood_group,
        hospital_name: data.hospital_name,
        license_no: data.license_no,
        role: data.role,
        auth_id: authUserId,
      });
      console.log("register completed", register);

      if (registerError) throw registerError;

      set({ loading: false, success: true });

      return {
        success: true,
        message: "Registered successfully",
      };

    } catch (error: any) {
      console.log(error);
      set({
        loading: false,
        error: error.message || "Registration failed",
      });

      return {
        success: false,
        message: error.message || "Faild to register",
      };
    } finally {
      set({ loading: false });
    }
  },

  // ==========================
  // SIGNIN (Single Table)
  // ==========================
  signin: async (data: Isignin) => {
    set({ loading: true });

    try {
      set({ loading: true, success: true });
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      console.log("login auth return", authData);

      if (authError) throw authError;

      const authUserId = authData.user.id;

      const { data: profile, error: profileError } = await supabase
        .from("register")
        .select("*")
        .eq("auth_id", authUserId)
        .single();
      console.log("profile details", profile);

      if (profileError) throw profileError;

      const role = profile.role as "user" | "hospital";

      // Store cookies
      setCookie("token", authData?.session?.access_token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      setCookie("role", role, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      setCookie("user", JSON.stringify(profile), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      set({
        token: authData?.session?.access_token || null,
        user: profile,
        role,
        loading: false,
        // success: true,
      });

      return {
        role,
        success: true,
        message: "Login successfully",
      };

    } catch (error: any) {
      set({
        role:null,
        loading: false,
        error: error.message || "Login failed",
      });

      return {
        role:null,
        success: false,
        message: error.message || "Faild to login",
      };
    } finally {
      set({ loading: false });
    }
  },

  // ==========================
  // LOGOUT
  // ==========================
  logout: async () => {
    try {
      set({ loading: true });

      await supabase.auth.signOut();

      deleteCookie("token");
      deleteCookie("role");
      deleteCookie("user");

      set({
        token: null,
        user: null,
        role: null,
        loading: false,
        // success: false,
      });

      return {
        success: true,
        message: "Logged out successfully",
      };

    } catch (error: any) {
      set({ loading: false });

      return {
        success: false,
        message: error.message || "Logout failed",
      };
    }
  },
}));