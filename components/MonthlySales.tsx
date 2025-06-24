"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function MonthlySales() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/monthly`);
      const json = await res.json();
      setData(json);
    };
    getData();
  }, []);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Total Penjualan per Bulan</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(val) => `Rp${val / 1000}k`} />
            <Tooltip formatter={(val: number) => `Rp${val.toLocaleString()}`} />
            <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
