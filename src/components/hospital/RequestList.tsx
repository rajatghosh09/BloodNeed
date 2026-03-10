"use client";

import { useHospitalRequests } from "@/hooks/hospitalRequest";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

// Helper for formatting dates
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Helper for Priority Colors
const getPriorityStyles = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "bg-red-50 text-red-700 border-red-200";
    case "medium":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "low":
    default:
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
};

const RequestList = ({ auth_id }: { auth_id: string }) => {
  const { data: requests, isLoading } = useHospitalRequests(auth_id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
        <p>Loading your requests...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="font-semibold text-gray-600">Date</TableHead>
            <TableHead className="font-semibold text-gray-600 text-center">Blood Group</TableHead>
            <TableHead className="font-semibold text-gray-600 text-center">Units</TableHead>
            <TableHead className="font-semibold text-gray-600 text-center">Priority</TableHead>
            <TableHead className="font-semibold text-gray-600 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(!requests || requests.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-16">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <AlertCircle className="w-10 h-10 mb-3 text-gray-300" />
                  <p className="text-base font-medium text-gray-500">No requests found</p>
                  <p className="text-sm mt-1">Your blood requests will appear here once submitted.</p>
                </div>
              </TableCell>
            </TableRow>
          )}

          {requests?.map((req: any) => (
            <TableRow key={req.id} className="hover:bg-gray-50/80 transition-colors">
              
              {/* Date */}
              <TableCell className="text-gray-600 font-medium whitespace-nowrap">
                {formatDate(req.created_at)}
              </TableCell>

              {/* Blood Group */}
              <TableCell className="text-center">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-red-600 font-bold text-sm border border-red-100 shadow-sm">
                  {req.blood_group}
                </span>
              </TableCell>

              {/* Units */}
              <TableCell className="text-center font-semibold text-gray-700">
                {req.units_requested}
              </TableCell>

              {/* Priority */}
              <TableCell className="text-center">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize tracking-wide ${getPriorityStyles(req.priority_level)}`}>
                  {req.priority_level || "Normal"}
                </span>
              </TableCell>

              {/* Status */}
              <TableCell className="text-right">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                    req.status === "approved"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {req.status === "approved" ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                  <span className="capitalize">{req.status || "Pending"}</span>
                </span>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestList;