"use client";

import React, { useState } from "react";
import { Product } from "@/lib";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { toast } from "sonner";

const ProductList = ({ products }: { products: Product[] }) => {
  const [productList, setProductList] = useState(products || []);
  console.log("Initial product list:", productList);

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p._id !== id));
    toast.success("Produk berhasil dihapus!");
  };

  return (
    <div className="md:p-6 p-2">
      <h2 className="md:text-2xl text-1xl font-bold mb-4">Daftar Produk</h2>
      <div className="overflow-x-auto overflow-y-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Nama</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Deskripsi</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Harga</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Kategori</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Stok</th>
              <th className="px-6 py-3 font-semibold text-gray-700"></th>
              <th className="px-6 py-3 font-semibold text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {productList.length > 0 ? (
              productList.map((product) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4 line-clamp-3">{product.description}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <Link href={`/products/edit/${product._id}`}>
                      <Button className="bg-blue-500 text-white hover:bg-blue-600">Edit</Button>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <DeleteButton product_id={product._id.toString()} onDelete={handleDelete} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan={7}>
                  Tidak ada produk
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
