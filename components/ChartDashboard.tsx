"use client";
import dynamic from "next/dynamic";

// SSR off untuk komponen yang pakai Recharts
const TotalUser = dynamic(() => import("@/components/totalUser"), { ssr: false });
const MonthlySales = dynamic(() => import("@/components/MonthlySales"), { ssr: false });
const MonthlyOrders = dynamic(() => import("@/components/MonthlyOrders"), { ssr: false });

export default function ChartDashboard() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MonthlySales />
        <TotalUser />
        <MonthlyOrders />
      </div>
    </div>
  );
}
