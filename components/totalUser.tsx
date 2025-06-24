"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function UserPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/totalUsers`);
      const json = await res.json();
      setData(json);
    };
    getData();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Total User dan Admin</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        <PieChart width={400} height={300}>
          <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  );
}
