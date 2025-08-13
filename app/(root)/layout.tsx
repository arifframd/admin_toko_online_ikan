"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";
import { Menu } from "lucide-react"; // ikon hamburger

export default function WithSidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar kecil untuk HP */}
      <div className="sm:hidden flex items-center p-4 bg-white shadow">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
        <h1 className="ml-4 font-semibold text-lg">Dashboard</h1>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - di desktop selalu muncul, di HP muncul saat toggle */}
        <div className={`${isOpen ? "fixed inset-0 z-50 bg-transparent bg-opacity-40" : "hidden sm:block"}`}>
          <div className={`${isOpen ? "fixed left-0 top-0 h-full w-64 bg-white shadow z-50" : "sm:static sm:w-64"}`}>
            <Sidebar />
            {/* Tombol close di HP */}
            {isOpen && (
              <button className="absolute top-4 right-4 text-gray-600" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Konten utama */}
        <div className="flex-1 p-4">{children}</div>
      </div>

      <Toaster />
    </div>
  );
}
