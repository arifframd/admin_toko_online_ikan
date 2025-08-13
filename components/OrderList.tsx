"use client";
import { getAllOrders, orderByMonth } from "@/lib/actions";
import React, { useEffect, useState } from "react";
import Category from "./MonthCategory";
import { TransactionProps } from "@/lib";
import { Button } from "./ui/button";

const OrderList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [orders, setOrders] = useState<TransactionProps[]>([]);
  const [ordersByMonth, setOrdersByMonth] = useState<{ month: string; orders: TransactionProps[] }[]>([]);

  const handleToggleProcessed = async (id: string, newValue: boolean) => {
    await fetch(`/api/transactions/${id}/process`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isProcessed: newValue }),
    });

    const ordersByMonth = await orderByMonth();
    setOrdersByMonth(ordersByMonth);

    const orders = await getAllOrders();
    setOrders(orders || []);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersByMonth = await orderByMonth();
      setOrdersByMonth(ordersByMonth);

      const orders = await getAllOrders();
      setOrders(orders || []);
    };
    fetchOrders();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const filteredOrders = selectedCategory === "Semua" ? orders : ordersByMonth.find((order) => order.month === selectedCategory)?.orders || [];

  return (
    <div className="overflow-x-auto rounded-lg shadow p-4 sm:p-6">
      <h1 className="text-2xl font-semibold mb-4">Daftar Order</h1>

      {/* Filter dan Tombol Cetak */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handlePrint} className="w-full sm:w-auto">
            Cetak PDF
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-[16px] sm:text-[18px] text-gray-600 font-semibold">Bulan:</h1>
            <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 sm:px-6 py-3 font-semibold text-gray-700">Order Id</th>
              <th className="px-4 sm:px-6 py-3 font-semibold text-gray-700">Produk</th>
              <th className="px-4 sm:px-6 py-3 font-semibold text-gray-700">Nama</th>
              <th className="px-4 sm:px-6 py-3 font-semibold text-gray-700">Alamat</th>
              <th className="px-4 sm:px-6 py-3 font-semibold text-gray-700">Jumlah</th>
              <th className="px-4 sm:px-6 py-3 font-semibold text-gray-700">Total</th>
              <th className="px-4 sm:px-6 py-3 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">{order.order_id}</td>

                  {/* Produk */}
                  <td className="px-4 sm:px-6 py-4">
                    {(order.products || []).map((p, idx) => (
                      <div key={idx} className="mb-1">
                        - {p.product_name}
                      </div>
                    ))}
                  </td>

                  <td className="px-4 sm:px-6 py-4">{order.name}</td>
                  <td className="px-4 sm:px-6 py-4">{order.address}</td>

                  {/* Jumlah (qty) */}
                  <td className="px-4 sm:px-6 py-4">
                    {(order.products || []).map((p, idx) => (
                      <div key={idx} className="mb-1">
                        {p.quantity} pcs
                      </div>
                    ))}
                  </td>

                  <td className="px-4 sm:px-6 py-4">{order.total}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <input type="checkbox" checked={order.isProcessed} onChange={() => handleToggleProcessed(order._id, !order.isProcessed)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 sm:px-6 py-4" colSpan={7}>
                  Tidak ada data Order
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
