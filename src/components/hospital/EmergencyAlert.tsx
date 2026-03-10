"use client";

import { AlertTriangle } from "lucide-react";

interface Props {
  count: number;
}

const EmergencyAlert = ({ count }: Props) => {
  if (count === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3">

      <AlertTriangle className="text-red-600 w-6 h-6" />

      <div>
        <p className="font-semibold text-red-700">
          Emergency Blood Requests
        </p>

        <p className="text-sm text-red-600">
          {count} high priority request(s) pending
        </p>
      </div>

    </div>
  );
};

export default EmergencyAlert;