"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { NewestProductsProps } from "@/lib";

const NewestProducts = () => {
  const [data, setData] = useState<NewestProductsProps[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/newest`);
      const result = await res.json();
      setData(result);
    };
    getData();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produk Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Produk</th>
                <th className="px-4 py-2 border">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewestProducts;
