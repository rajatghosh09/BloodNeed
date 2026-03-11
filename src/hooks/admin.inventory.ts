"use client";

import { supabase } from "@/lib/supabaseclient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


interface InventoryPayload {
  blood_group: string;
  units_available: number;
  last_updated: string;
}

/* ================= ADD BLOOD ================= */

export const AddBlood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      blood_group,
      units_available,
      last_updated,
    }: InventoryPayload) => {

      // Check existing blood group
      const { data: existing, error } = await supabase
        .from("blood_inventory")
        .select("*")
        .eq("blood_group", blood_group)
        .maybeSingle();

      if (error) throw error;

      // If exists → increase units
      if (existing) {
        const updatedUnits =
          Number(existing.units_available) + Number(units_available);

        const { data, error } = await supabase
          .from("blood_inventory")
          .update({
            units_available: updatedUnits,
            last_updated,
          })
          .eq("blood_group", blood_group)
          .select()
          .single();

        if (error) throw error;

        return data;
      }

      // Insert new blood group
      const { data, error: insertError } = await supabase
        .from("blood_inventory")
        .insert({
          blood_group,
          units_available,
          last_updated,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blood_inventory"],
      });

      toast.success("Blood units updated successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to update inventory");
    },
  });
};

/* ================= UPDATE BLOOD ================= */

export const UpdateBlood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      blood_group,
      units_available,
      last_updated,
    }: InventoryPayload) => {

      const { data, error } = await supabase
        .from("blood_inventory")
        .update({
          units_available,
          last_updated,
        })
        .eq("blood_group", blood_group)
        .select()
        .single();

      if (error) throw error;

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blood_inventory"],
      });

      toast.success("Inventory updated");
    },
  });
};

/* ================= DELETE BLOOD ================= */

export const DeleteBlood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blood_group: string) => {

      const { error } = await supabase
        .from("blood_inventory")
        .delete()
        .eq("blood_group", blood_group);

      if (error) throw error;

      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blood_inventory"],
      });

      toast.success("Blood inventory deleted");
    },
  });
};

/* ================= GET INVENTORY ================= */

export const useBloodInventory = () => {
  return useQuery({
    queryKey: ["blood_inventory"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("blood_inventory")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
  });
};