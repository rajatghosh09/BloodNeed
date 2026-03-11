"use client"

import { useMemo, useState } from "react";
import { useAllAppointments } from "@/hooks/appointment";
import Lottie from "lottie-react";
import loadingAnimation from "@/services/json/loader/bloodsathi.json";

interface DonorStat {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  requestCount: number;
}

type SortOrder = "default" | "high-to-low" | "low-to-high";

// Helper to generate initials for the avatar
const getInitials = (name: string) => {
  if (!name || name === "Unknown User") return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const Donors = () => {
  const { data: appointments, isLoading, isError } = useAllAppointments();
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  // Group appointments and apply sorting
  const donorsList = useMemo(() => {
    if (!appointments) return [];

    const donorMap = new Map<string, DonorStat>();

    appointments.forEach((apt) => {
      if (!donorMap.has(apt.user_id)) {
        donorMap.set(apt.user_id, {
          user_id: apt.user_id,
          name: apt.register?.name || "Unknown User",
          email: apt.register?.email || "No email",
          phone: apt.register?.phone || "No phone",
          requestCount: 1,
        });
      } else {
        const existingDonor = donorMap.get(apt.user_id)!;
        existingDonor.requestCount += 1;
      }
    });

    const donorArray = Array.from(donorMap.values());

    if (sortOrder === "high-to-low") {
      donorArray.sort((a, b) => b.requestCount - a.requestCount);
    } else if (sortOrder === "low-to-high") {
      donorArray.sort((a, b) => a.requestCount - b.requestCount);
    }

    return donorArray;
  }, [appointments, sortOrder]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-32">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
          <p className="text-gray-600 font-medium tracking-wide">
            Loading directory...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 m-6 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Failed to load donors. Please try again later.</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-5">
        <div>
          <h1 className="text-3xl font-extrabold text-red-600 tracking-tight">Donor Directory</h1>
          <p className="text-sm text-gray-500 mt-1.5 font-medium">
            Manage your donors and view their request history.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto bg-red-50 p-1.5 rounded-xl shadow-sm border border-gray-200">
          <div className="pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
            </svg>
          </div>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="bg-transparent text-gray-700 text-sm font-medium focus:ring-0 border-none outline-none block w-full py-2 pr-8 cursor-pointer"
          >
            <option value="default">Sort by Default</option>
            <option value="high-to-low" className="text-red-700">Highest Requests</option>
            <option value="low-to-high" className="text-green-700">Lowest Requests</option>
          </select>
        </div>
      </div>

      {donorsList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No donors found</h3>
          <p className="text-gray-500 mt-1">There are no appointment requests in the system yet.</p>
        </div>
      ) : (
        <>
          {/* MOBILE VIEW: Card Layout (Hidden on Medium screens and up) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {donorsList.map((donor) => (
              <div key={donor.user_id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
                      {getInitials(donor.name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{donor.name}</h3>
                      <span className={`inline-flex items-center justify-center px-2.5 py-0.5 mt-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                        donor.requestCount > 2 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {donor.requestCount} {donor.requestCount === 1 ? "Req" : "Reqs"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{donor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{donor.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW: Table Layout (Hidden on Mobile) */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50/80 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-5 font-semibold text-gray-900 tracking-wide text-xs uppercase">Donor Profile</th>
                    <th className="px-6 py-5 font-semibold text-gray-900 tracking-wide text-xs uppercase">Contact Info</th>
                    <th className="px-6 py-5 font-semibold text-gray-900 tracking-wide text-xs uppercase text-center">Total Requests</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {donorsList.map((donor) => (
                    <tr key={donor.user_id} className="hover:bg-gray-50/50 transition-colors duration-200 group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-inner border border-blue-100">
                            {getInitials(donor.name)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-base">{donor.name}</div>
                            <div className="text-xs text-gray-400 mt-0.5">ID: {donor.user_id.split('-')[0]}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">{donor.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{donor.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border ${
                            donor.requestCount > 2
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {donor.requestCount} {donor.requestCount === 1 ? "Request" : "Requests"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Donors;