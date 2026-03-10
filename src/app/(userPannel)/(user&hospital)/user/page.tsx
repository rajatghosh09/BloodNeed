"use client";

import AppointmentForm from "@/components/userdashboard/AppointmentForm";
import { useAuthStore } from "@/zustand/userAuth";

import {Droplet,
  Mail,
  Phone,
  MapPin,
  User,
  ClipboardClock,
} from "lucide-react";

const UserDashboard = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/40 p-6">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* Welcome Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border">

          <div>
            <h1 className="text-2xl font-bold">
              Welcome, {user.full_name}
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Thank you for being a life-saving blood donor.
            </p>
          </div>

          {/* Blood Group Badge */}
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-semibold">

            <Droplet className="w-5 h-5" />

            {user.blood_group}

          </div>

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md border">

            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-red-500" />
              Your Profile
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-3">
                <User className="text-gray-400 w-4 h-4" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Full Name
                  </p>
                  <p className="font-medium">
                    {user.full_name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-gray-400 w-4 h-4" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>
                  <p className="font-medium">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-gray-400 w-4 h-4" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>
                  <p className="font-medium">
                    {user.phone || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-gray-400 w-4 h-4" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Address
                  </p>
                  <p className="font-medium">
                    {user.address || "N/A"}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Appointment Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md border">

            <h2 className="text-xl font-semibold mb-6 flex gap-2">
              <ClipboardClock className="w-5 h-5 text-red-500 mt-1" /> Book Donation Appointment
            </h2>

            {/* <AppointmentForm userId={user.auth_id} /> */}
            <AppointmentForm userId={(user as any).auth_id} />
          </div>

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;