"use client";

import React, { useState } from "react";
import { useCreateRequest } from "@/hooks/hospitalRequest"; // Adjust import path if needed
import { useBloodInventory } from "@/hooks/admin.inventory"; // Adjust import path if needed
import { Button } from "@/components/ui/button";
import { AlertCircle, Droplet } from "lucide-react";

interface BloodRequestFormProps {
  auth_id: string;
}

const BloodRequestForm = ({ auth_id }: BloodRequestFormProps) => {
  // 1. Fetch the live inventory
  const { data: inventory, isLoading: isInventoryLoading } =
    useBloodInventory();

  // 2. Form Mutations
  const { mutate: createRequest, isPending } = useCreateRequest();

  // 3. Form State
  const [bloodGroup, setBloodGroup] = useState("");
  const [unitsRequested, setUnitsRequested] = useState<number | "">("");
  const [priorityLevel, setPriorityLevel] = useState("Normal");

  // 4. Logic to find available units for the selected blood group
  const selectedInventoryItem = inventory?.find(
    (item: any) => item.blood_group === bloodGroup,
  );
  const availableUnits = selectedInventoryItem
    ? Number(selectedInventoryItem.units_available)
    : 0;

  // 5. Validation Check: Is the hospital asking for more than what we have?
  const parsedUnits = Number(unitsRequested);
  const isExceedingInventory =
    bloodGroup !== "" && parsedUnits > availableUnits;

  // Disable button if form is incomplete, exceeding inventory, or currently submitting
  const isSubmitDisabled =
    !bloodGroup ||
    !unitsRequested ||
    parsedUnits <= 0 ||
    isExceedingInventory ||
    isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    createRequest(
      {
        blood_group: bloodGroup,
        units_requested: parsedUnits,
        priority_level: priorityLevel,
        status: "pending",
        auth_id,
      },
      {
        onSuccess: () => {
          // Reset form on success
          setBloodGroup("");
          setUnitsRequested("");
          setPriorityLevel("Normal");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Blood Group Selection */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Blood Group
        </label>
        <select
          required
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="w-full border-gray-300 rounded-lg p-2.5 text-sm focus:ring-red-500 focus:border-red-500 border bg-white"
        >
          <option value="" disabled>
            Select Blood Group
          </option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* Dynamic Inventory Display */}
        {bloodGroup && (
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Droplet className="w-4 h-4 text-red-500" />
            <span className="text-gray-600 font-medium">
              Available in Inventory:{" "}
              <span
                className={
                  availableUnits > 0
                    ? "text-emerald-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {availableUnits} Units
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Units Requested */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Units Requested
        </label>
        <input
          type="number"
          min="1"
          required
          value={unitsRequested}
          onChange={(e) => setUnitsRequested(Number(e.target.value) || "")}
          placeholder="e.g. 5"
          className="w-full border-gray-300 rounded-lg p-2.5 text-sm focus:ring-red-500 focus:border-red-500 border bg-white"
        />

        {/* Warning if exceeding inventory */}
        {isExceedingInventory && (
          <div className="flex items-start gap-2 mt-2 text-sm text-red-600 bg-red-50 p-2.5 rounded-md border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              You cannot request {unitsRequested} units. Only {availableUnits}{" "}
              units of {bloodGroup} are currently available.
            </p>
          </div>
        )}
      </div>

      {/* Priority Level */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Priority Level
        </label>
        <select
          required
          value={priorityLevel}
          onChange={(e) => setPriorityLevel(e.target.value)}
          className="w-full border-gray-300 rounded-lg p-2.5 text-sm focus:ring-red-500 focus:border-red-500 border bg-white"
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent (Within 24 Hours)</option>
          <option value="high">Emergency (Immediate)</option>
        </select>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitDisabled || isInventoryLoading}
        className={`w-full py-6 mt-4 ${isExceedingInventory ? "bg-gray-300 hover:bg-gray-300 text-gray-500" : "bg-red-600 hover:bg-red-700"}`}
      >
        {isPending ? "Submitting Request..." : "Submit Blood Request"}
      </Button>
    </form>
  );
};

export default BloodRequestForm;
