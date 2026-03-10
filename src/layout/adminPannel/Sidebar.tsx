// "use client";

// import { LayoutDashboard, Droplet, Users, CalendarDays, ClipboardList } from "lucide-react";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const Sidebar = () => {
//   const pathname = usePathname();

//   const menuItems = [
//     {
//       name: "Dashboard",
//       href: "/admin/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Inventory",
//       href: "/admin/inventory",
//       icon: Droplet,
//     },
//     {
//       name: "Donors",
//       href: "/admin/donors",
//       icon: Users,
//     },
//     {
//       name: "Blood Requests",
//       href: "/admin/bloodrequest",
//       icon: ClipboardList,
//     },
//     {
//       name: "Appointments",
//       href: "/admin/appointments",
//       icon: CalendarDays,
//     },
//   ];

//   return (
//     <aside className="h-screen w-64 bg-white border-r shadow-sm p-5">

//       {/* Navigation */}
//       <nav className="flex flex-col gap-2">

//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href;

//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
              
//               ${isActive
//                   ? "bg-red-600 text-white shadow-sm"
//                   : "text-gray-600 hover:bg-red-50 hover:text-red-600"
//                 }
              
//               `}
//             >
//               <Icon size={20} />
//               <span>{item.name}</span>
//             </Link>
//           );
//         })}

//       </nav>

//       {/* Bottom Info */}
//       <div className="absolute bottom-6 left-6 right-6 text-xs text-gray-400">
//         BloodNeed Admin Panel
//       </div>

//     </aside>
//   );
// };

// export default Sidebar;




"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Droplet, 
  Users, 
  CalendarDays, 
  ClipboardList, 
  Mail,
  Menu,
  X
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Inventory",
      href: "/admin/inventory",
      icon: Droplet,
    },
    {
      name: "Donors",
      href: "/admin/donors",
      icon: Users,
    },
    {
      name: "Blood Requests",
      href: "/admin/bloodrequest",
      icon: ClipboardList,
    },
    {
      name: "Appointments",
      href: "/admin/appointments",
      icon: CalendarDays,
    },
    {
      name: "Contact", // New Contact Menu Item
      href: "/admin/contact",
      icon: Mail, 
    },
  ];

  // Close sidebar on mobile when a link is clicked
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Toggle Button (Visible only on small screens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white text-gray-700 rounded-lg shadow-md border border-gray-200 focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-gray-900/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r shadow-sm flex flex-col transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        {/* Top spacing on mobile to prevent overlap with the hamburger menu */}
        <div className="p-5 pt-20 md:pt-5 flex-1 overflow-y-auto custom-scrollbar">
          

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar} // Auto-close on mobile
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-red-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Info - Using standard padding instead of absolute positioning so it doesn't overlap on short screens */}
        <div className="p-5 border-t border-gray-100">
          <div className="text-xs text-gray-400 font-medium">
            BloodNeed Admin Panel
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;