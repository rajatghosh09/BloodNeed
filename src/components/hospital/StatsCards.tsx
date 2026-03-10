"use client";

import { motion } from "framer-motion";
import { Droplet, ClipboardList, Clock } from "lucide-react";

interface Props {
  total: number;
  pending: number;
  approved: number;
}

const StatsCards = ({ total, pending, approved }: Props) => {
  const stats = [
    {
      label: "Total Requests",
      value: total,
      icon: ClipboardList,
      color: "text-blue-500",
    },
    {
      label: "Pending Requests",
      value: pending,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      label: "Approved Requests",
      value: approved,
      icon: Droplet,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              </div>

              <Icon className={`w-7 h-7 ${stat.color}`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;