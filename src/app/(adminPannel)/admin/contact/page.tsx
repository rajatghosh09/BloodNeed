"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mail, Phone, Calendar, Inbox, AlertCircle, Heart, Handshake, MessageSquare } from "lucide-react";
import { useContacts } from "@/hooks/admin.contacts";
import Lottie from "lottie-react";
import loadingAnimation from "@/services/json/loader/bloodsathi.json";


interface ContactMsg {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  created_at: string;
}

// Topic configuration for styling and icons
const TOPIC_CONFIG: Record<string, { label: string; color: string; icon: any; bg: string }> = {
  request: { label: "Urgent Request", color: "text-red-700", bg: "bg-red-50 border-red-200", icon: AlertCircle },
  donation: { label: "Donation", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: Heart },
  partnership: { label: "Partnership", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", icon: Handshake },
  general: { label: "General", color: "text-gray-700", bg: "bg-gray-100 border-gray-200", icon: MessageSquare },
};

const AdminContacts = () => {
  const { data: contacts, isLoading, isError } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  // Filter and search logic
  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
    
    return contacts.filter((contact: ContactMsg) => {
      const matchesSearch = 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === "all" || contact.topic === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [contacts, searchTerm, activeTab]);

  // Format Date Helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    }).format(date);
  };

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
      <div className="p-6 bg-red-50 text-red-600 rounded-xl m-6 border border-red-200">
        Failed to load messages. Please try refreshing the page.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-red-600 tracking-tight flex items-center gap-3">
            <Inbox className="h-8 w-8 text-red-600" />
            Inbox Messages
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            You have <span className="font-bold text-gray-900">{contacts?.length || 0}</span> total messages from users.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Topic Filters (Animated Tabs) */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
        {["all", "request", "donation", "partnership", "general"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap overflow-hidden ${
                isActive ? "text-white shadow-md shadow-rose-500/20" : "text-gray-600 hover:bg-gray-100 bg-white border border-gray-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-500 z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 capitalize">
                {tab === "all" ? "All Messages" : tab}
              </span>
            </button>
          );
        })}
      </div>

      {/* Messages Grid */}
      {filteredContacts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center flex flex-col items-center justify-center"
        >
          <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Inbox className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No messages found</h3>
          <p className="text-gray-500 mt-2 max-w-sm">
            We couldn't find any messages matching your current filters or search query.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredContacts.map((contact: ContactMsg, index: number) => {
              const topicMeta = TOPIC_CONFIG[contact.topic?.toLowerCase()] || TOPIC_CONFIG.general;
              const TopicIcon = topicMeta.icon;

              return (
                <motion.div
                  key={contact.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-rose-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-700 uppercase">
                        {contact.name.substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-none">{contact.name}</h3>
                        <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400 font-medium">
                          <Calendar className="h-3 w-3" />
                          {contact.created_at ? formatDate(contact.created_at) : "Just now"}
                        </div>
                      </div>
                    </div>
                    
                    {/* Topic Badge */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${topicMeta.bg} ${topicMeta.color}`}>
                      <TopicIcon className="h-3.5 w-3.5" />
                      {topicMeta.label}
                    </div>
                  </div>

                  {/* Contact Info Row */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 py-3 border-y border-gray-50 text-sm">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 text-gray-600 hover:text-rose-600 transition-colors">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="truncate max-w-[150px]">{contact.email}</span>
                    </a>
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 text-gray-600 hover:text-rose-600 transition-colors">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{contact.phone || "No phone"}</span>
                    </a>
                  </div>

                  {/* Message Body */}
                  <div className="bg-gray-50/50 rounded-xl p-4 flex-1 border border-gray-100 relative group-hover:bg-rose-50/30 transition-colors">
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap line-clamp-4">
                      {contact.message}
                    </p>
                  </div>
                  
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default AdminContacts;