import { supabase } from "@/lib/supabaseclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface BloodRequest {
  id?: number;
  blood_group: string;
  units_requested: number;
  priority_level: string;
  status?: string;
  auth_id: string;
}

// Submit Request
export const useCreateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BloodRequest) => {
      const { error } = await supabase
        .from("hospital_requests")
        .insert(data);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
          queryKey: ["hospital_requests"],
      });
        toast.success("Blood request sent succesfully")
      },
    
     onError: (error: any) => {
      toast.error(error.message || "Failed to sent request");
    },
  });
};

// Fetch Requests
export const useHospitalRequests = (auth_id: string) => {
  return useQuery({
    queryKey: ["hospital_requests"],
    queryFn: async () => {
      const { data, error:useHospitalError } = await supabase
        .from("hospital_requests")
        .select("*")
        .eq("auth_id", auth_id)
        .order("created_at", { ascending: false });

      if (useHospitalError) throw useHospitalError;

      return data;
    },
    enabled: !!auth_id,
  });
};