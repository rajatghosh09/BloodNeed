"use client";

import { useState, useMemo } from "react";
import { useAllAppointments, UpdateAppointmentStatus } from "@/hooks/appointment";
import { Check, X, Mail, Phone, Calendar as CalendarIcon, Clock, User, AlertCircle, Activity, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import loadingAnimation from "@/services/json/loader/bloodsathi.json";
import { motion, AnimatePresence } from "framer-motion";

const AdminAppointments = () => {
    const { data: appointments, isLoading, isError } = useAllAppointments();
    const { mutate: updateStatus, isPending } = UpdateAppointmentStatus();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Filter appointments based on search and status
    const filteredAppointments = useMemo(() => {
        if (!appointments) return [];

        return appointments.filter((apt: any) => {
            const donorName = apt.register?.name || "Unknown Donor";
            const donorEmail = apt.register?.email || "";
            const donorPhone = apt.register?.phone || "";
            
            const matchesSearch = 
                donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donorPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apt.id.toString().toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = 
                statusFilter === "all" || 
                apt.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [appointments, searchTerm, statusFilter]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-32 h-32">
                        <Lottie animationData={loadingAnimation} loop={true} />
                    </div>
                    <p className="text-gray-600 font-medium tracking-wide animate-pulse">Loading requests...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl flex flex-col items-center border border-red-100">
                    <AlertCircle className="w-10 h-10 mb-3 text-red-500" />
                    <h3 className="text-lg font-bold">Failed to load appointments</h3>
                    <p className="text-sm mt-1">Please check your connection and try again.</p>
                </div>
            </div>
        );
    }

    // Calculate Stats
    const totalRequests = appointments?.length || 0;
    const pendingRequests = appointments?.filter((a: any) => a.status === 'scheduled').length || 0;
    const approvedRequests = appointments?.filter((a: any) => a.status === 'approved').length || 0;

    return (
        <div className="p-4 md:p-8 lg:p-10 bg-gray-50/30 min-h-screen">
            {/* Header Section */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        <CalendarIcon className="h-8 w-8 text-red-600" />
                        Donation Requests
                    </h1>
                    <p className="text-gray-500 mt-1.5 font-medium">Manage and review blood donation appointments.</p>
                </div>

                {/* Filter and Search controls */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 bg-white rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
                            placeholder="Search donor or contact..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Status filter */}
                    <div className="flex items-center gap-2 w-full sm:w-auto bg-white p-1.5 rounded-xl shadow-sm border border-gray-200">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent text-gray-700 text-sm font-semibold focus:ring-0 border-none outline-none block w-full py-1.5 pr-8 cursor-pointer"
                        >
                            <option value="all">All Statuses</option>
                            <option value="scheduled">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-300">
                    <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl"><Activity className="w-6 h-6" /></div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Requests</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">{totalRequests}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-300">
                    <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-6 h-6 animate-pulse" /></div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Review</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">{pendingRequests}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-300">
                    <div className="p-3.5 bg-green-50 text-green-600 rounded-xl"><Check className="w-6 h-6" /></div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Approved Donations</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">{approvedRequests}</p>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {filteredAppointments.length === 0 ? (
                <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <CalendarIcon className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No appointments found</h3>
                    <p className="text-gray-500 max-w-sm mt-2">
                        We couldn't find any appointment requests matching your filter or search query.
                    </p>
                </div>
            ) : (
                <>
                    {/* ================= MOBILE VIEW (CARDS) ================= */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        <AnimatePresence>
                            {filteredAppointments.map((apt: any, index) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const appointmentDate = new Date(apt.donation_date);
                                appointmentDate.setHours(0, 0, 0, 0);
                                const isPastDate = appointmentDate < today;
                                const formattedDate = appointmentDate.toLocaleDateString('en-US', { 
                                    month: 'short', day: 'numeric', year: 'numeric' 
                                });

                                return (
                                    <motion.div
                                        key={apt.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2, delay: index * 0.03 }}
                                        className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 flex flex-col gap-4 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-red-50 to-red-100/50 text-red-600 flex items-center justify-center font-extrabold text-base border border-red-100 shadow-inner">
                                                    {apt.register?.name ? apt.register.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-lg leading-tight">{apt.register?.name || "Unknown Donor"}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">ID: {apt.id}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2.5 pt-3 border-t border-gray-50 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="truncate">{apt.register?.email || "N/A"}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span>{apt.register?.phone || "N/A"}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <CalendarIcon className="w-4 h-4 text-indigo-500" />
                                                <span className={`font-semibold ${isPastDate ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{formattedDate}</span>
                                                {isPastDate && <span className="text-[9px] font-black text-red-500 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded border border-red-100 ml-1">Expired</span>}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                            {/* Status badge */}
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border
                                                ${apt.status === 'scheduled' && !isPastDate ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                                ${apt.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                                ${apt.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
                                                ${apt.status === 'scheduled' && isPastDate ? 'bg-gray-100 text-gray-600 border-gray-250' : ''}
                                            `}>
                                                <span className={`w-1.5 h-1.5 rounded-full 
                                                    ${apt.status === 'scheduled' && !isPastDate ? 'bg-amber-500 animate-pulse' : ''}
                                                    ${apt.status === 'approved' ? 'bg-emerald-500' : ''}
                                                    ${apt.status === 'rejected' ? 'bg-rose-500' : ''}
                                                    ${apt.status === 'scheduled' && isPastDate ? 'bg-gray-400' : ''}
                                                `}></span>
                                                {(apt.status === 'scheduled' && isPastDate) ? 'EXPIRED' : apt.status.toUpperCase()}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    className={`h-9 px-3 bg-white border hover:bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm font-semibold rounded-xl
                                                        ${(apt.status === 'approved' || isPastDate) ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                                                    `}
                                                    disabled={apt.status === 'approved' || isPending || isPastDate}
                                                    onClick={() => updateStatus({ id: apt.id, status: "approved" })}
                                                >
                                                    <Check className="w-3.5 h-3.5 mr-1" /> Approve
                                                </Button>
                                                
                                                <Button
                                                    size="sm"
                                                    className={`h-9 px-3 bg-white border hover:bg-rose-50 border-rose-200 text-rose-600 shadow-sm font-semibold rounded-xl
                                                        ${(apt.status === 'rejected' || isPastDate) ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                                                    `}
                                                    disabled={apt.status === 'rejected' || isPending || isPastDate}
                                                    onClick={() => updateStatus({ id: apt.id, status: "rejected" })}
                                                >
                                                    <X className="w-3.5 h-3.5 mr-1" /> Reject
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* ================= DESKTOP VIEW (TABLE) ================= */}
                    <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead className="bg-gray-50/80 border-b border-gray-200">
                                    <tr>
                                        <th className="p-5 text-xs font-bold text-gray-700 uppercase tracking-wider">Donor</th>
                                        <th className="p-5 text-xs font-bold text-gray-700 uppercase tracking-wider">Contact Details</th>
                                        <th className="p-5 text-xs font-bold text-gray-700 uppercase tracking-wider">Schedule</th>
                                        <th className="p-5 text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="p-5 text-xs font-bold text-gray-700 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-150 bg-white">
                                    {filteredAppointments.map((apt: any) => {
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        const appointmentDate = new Date(apt.donation_date);
                                        appointmentDate.setHours(0, 0, 0, 0);
                                        const isPastDate = appointmentDate < today;
                                        const formattedDate = appointmentDate.toLocaleDateString('en-US', { 
                                            month: 'short', day: 'numeric', year: 'numeric' 
                                        });

                                        return (
                                            <tr key={apt.id} className="hover:bg-red-50/10 transition-colors group">
                                                
                                                {/* Donor Column */}
                                                <td className="p-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-50 to-red-100/30 text-red-600 flex items-center justify-center font-extrabold border border-red-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                                            {apt.register?.name ? apt.register.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900">{apt.register?.name || "Unknown Donor"}</p>
                                                            <p className="text-xs text-gray-400 mt-0.5 font-medium">ID: {apt.id}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Contact Column */}
                                                <td className="p-5 text-sm">
                                                    <div className="flex flex-col gap-1.5">
                                                        <a href={`mailto:${apt.register?.email}`} className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-semibold transition-colors">
                                                            <Mail className="w-4 h-4 text-gray-400" /> {apt.register?.email || "N/A"}
                                                        </a>
                                                        <a href={`tel:${apt.register?.phone}`} className="flex items-center gap-2 text-gray-500 font-medium hover:text-red-600 transition-colors">
                                                            <Phone className="w-4 h-4 text-gray-400" /> {apt.register?.phone || "N/A"}
                                                        </a>
                                                    </div>
                                                </td>

                                                {/* Schedule Column */}
                                                <td className="p-5">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className={`p-2 rounded-lg ${isPastDate ? 'bg-gray-100 text-gray-400' : 'bg-red-50 text-red-600'}`}>
                                                            <CalendarIcon className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className={`font-bold ${isPastDate ? "text-gray-400 line-through" : "text-gray-900"}`}>
                                                                {formattedDate}
                                                            </span>
                                                            {isPastDate && <span className="text-[9px] font-extrabold text-red-600 tracking-wider mt-0.5">EXPIRED</span>}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Status Column */}
                                                <td className="p-5">
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm
                                                        ${apt.status === 'scheduled' && !isPastDate ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                                        ${apt.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                                        ${apt.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
                                                        ${apt.status === 'scheduled' && isPastDate ? 'bg-gray-100 text-gray-600 border-gray-200' : ''}
                                                    `}>
                                                        <span className={`w-1.5 h-1.5 rounded-full 
                                                            ${apt.status === 'scheduled' && !isPastDate ? 'bg-amber-500 animate-pulse' : ''}
                                                            ${apt.status === 'approved' ? 'bg-emerald-500' : ''}
                                                            ${apt.status === 'rejected' ? 'bg-rose-500' : ''}
                                                            ${apt.status === 'scheduled' && isPastDate ? 'bg-gray-400' : ''}
                                                        `}></span>
                                                        {(apt.status === 'scheduled' && isPastDate) ? 'EXPIRED' : apt.status.toUpperCase()}
                                                    </div>
                                                </td>

                                                {/* Actions Column */}
                                                <td className="p-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            className={`bg-white border hover:bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm font-semibold rounded-xl transition-all duration-300
                                                                ${(apt.status === 'approved' || isPastDate) ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-105 active:scale-95'}
                                                            `}
                                                            disabled={apt.status === 'approved' || isPending || isPastDate}
                                                            onClick={() => updateStatus({ id: apt.id, status: "approved" })}
                                                        >
                                                            <Check className="w-4 h-4 mr-1.5" /> Approve
                                                        </Button>
                                                        
                                                        <Button
                                                            size="sm"
                                                            className={`bg-white border hover:bg-rose-50 border-rose-200 text-rose-600 shadow-sm font-semibold rounded-xl transition-all duration-300
                                                                ${(apt.status === 'rejected' || isPastDate) ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-105 active:scale-95'}
                                                            `}
                                                            disabled={apt.status === 'rejected' || isPending || isPastDate}
                                                            onClick={() => updateStatus({ id: apt.id, status: "rejected" })}
                                                        >
                                                            <X className="w-4 h-4 mr-1.5" /> Reject
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminAppointments;