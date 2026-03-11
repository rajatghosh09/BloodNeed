import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseclient";

export const useContacts = () => {
  return useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};