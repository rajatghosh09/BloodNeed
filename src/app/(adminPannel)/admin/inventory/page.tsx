"use client";

import { useState } from "react";
import Lottie from "lottie-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loadingAnimation from "@/services/json/loader/bloodsathi.json";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Pencil, Trash2, Plus, Droplet, AlertCircle } from "lucide-react";

import {
  useBloodInventory,
  AddBlood,
  DeleteBlood,
  UpdateBlood,
} from "@/hooks/admin.inventory";

const bloodGroups = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

// Helper function for nice date formatting
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Inventory = () => {
  const { data: inventory, isLoading } = useBloodInventory();

  const addBlood = AddBlood();
  const updateBlood = UpdateBlood();
  const deleteBlood = DeleteBlood();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");

  const today = new Date().toISOString();
  const isEdit = !!editData;

  const handleSubmit = () => {
    if (isEdit) {
      updateBlood.mutate({
        blood_group: bloodGroup,
        units_available: Number(units),
        last_updated: today,
      });
    } else {
      addBlood.mutate({
        blood_group: bloodGroup,
        units_available: Number(units),
        last_updated: today,
      });
    }

    setOpen(false);
    setEditData(null);
    setBloodGroup("");
    setUnits("");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-32">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
          <p className="text-gray-600 font-medium tracking-wide">
            Loading inventory...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      
      {/* ================= LEFT SIDE (TABLE) ================= */}
      {/* order-2 on mobile so Stock shows first, order-1 on lg screens */}
      <div className="lg:col-span-2 xl:col-span-3 space-y-6 order-2 lg:order-1">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <Droplet className="text-red-600 w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-red-600">Blood Inventory</h1>
              <p className="text-sm text-gray-500">Manage and update available blood units</p>
            </div>
          </div>

          <Button
            onClick={() => {
              setEditData(null);
              setBloodGroup("");
              setUnits("");
              setOpen(true);
            }}
            className="bg-red-600 hover:bg-red-700 text-white shadow-sm flex gap-2 w-full sm:w-auto"
          >
            <Plus size={18} />
            Add Blood
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="font-semibold text-gray-600">Blood Group</TableHead>
                  <TableHead className="font-semibold text-gray-600">Units</TableHead>
                  <TableHead className="font-semibold text-gray-600">Created</TableHead>
                  <TableHead className="font-semibold text-gray-600">Last Updated</TableHead>
                  <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {(!inventory || inventory.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                      No inventory records found. Click &quot;Add Blood&quot; to create one.
                    </TableCell>
                  </TableRow>
                )}

                {inventory?.map((item: any) => (
                  <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 font-bold text-lg border border-red-100">
                        {item.blood_group}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className={`px-3 py-1 rounded-full font-medium text-sm border ${
                        item.units_available <= 2 
                          ? "bg-red-50 text-red-700 border-red-200" 
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}>
                        {item.units_available} Units
                      </span>
                    </TableCell>

                    <TableCell className="text-gray-600 text-sm">
                      {formatDate(item.created_at)}
                    </TableCell>

                    <TableCell className="text-gray-600 text-sm">
                      {formatDate(item.last_updated)}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => {
                            setEditData(item);
                            setBloodGroup(item.blood_group);
                            setUnits(item.units_available.toString());
                            setOpen(true);
                          }}
                        >
                          <Pencil size={18} />
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteBlood.mutate(item.blood_group)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE (BLOOD STOCK) ================= */}
      {/* order-1 on mobile so it sits at the top, order-2 on lg screens */}
      <div className="space-y-6 order-1 lg:order-2">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          Current Stock Levels
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {bloodGroups.map((group) => {
            const found = inventory?.find(
              (item: any) => item.blood_group === group
            );

            const units = found?.units_available || 0;
            const isLowStock = units <= 2;

            return (
              <div
                key={group}
                className={`relative border rounded-xl p-5 shadow-sm flex flex-col items-center justify-center transition-all ${
                  isLowStock 
                    ? "bg-red-50/50 border-red-200" 
                    : "bg-white hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {/* Ping Indicator for Low Stock */}
                {isLowStock && (
                  <div className="absolute top-2.5 right-2.5 flex h-3 w-3" title="Low Stock Warning">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </div>
                )}

                <p className={`text-lg font-bold ${isLowStock ? "text-red-700" : "text-gray-700"}`}>
                  {group}
                </p>

                <p className={`text-2xl font-black mt-1 ${isLowStock ? "text-red-600" : "text-emerald-600"}`}>
                  {units} <span className="text-sm font-medium text-gray-500 ml-1">Units</span>
                </p>

                {isLowStock && (
                  <p className="text-xs font-semibold text-red-600 flex items-center gap-1 mt-2 bg-red-100 px-2 py-1 rounded-md">
                    <AlertCircle size={12} /> Low Stock
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= ADD / UPDATE DIALOG ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Droplet className="text-red-600 w-5 h-5" />
              {isEdit ? "Update Blood Inventory" : "Add Blood to Inventory"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Blood Group</label>
              <Select value={bloodGroup} onValueChange={setBloodGroup}>
                <SelectTrigger className={isEdit ? "bg-gray-100 opacity-70 cursor-not-allowed" : ""}>
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((g) => (
                    // We disable the selection of other groups during edit, 
                    // assuming blood group is the primary key/identifier
                    <SelectItem key={g} value={g} disabled={isEdit && g !== editData?.blood_group}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Units Available</label>
              <Input
                type="number"
                min="0"
                placeholder="Enter number of units"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="text-lg"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!bloodGroup || units === ""}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEdit ? "Update Inventory" : "Save to Inventory"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;