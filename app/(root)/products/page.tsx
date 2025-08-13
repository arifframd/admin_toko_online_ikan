import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import { getAllProducts } from "@/lib/actions";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto mt-6 px-3 sm:px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Produk</h2>
        <Link href="/products/add" className="w-full sm:w-auto">
          <Button className="bg-blue-600 text-white w-full sm:w-auto">Tambah Produk</Button>
        </Link>
      </div>

      {/* List Produk */}
      <div className="bg-white p-2 md:p-6 rounded-lg shadow-sm">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProductList products={products} />
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Belum ada produk</p>
        )}
      </div>
    </div>
  );
}
