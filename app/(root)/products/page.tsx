import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/lib/models/products";
import ProductList from "@/components/ProductList";

export default async function ProductsPage() {
  // connect ke database
  await connectDB();

  // ambil semua produk dari database
  const products = JSON.parse(JSON.stringify(await Product.find()));

  return (
    <div className="container mx-auto mt-10 px-4 md:px-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Produk</h2>
        <Link href="/products/add">
          <Button className="bg-blue-600 text-white w-full sm:w-auto">Tambah Produk</Button>
        </Link>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">{products.length > 0 ? <ProductList products={products} /> : <p className="text-gray-500 text-sm">Belum ada produk</p>}</div>
    </div>
  );
}
