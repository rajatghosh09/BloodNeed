// "use client";

// import {
//   useHospitalRequestsAdmin,
//   useUpdateRequestStatus,
// } from "@/hooks/adminBloodRequest";

// const BloodRequest = () => {
//   const { data, isLoading } = useHospitalRequestsAdmin();
//   const updateStatus = useUpdateRequestStatus();
  
//   // Optional: Keep for debugging, remove in production
//   console.log("data from blood request", data);

//   if (isLoading) return <p className="p-6 text-gray-500">Loading requests...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-red-600">
//         Hospital Blood Requests
//       </h1>

//       <div className="overflow-x-auto bg-white rounded-xl shadow">
//         <table className="w-full text-sm">
//           <thead className="bg-red-50">
//             <tr>
//               <th className="p-3">Hospital</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Address</th>
//               <th className="p-3">Blood</th>
//               <th className="p-3">Units</th>
//               <th className="p-3">Priority</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {(!data || data.length === 0) && (
//               <tr>
//                 <td colSpan={8} className="text-center p-6 text-gray-500">
//                   No blood requests found
//                 </td>
//               </tr>
//             )}

//             {data?.map((req: any) => (
//               <tr key={req.id} className="border-t text-center">
//                 {/* Notice these are now flat properties instead of req.register.X */}
//                 <td className="p-3 font-medium">
//                   {req.hospital_name ?? "_"}
//                 </td>

//                 <td className="p-3">{req.email}</td>

//                 <td className="p-3">{req.address}</td>

//                 <td className="p-3 text-red-600 font-semibold">
//                   {req.blood_group}
//                 </td>

//                 <td className="p-3">{req.units_requested}</td>

//                 <td className="p-3 capitalize">{req.priority_level}</td>

//                 <td className="p-3">
//                   <span className={`px-3 py-1 rounded-full text-xs ${
//                       req.status === 'approved'
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-yellow-100 text-yellow-700'
//                     }`}
//                   >
//                     {req.status || "pending"}
//                   </span>
//                 </td>

//                 <td className="p-3">
//                   {req.status !== "approved" && (
//                     <button
//                       onClick={() =>
//                         updateStatus.mutate({
//                           id: req.id,
//                           status: "approved",
//                         })
//                       }
//                       className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
//                     >
//                       Approve
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BloodRequest;



"use client";

import {
  useHospitalRequestsAdmin,
  useUpdateRequestStatus,
} from "@/hooks/adminBloodRequest";
import Lottie from "lottie-react";
import loadingAnimation from "@/services/json/loader/bloodsathi.json";
import { Mail, PhoneCall } from "lucide-react";



// // Helper function to truncate text to a specific number of words
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

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
//           <p className="text-gray-500 font-medium">Loading requests...</p>
//         </div>
//       </div>
//     );
    //   }
    
if (isLoading) {
    return (
      // 'fixed inset-0 z-50' forces it to the center of the screen, ignoring sidebars/navbars
      // 'bg-white/80' gives it a nice subtle transparent background overlay
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          {/* Wrapper div to control the size of the animation */}
          <div className="w-32 h-32"> 
            <Lottie 
              animationData={loadingAnimation} 
              loop={true} 
            />
          </div>
          <p className="text-gray-600 font-medium tracking-wide">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-red-600">
            Hospital Blood Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and approve blood requirements from registered hospitals.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          <span className="text-sm font-semibold text-gray-600">Total Requests: </span>
          <span className="text-red-600 font-bold">{data?.length || 0}</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-base font-medium text-gray-500">No blood requests found</p>
                      <p className="text-sm">New requests will appear here.</p>
                    </div>
                  </td>
                </tr>
              )}

              {data?.map((req: any) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors duration-150">
                  
                  {/* Hospital Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-800">
                      {req.hospital_name ?? "Unknown Hospital"}
                    </div>
                  </td>

                 {/* Contact (Email & Phone combined for cleaner UI) */}
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

                  {/* Address (Truncated to 10 words, full address on hover) */}
                  <td className="px-6 py-4">
                    <div 
                      className="text-sm text-gray-600 max-w-[200px] cursor-help"
                      title={req.address} // Native browser tooltip for full address
                    >
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
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center gap-1 w-fit mx-auto ${
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
                        onClick={() =>
                          updateStatus.mutate({
                            id: req.id,
                            status: "approved",
                          })
                        }
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