"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { NewestOrdersProps } from "@/lib";

const NewestOrders = () => {
  const [data, setData] = useState<NewestOrdersProps[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/newest`);
      const result = await res.json();
      setData(result);
    };
    getData();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pesanan Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Nama</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr key={order.order_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{order.order_id}</td>
                  <td className="px-4 py-2 border">{order.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewestOrders;
