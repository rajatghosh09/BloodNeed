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


// admin panel start where approve and reject button implement
export const useAllAppointments = () => {
  return useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => {
      // 1. Fetch all appointments
      const { data: appointments, error: aptError } = await supabase
        .from("donation_appointments")
        .select("*")
        .order("created_at", { ascending: false });

      if (aptError) throw aptError;
      if (!appointments || appointments.length === 0) return [];

      // 2. Extract the user_ids (which are UUIDs)
      const userIds = [...new Set(appointments.map(apt => apt.user_id).filter(Boolean))];

      // 3. Fetch matching users from 'register' table
      // We use 'auth_id' because that matches the uuid from appointments
      const { data: users, error: usersError } = await supabase
        .from("register")
        .select("auth_id, full_name, email, phone")
        .in("auth_id", userIds); // <-- Matching against auth_id!

      if (usersError) {
        console.error("Users Fetch Error:", usersError);
        throw usersError;
      }

      // 4. Combine the data
      const enrichedAppointments = appointments.map(apt => {
        // Find the user where register.auth_id matches appointment.user_id
        const matchingUser = users?.find(u => u.auth_id === apt.user_id); 
        
        return {
          ...apt,
          // We format it into a 'register' object so your table UI doesn't break
          register: {
            name: matchingUser?.full_name || "Unknown User",
            email: matchingUser?.email || "No email",
            phone: matchingUser?.phone || "No phone"
          }
        };
      });

      return enrichedAppointments;
    },
  });
};

// Update Appointment Status (Approve/Reject)
export const UpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "approved" | "rejected" }) => {
      const { data, error } = await supabase
        .from("donation_appointments")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (response) => {
      // Refresh admin list
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      // Refresh the specific user's list so they see the update immediately
      queryClient.invalidateQueries({ queryKey: ["appointments", response.user_id] });
      queryClient.invalidateQueries({ queryKey: ["latest-appointment", response.user_id] });
      
      toast.success(`Appointment ${response.status} successfully`);
    },
    onError: (error) => {
      console.error("Error updating status:", error);
      toast.error(error.message || "Failed to update status");
    },
  });
};