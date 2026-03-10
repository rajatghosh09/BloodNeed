"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseclient";
import { Search, MapPin, Phone, Droplet, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Dynamically import the map so it doesn't break Next.js
const MapComponent = dynamic(() => import("@/components/userdonors/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 animate-pulse">
      <Loader2 className="w-8 h-8 text-red-400 animate-spin mb-2" />
      <p className="text-gray-500 font-medium">Loading map...</p>
    </div>
  ),
});

const Donors = () => {
  const [donors, setDonors] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeLocation, setActiveLocation] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [geocodingProgress, setGeocodingProgress] = useState("");

  // updated one
  const fetchAndGeocodeDonors = async () => {
    setIsLoading(true);
    setGeocodingProgress("Fetching donors from database...");

    const { data, error } = await supabase
      .from("register")
      .select("*")
      .not("blood_group", "is", null)
      .eq("role", "user");

    if (error || !data) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    const processedDonors = [];

    for (let i = 0; i < data.length; i++) {
      const donor = data[i];
      setGeocodingProgress(`Locating ${donor.full_name || 'donor'} on map (${i + 1}/${data.length})...`);

      if (!donor.address || donor.address.length < 5) {
        processedDonors.push({ ...donor, lat: null, lng: null });
        continue;
      }

      try {
        let lat = null;
        let lng = null;
        const addressText = donor.address;

        // --- ATTEMPT 1: Exact Match ---
        let res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressText)}`);
        let geoData = await res.json();

        if (geoData && geoData.length > 0) {
          lat = parseFloat(geoData[0].lat);
          lng = parseFloat(geoData[0].lon);
        }

        // --- ATTEMPT 2: The PIN Code Trick (Highly Reliable) ---
        if (!lat) {
          // Look for any 6 consecutive numbers in the address string
          const pinMatch = addressText.match(/\b\d{6}\b/);
          if (pinMatch) {
            const pinCode = pinMatch[0];
            res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(pinCode + ", India")}`);
            geoData = await res.json();

            if (geoData && geoData.length > 0) {
              lat = parseFloat(geoData[0].lat);
              lng = parseFloat(geoData[0].lon);
            }
          }
        }

        // --- ATTEMPT 3: Aggressive Text Cleanup ---
        if (!lat) {
          let cleanedAddress = addressText.toLowerCase()
            .replace(/sector\s*[a-z0-9]+/gi, "") // Removes "Sector V", "Sector 5"
            .replace(/vill\s*\+\s*p\.?o\.?-?/gi, " ")
            .replace(/p\.?s\.?-?/gi, " ")
            .replace(/dist\.?-?/gi, " ")
            .replace(/north 24\s*pgs/gi, "North 24 Parganas")
            .replace(/south 24\s*pgs/gi, "South 24 Parganas")
            .replace(/[-+,]/g, " ")                   // Removes hyphens and commas
            .replace(/\s+/g, " ")
            .trim();

          cleanedAddress = cleanedAddress + ", West Bengal, India";

          res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanedAddress)}`);
          geoData = await res.json();

          if (geoData && geoData.length > 0) {
            lat = parseFloat(geoData[0].lat);
            lng = parseFloat(geoData[0].lon);
          }
        }

        // --- ATTEMPT 4: City Fallbacks ---
        if (!lat) {
          const lower = addressText.toLowerCase();
          let fallback = "";
          if (lower.includes("kolkata") || lower.includes("salt lake") || lower.includes("bidhan nagar")) fallback = "Kolkata, West Bengal, India";
          else if (lower.includes("habra")) fallback = "Habra, West Bengal, India";
          else if (lower.includes("barasat")) fallback = "Barasat, West Bengal, India";

          if (fallback) {
            res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fallback)}`);
            geoData = await res.json();
            if (geoData && geoData.length > 0) {
              lat = parseFloat(geoData[0].lat);
              lng = parseFloat(geoData[0].lon);
            }
          }
        }

        // Push final results
        processedDonors.push({ ...donor, lat, lng });

        // Respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (err) {
        processedDonors.push({ ...donor, lat: null, lng: null });
      }
    }

    setDonors(processedDonors);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAndGeocodeDonors();
  }, []);

  const filteredDonors = donors.filter((d) =>
    `${d.full_name} ${d.blood_group} ${d.address} ${d.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto h-[calc(100vh-2rem)] flex flex-col">

      {/* Header */}
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="text-red-600 w-7 h-7" />
          Nearby Blood Donors
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Search and locate available blood donors.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">

        {/* ================= LEFT SIDE: DONOR LIST ================= */}
        <div className="lg:col-span-4 xl:col-span-4 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">

          <div className="p-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search name, city, blood group..."
                className="pl-9 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {!isLoading && (
              <div className="mt-3 flex gap-2">
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Total: {donors.length}
                </span>
                <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-1 rounded">
                  Mapped: {donors.filter(d => d.lat).length}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-red-400" />
                <p className="text-sm font-medium text-center px-4">{geocodingProgress}</p>
                <p className="text-xs text-gray-400 text-center">(Converting text addresses to map pins...)</p>
              </div>
            ) : filteredDonors.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No donors found.</p>
            ) : (
              filteredDonors.map((donor, idx) => (
                <div key={idx} className="bg-white border rounded-xl p-4 hover:border-red-200 transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {donor.full_name || "Unknown"}
                    </h3>
                    <span className="bg-red-50 text-red-600 font-bold px-2 py-1 rounded text-sm border border-red-100 flex items-center gap-1">
                      <Droplet className="w-3 h-3" fill="currentColor" />
                      {donor.blood_group}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{donor.address || "No address"}</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      {donor.phone || "No phone"}
                    </p>
                  </div>

                  <Button
                    variant={donor.lat ? "default" : "secondary"}
                    className={`w-full text-sm font-medium transition-all ${donor.lat
                      ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    onClick={() => {
                      if (donor.lat && donor.lng) {
                        setActiveLocation([donor.lat, donor.lng]);
                      }
                    }}
                    disabled={!donor.lat}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {donor.lat ? "View on Map" : "Invalid Address for Map"}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDE: MAP ================= */}
        <div className="lg:col-span-8 xl:col-span-8 bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200 h-full relative z-0">
          <MapComponent donors={filteredDonors} activeLocation={activeLocation} />
        </div>

      </div>
    </div>
  );
};

export default Donors;