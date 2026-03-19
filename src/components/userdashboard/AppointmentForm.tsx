"use client";

import { useState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { CalendarIcon, LoaderCircle, Droplet, Clock, CalendarCheck, Info, CheckCircle2, PhoneCall, Mail } from "lucide-react";

import { CreateAppointment, useLatestAppointment } from "@/hooks/appointment";

interface Props {
  userId: string;
}

const AppointmentForm = ({ userId }: Props) => {
  const [date, setDate] = useState<Date | undefined>();
  const [bookedDate, setBookedDate] = useState<Date | undefined>();
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = CreateAppointment();
  const { data: latest } = useLatestAppointment(userId);

  // Set minDate to the next eligible date, or today if they have never donated
  const minDate = latest?.next_eligibility_date
    ? new Date(latest.next_eligibility_date)
    : new Date();
    
  // Strip the time from today so they can book today if eligible
  minDate.setHours(0, 0, 0, 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) return;

    mutation.mutate(
      {
        user_id: userId,
        donation_date: format(date, "yyyy-MM-dd"),
      },
      {
        onSuccess: () => {
          setBookedDate(date);  // Save the date
          setDate(undefined);   // Reset the calendar input
          setOpenDialog(true);  // Open the success dialog
        },
      }
    );
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      
      {/* Header section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Droplet className="w-6 h-6 text-red-600" fill="currentColor" />
          Donation Hub
        </h2>
        <p className="text-gray-500 mt-1">Manage your blood donation schedule and eligibility.</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Last Donation Card */}
        <div className="p-6 border border-gray-100 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-2">
            <Clock className="w-4 h-4 text-gray-400" /> 
            Last Donation
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {latest?.donation_date ? format(new Date(latest.donation_date), "MMM dd, yyyy") : "No history"}
          </h3>
        </div>

        {/* Next Eligible Card */}
        <div className="p-6 border border-red-100 rounded-xl bg-gradient-to-br from-red-50/50 to-white shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-red-600 font-medium mb-2">
            <CalendarCheck className="w-4 h-4" /> 
            Next Eligible Date
          </div>
          <h3 className="text-2xl font-bold text-red-600">
            {latest?.next_eligibility_date ? format(new Date(latest.next_eligibility_date), "MMM dd, yyyy") : "Eligible right now"}
          </h3>
        </div>
      </div>

      {/* Warning/Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-800">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong>Health Reminder:</strong> Donors are safely eligible to donate blood again after a <strong>90 day</strong> recovery period. Please ensure you are feeling healthy, hydrated, and well-rested before your next appointment.
        </div>
      </div>

      {/* Booking Section */}
      <form onSubmit={handleSubmit} className="pt-4 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Book Your Next Appointment</h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`flex-1 justify-start text-left font-normal h-12 rounded-xl border-gray-200 ${!date && "text-gray-500"}`}
              >
                <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                {date ? format(date, "PPP") : "Select a donation date..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-xl" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < minDate}
                initialFocus
                className="p-3"
              />
            </PopoverContent>
          </Popover>

          {/* Book Button */}
          <Button
            type="submit"
            className="h-12 px-8 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md shadow-red-600/20 transition-all sm:w-auto w-full"
            disabled={mutation.isPending || !date}
          >
            {mutation.isPending ? (
              <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </div>
      </form>

      {/* Success Dialog (The "Ticket") */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden border-0">
          
          {/* Top colored banner */}
          <div className="bg-green-500 p-6 flex flex-col items-center justify-center text-white text-center">
            <CheckCircle2 className="w-16 h-16 text-white mb-3" />
            <DialogTitle className="text-2xl font-bold text-white">Booking Confirmed!</DialogTitle>
            <p className="text-green-100 mt-1 text-sm">Thank you for stepping up to save lives.</p>
          </div>

          <div className="p-6 md:p-8 space-y-6 bg-white">
            
            {/* The Date display (Now working perfectly!) */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Appointment Date</p>
                <p className="text-lg font-bold text-gray-900">
                  {bookedDate ? format(bookedDate, "EEEE, MMMM do, yyyy") : ""}
                </p>
              </div>
              <CalendarCheck className="w-8 h-8 text-green-500 opacity-20" />
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-gray-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-red-500" /> Before you arrive:
              </p>
              <ul className="text-sm text-gray-600 space-y-2 ml-6 list-disc marker:text-red-400">
                <li>Eat an iron-rich, healthy meal.</li>
                <li>Drink an extra 16oz of water.</li>
                <li>Bring a valid state ID or driver&apos;s license.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 text-sm text-gray-500 flex flex-row sm:flex-row justify-between gap-2">
              <p><PhoneCall /> Support: <span className="font-semibold text-gray-900">+91 98765 43210</span></p>
              <p><Mail /> Email: <span className="font-semibold text-gray-900">support@bloodneed.com</span></p>
            </div>

            <Button
              className="w-full h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold"
              onClick={() => setOpenDialog(false)}
            >
              Done
            </Button>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentForm;