"use client";

import {
  useHospitalRequestsAdmin,
  useUpdateRequestStatus,
} from "@/hooks/adminBloodRequest";
import Lottie from "lottie-react";
import loadingAnimation from "@/services/json/loader/bloodsathi.json";
import { Mail, PhoneCall, MapPin, Droplet } from "lucide-react";

// Helper function to truncate text to a specific number of words
const truncateWords = (text: string, maxWords: number = 10) => {
  if (!text) return "_";
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};

// Helper for priority badge colors
const getPriorityStyles = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-700 border border-red-200";
    case "medium":
      return "bg-orange-100 text-orange-700 border border-orange-200";
    case "low":
    default:
      return "bg-blue-100 text-blue-700 border border-blue-200";
  }
};

const BloodRequest = () => {
  const { data, isLoading } = useHospitalRequestsAdmin();
  const updateStatus = useUpdateRequestStatus();

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-32">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
          <p className="text-gray-600 font-medium tracking-wide">
            Loading requests...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-red-600">
            Hospital Blood Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and approve blood requirements from registered hospitals.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 w-full sm:w-auto flex justify-between sm:justify-start items-center gap-2">
          <span className="text-sm font-semibold text-gray-600">
            Total Requests:{" "}
          </span>
          <span className="text-red-600 font-bold">{data?.length || 0}</span>
        </div>
      </div>

      {(!data || data.length === 0) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-12">
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-base font-medium text-gray-500">No blood requests found</p>
            <p className="text-sm mt-1">New requests will appear here.</p>
          </div>
        </div>
      )}

      {/* ================= MOBILE VIEW (CARDS) ================= */}
      <div className="md:hidden flex flex-col gap-4">
        {data?.map((req: any) => (
          <div key={req.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">
            {/* Top Row: Hospital & Blood Group */}
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">{req.hospital_name ?? "Unknown Hospital"}</h3>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className={`px-2 py-0.5 rounded-full capitalize ${getPriorityStyles(req.priority_level)}`}>
                    {req.priority_level || "Normal"} Priority
                  </span>
                  <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${req.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {req.status || "pending"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600 font-bold text-lg border border-red-100">
                  {req.blood_group}
                </span>
                <span className="text-xs font-semibold text-gray-500 mt-1">{req.units_requested} Units</span>
              </div>
            </div>

            {/* Middle Row: Contact & Address */}
            <div className="bg-gray-50 p-3 rounded-lg flex flex-col gap-2 text-sm text-gray-600 border border-gray-100">
              <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400 shrink-0" /> {req.email || "N/A"}</span>
              <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-gray-400 shrink-0" /> {req.phone || "N/A"}</span>
              <span className="flex items-start gap-2"><MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> <span className="line-clamp-2">{req.address || "N/A"}</span></span>
            </div>

            {/* Bottom Row: Action Button */}
            {req.status !== "approved" ? (
              <button
                onClick={() => updateStatus.mutate({ id: req.id, status: "approved" })}
                disabled={updateStatus.isPending}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-red-500 disabled:opacity-50 flex justify-center items-center"
              >
                {updateStatus.isPending ? "Approving..." : "Approve Request"}
              </button>
            ) : (
              <div className="w-full bg-gray-100 text-gray-500 text-sm font-semibold py-3 rounded-lg text-center border border-gray-200">
                ✓ Request Approved
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW (TABLE) ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-red-700 uppercase tracking-wider">Hospital Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-red-700 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-semibold text-red-700 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-xs font-semibold text-red-700 uppercase tracking-wider text-center">Blood</th>
                <th className="px-6 py-4 text-xs font-semibold text-red-700 uppercase tracking-wider text-center">Units</th>
                <th className="px-6 py-4 text-xs font-semibold text-red-700 uppercase tracking-wider text-center">Priority</th>
                <th className="px-6 py-4 text-xs font-semibold text-red-700 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-red-700 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data?.map((req: any) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors duration-150">
                  
                  {/* Hospital Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-800">
                      {req.hospital_name ?? "Unknown Hospital"}
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5 text-sm">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" /> {req.email || "_"}
                      </span>
                      <span className="text-gray-500 flex items-center gap-2">
                        <PhoneCall className="w-4 h-4 text-gray-400" /> {req.phone || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Address */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-[200px] cursor-help" title={req.address}>
                      {truncateWords(req.address, 5)}
                    </div>
                  </td>

                  {/* Blood Group */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 font-bold text-lg border border-red-100">
                      {req.blood_group}
                    </span>
                  </td>

                  {/* Units */}
                  <td className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-700">
                    {req.units_requested}
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getPriorityStyles(req.priority_level)}`}>
                      {req.priority_level || "Normal"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center gap-1 w-fit mx-auto ${
                        req.status === "approved"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {req.status === "approved" && (
                         <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      )}
                      {req.status || "pending"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {req.status !== "approved" ? (
                      <button
                        onClick={() => updateStatus.mutate({ id: req.id, status: "approved" })}
                        disabled={updateStatus.isPending}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updateStatus.isPending ? "Approving..." : "Approve"}
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm italic pr-4">Resolved</span>
                    )}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BloodRequest;