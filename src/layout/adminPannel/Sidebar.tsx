"use client";

import { LayoutDashboard, Droplet, Users, CalendarDays, ClipboardList } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

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
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r shadow-sm p-5">

      {/* Navigation */}
      <nav className="flex flex-col gap-2">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
              
              ${isActive
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

      {/* Bottom Info */}
      <div className="absolute bottom-6 left-6 right-6 text-xs text-gray-400">
        BloodNeed Admin Panel
      </div>

    </aside>
  );
};

export default Sidebar;