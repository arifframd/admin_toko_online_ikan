import ProductForm from "@/components/ProductForm";
import { EditProductProps, RouteParams } from "@/lib";
import React from "react";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  console.log("id: ", id);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/edit/${id}`);
  const product = await res.json();
  console.log("Product: ", product);

  return (
    <div>
      <ProductForm
        mode="edit"
        initialData={{ _id: product._id, name: product.name, price: product.price, description: product.description, imageUrl: product.imageUrl, category: product.category, stock: product.stock } as EditProductProps}
      />
    </div>
  );
};

export default page;
