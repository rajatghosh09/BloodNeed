"use client"

import { useMemo, useState } from "react";
import { useAllAppointments } from "@/hooks/appointment";
import Lottie from "lottie-react";
import loadingAnimation from "@/services/json/loader/bloodsathi.json";
import { Search, Mail, Phone, Users, Calendar, ArrowDownWideNarrow, Droplet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DonorStat {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  requestCount: number;
}

type SortOrder = "default" | "high-to-low" | "low-to-high";

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
  const [searchTerm, setSearchTerm] = useState("");

  // Group appointments, apply search filter, and apply sorting
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

    let donorArray = Array.from(donorMap.values());

    // Apply Search filter
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      donorArray = donorArray.filter(
        (donor) =>
          donor.name.toLowerCase().includes(lowerSearch) ||
          donor.email.toLowerCase().includes(lowerSearch) ||
          donor.phone.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply Sorting
    if (sortOrder === "high-to-low") {
      donorArray.sort((a, b) => b.requestCount - a.requestCount);
    } else if (sortOrder === "low-to-high") {
      donorArray.sort((a, b) => a.requestCount - b.requestCount);
    }

    return donorArray;
  }, [appointments, sortOrder, searchTerm]);

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
    <div className="p-4 md:p-8 min-h-screen bg-gray-50/30">
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-red-600 tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8 text-red-600" />
            Donor Directory
          </h1>
          <p className="text-sm text-gray-500 mt-1.5 font-medium">
            Manage your registered donors and view their donation history. Total found: <span className="font-bold text-gray-900">{donorsList.length}</span>
          </p>
        </div>

        {/* Controls: Search and Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 bg-white rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full sm:w-auto bg-white p-1.5 rounded-xl shadow-sm border border-gray-200">
            <div className="pl-3 text-gray-400">
              <ArrowDownWideNarrow className="h-4 w-4" />
            </div>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="bg-transparent text-gray-700 text-sm font-semibold focus:ring-0 border-none outline-none block w-full py-1.5 pr-8 cursor-pointer"
            >
              <option value="default">Sort by Default</option>
              <option value="high-to-low">Highest Requests</option>
              <option value="low-to-high">Lowest Requests</option>
            </select>
          </div>
        </div>
      </div>

      {donorsList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center flex flex-col items-center justify-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-4">
            <Users className="h-10 w-10 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No donors found</h3>
          <p className="text-gray-500 mt-2 max-w-sm">
            We couldn't find any donors matching your search criteria or sorting order.
          </p>
        </div>
      ) : (
        <>
          {/* MOBILE VIEW: Card Layout (Hidden on Medium screens and up) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            <AnimatePresence>
              {donorsList.map((donor, index) => (
                <motion.div
                  key={donor.user_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 flex flex-col gap-4 hover:shadow-md hover:border-red-200 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-50 to-red-100/50 text-red-600 flex items-center justify-center font-extrabold text-lg border border-red-100 shadow-inner">
                        {getInitials(donor.name)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{donor.name}</h3>
                        <span className={`inline-flex items-center justify-center px-2.5 py-0.5 mt-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                          donor.requestCount > 2 ? "bg-red-50 text-red-700 border border-red-100" : "bg-blue-50 text-blue-700 border border-blue-100"
                        }`}>
                          {donor.requestCount} {donor.requestCount === 1 ? "Request" : "Requests"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="truncate">{donor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{donor.phone}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* DESKTOP VIEW: Table Layout (Hidden on Mobile) */}
          <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50/80 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-5 font-bold text-gray-700 tracking-wide text-xs uppercase">Donor Profile</th>
                    <th className="px-6 py-5 font-bold text-gray-700 tracking-wide text-xs uppercase">Contact Info</th>
                    <th className="px-6 py-5 font-bold text-gray-700 tracking-wide text-xs uppercase text-center">Total Requests</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 bg-white">
                  {donorsList.map((donor) => (
                    <tr key={donor.user_id} className="hover:bg-red-50/10 transition-colors duration-200 group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-50 to-red-100/30 text-red-600 flex items-center justify-center font-extrabold shadow-inner border border-red-100 transition-transform duration-300 group-hover:scale-105">
                            {getInitials(donor.name)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-base">{donor.name}</div>
                            <div className="text-xs text-gray-400 mt-0.5 font-medium">ID: {donor.user_id.split('-')[0]}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="font-semibold text-gray-800">{donor.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{donor.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold shadow-sm border transition-all duration-300 group-hover:scale-105 ${
                            donor.requestCount > 2
                              ? "bg-red-50 text-red-700 border-red-200"
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