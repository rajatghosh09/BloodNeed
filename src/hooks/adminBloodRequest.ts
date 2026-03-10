import { supabase } from "@/lib/supabaseclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch hospital requests + hospital info from the combined view
export const useHospitalRequestsAdmin = () => {
  return useQuery({
    queryKey: ["admin_blood_requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hospital_requests_with_hospital")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

// Update request status
export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: number;
      status: string;
    }) => {
      // Keep updating the BASE table, not the view
      const { error } = await supabase
        .from("hospital_requests")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      // Invalidate queries to refresh the UI immediately
      queryClient.invalidateQueries({
        queryKey: ["admin_blood_requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["hospital_requests"],
      });
    },
  });
};