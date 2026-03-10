import { supabase } from "@/lib/supabaseclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AppointmentPayload {
  user_id: string | undefined;
  donation_date: string;
}

export const CreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ user_id, donation_date }: AppointmentPayload) => {

      // Check latest appointment
      const { data: lastAppointment, error: lastAppointmentError } =
        await supabase
          .from("donation_appointments")
          .select("*")
          .eq("user_id", user_id)
          .order("donation_date", { ascending: false })
          .limit(1)
          .maybeSingle();

      if (lastAppointmentError) throw lastAppointmentError;

      if (lastAppointment?.next_eligibility_date) {
        const selectedDate = new Date(donation_date);
        const nextEligible = new Date(lastAppointment.next_eligibility_date);

        if (selectedDate < nextEligible) {
          throw new Error(
            `You can donate again after ${lastAppointment.next_eligibility_date}`
          );
        }
      }

      // Calculate next eligibility
      const donationDate = new Date(donation_date);

      const nextEligibility = new Date(donationDate);
      nextEligibility.setDate(nextEligibility.getDate() + 2); // change to 90 later

      const formattedNextEligibility = nextEligibility.toISOString().split("T")[0];

      // Insert appointment
      const { data: newAppointment, error: appointmentError } = await supabase
        .from("donation_appointments")
        .insert([
          {
            user_id,
            donation_date,
            next_eligibility_date: formattedNextEligibility,
            status: "scheduled",
          },
        ])
        .select()
        .single();

      if (appointmentError) throw appointmentError;

      return newAppointment;
    },
    onSuccess: async (response) => {
      console.log("success in tanstack create appoinment", response);

      queryClient.invalidateQueries({
        queryKey: ["appointments", response?.user_id],
      });

      queryClient.invalidateQueries({
        queryKey: ["latest-appointment", response.user_id],
      });

      toast.success("Appointment booked successfully");
    },
    onError: (error) => {
      console.log("error from create appoinment", error);
      toast.error(error.message || "Something went wrong");
    }
  });
};


export const useAppointments = (user_id: string) => {
  return useQuery({
    queryKey: ["appointments", user_id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("donation_appointments")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
  });
};


export const useLatestAppointment = (user_id: string) => {
  return useQuery({
    queryKey: ["latest-appointment", user_id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("donation_appointments")
        .select("*")
        .eq("user_id", user_id)
        .order("donation_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
  });
};