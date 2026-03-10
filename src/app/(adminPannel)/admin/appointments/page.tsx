"use client";

import { useAllAppointments, UpdateAppointmentStatus } from "@/hooks/appointment";
import { Check, X, Mail, Phone, Calendar as CalendarIcon, Clock, User, AlertCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import loadingAnimation from "@/services/json/loader/bloodsathi.json";

const AdminAppointments = () => {
    const { data: appointments, isLoading, isError } = useAllAppointments();
    const { mutate: updateStatus, isPending } = UpdateAppointmentStatus();

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
        <div className="p-6 md:p-10 bg-gray-50/50 min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Donation Requests</h1>
                <p className="text-gray-500 mt-2">Manage and review blood donation appointments.</p>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Activity className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Requests</p>
                        <p className="text-2xl font-bold text-gray-900">{totalRequests}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Pending Review</p>
                        <p className="text-2xl font-bold text-gray-900">{pendingRequests}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Check className="w-6 h-6" /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Approved Donations</p>
                        <p className="text-2xl font-bold text-gray-900">{approvedRequests}</p>
                    </div>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead className="bg-gray-50/80 border-b border-gray-200">
                            <tr>
                                <th className="p-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Donor</th>
                                <th className="p-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Details</th>
                                <th className="p-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Schedule</th>
                                <th className="p-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {appointments?.map((apt: any) => {
                                // Date logic
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const appointmentDate = new Date(apt.donation_date);
                                appointmentDate.setHours(0, 0, 0, 0);
                                const isPastDate = appointmentDate < today;
                                
                                // Format date nicely (e.g., "Mar 10, 2026")
                                const formattedDate = appointmentDate.toLocaleDateString('en-US', { 
                                    month: 'short', day: 'numeric', year: 'numeric' 
                                });

                                return (
                                    <tr key={apt.id} className="hover:bg-gray-50/80 transition-colors group">
                                        
                                        {/* Donor Column */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold border border-red-100">
                                                    {apt.register?.name ? apt.register.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{apt.register?.name || "Unknown Donor"}</p>
                                                    <p className="text-xs text-gray-500">ID: {apt.id}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Contact Column */}
                                        <td className="p-5 text-sm">
                                            <div className="flex flex-col gap-1.5">
                                                <a href={`mailto:${apt.register?.email}`} className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                                                    <Mail className="w-4 h-4 text-gray-400" /> {apt.register?.email || "N/A"}
                                                </a>
                                                <a href={`tel:${apt.register?.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                                                    <Phone className="w-4 h-4 text-gray-400" /> {apt.register?.phone || "N/A"}
                                                </a>
                                            </div>
                                        </td>

                                        {/* Schedule Column */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-2 rounded-lg ${isPastDate ? 'bg-gray-100 text-gray-500' : 'bg-indigo-50 text-indigo-600'}`}>
                                                    <CalendarIcon className="w-4 h-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`font-semibold ${isPastDate ? "text-gray-500 line-through" : "text-gray-900"}`}>
                                                        {formattedDate}
                                                    </span>
                                                    {isPastDate && <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider mt-0.5">Expired</span>}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Status Column */}
                                        <td className="p-5">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border
                                                ${apt.status === 'scheduled' && !isPastDate ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                                ${apt.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                                ${apt.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
                                                ${apt.status === 'scheduled' && isPastDate ? 'bg-gray-100 text-gray-600 border-gray-200' : ''}
                                            `}>
                                                {/* Status Dot */}
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
                                        <td className="p-5">
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    className={`bg-white border hover:bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm
                                                        ${(apt.status === 'approved' || isPastDate) ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                                                    `}
                                                    disabled={apt.status === 'approved' || isPending || isPastDate}
                                                    onClick={() => updateStatus({ id: apt.id, status: "approved" })}
                                                >
                                                    <Check className="w-4 h-4 mr-1.5" /> Approve
                                                </Button>
                                                
                                                <Button
                                                    size="sm"
                                                    className={`bg-white border hover:bg-rose-50 border-rose-200 text-rose-600 shadow-sm
                                                        ${(apt.status === 'rejected' || isPastDate) ? 'opacity-50 cursor-not-allowed grayscale' : ''}
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

                            {/* Empty State */}
                            {appointments?.length === 0 && (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="flex flex-col items-center justify-center p-12 text-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                <CalendarIcon className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">No Appointments Yet</h3>
                                            <p className="text-gray-500 max-w-sm mt-1">When users book blood donation appointments, they will appear here for you to review.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAppointments;