"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { createProductValidation, editProductValidation } from "@/lib/validation/formProductValidation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EditProductProps } from "@/lib";
import Image from "next/image";

const ProductForm = ({ mode = "add", initialData }: { mode?: "add" | "edit"; initialData?: EditProductProps }) => {
  const isEdit = mode === "edit";
  const [errors, setErrors] = useState<Record<string, string>>({}); // untuk menyimpan error yang ada di form
  const router = useRouter();
  const [isPending, setIsPending] = useState(false); // untuk menampilkan loading state
  const onClose = () => {
    router.push("/products"); // redirect ke halaman produk
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // mencegah form submit default
    const formData = new FormData(e.currentTarget);

    // cek apakah admin mengirim gambar baru atau tidak
    const file = formData.get("link") as File;
    if (!file || file.size === 0) {
      formData.delete("link"); // supaya tidak dikirim
    }

    // ambil data dari form
    const formValues = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      link: file.size === 0 ? undefined : file, // karena type="file"
      stock: Number(formData.get("stock")),
    };
    try {
      if (isEdit) {
        await editProductValidation.parseAsync(formValues);
      } else {
        await createProductValidation.parseAsync(formValues);
      } // validasi form menggunakan zod
      setIsPending(true);
      // kirim data ke server sesuai mode
      const res = await fetch(isEdit ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/edit/${initialData?._id}` : `${process.env.NEXT_PUBLIC_API_URL}/api/products/add`, {
        method: isEdit ? "PUT" : "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("result dari product: ", data);

      if (data.status === "EDIT SUCCESS") {
        toast("Berhasil mengirim data", {
          description: "Produk telah diedit",
        });
        setIsPending(false);
        router.push(`/products`); // redirect pake router.push karena ini adalah client component
      } else if (data.status === "SUCCESS") {
        toast("Berhasil mengirim data", {
          description: "Produk baru telah ditambahkan",
        });
        setIsPending(false);
        router.push(`/products`); // redirect pake router.push karena ini adalah client component
      }
    } catch (error) {
      console.log("Form submit error: ", error);
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors; // ambil error dari zod
        setErrors(fieldErrors as unknown as Record<string, string>); // set error ke state

        setIsPending(false);
        toast("Error", {
          description: "Please check your input",
        });
      }
      setIsPending(false);
      toast("Eror", {
        description: "Unexpected error",
      });
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
        <button onClick={onClose} className=" text-gray-500 hover:text-gray-700" aria-label="Tutup">
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{isEdit ? "Edit Produk" : "Tambah Produk Baru"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
          {/* Nama Produk */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Produk
            </label>
            <Input id="name" name="name" placeholder="Nama Produk" required defaultValue={initialData?.name || ""} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Harga */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Harga
            </label>
            <Input id="price" name="price" placeholder="Harga (cth: 150000)" required defaultValue={initialData?.price || ""} />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi Produk
            </label>
            <Textarea id="description" name="description" placeholder="Deskripsi lengkap produk..." required defaultValue={initialData?.description || ""} />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Kategori */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori / Jenis Produk
            </label>
            <Input id="category" name="category" placeholder="Contoh: Ban Mobil, Oli Mesin" required defaultValue={initialData?.category || ""} />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Gambar */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Gambar Produk
            </label>
            {/* Gambar lama (kalau edit) */}
            {isEdit && initialData?.imageUrl && (
              <div className="mb-3">
                <p className="text-sm text-gray-600">Gambar saat ini:</p>
                <Image src={initialData.imageUrl} alt="Gambar Produk" className="w-40 h-40 object-cover rounded-md border" width={40} height={40} />
              </div>
            )}

            <Input id="link" name="link" type="file" required={!isEdit} />
            {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
          </div>

          {/* Stok */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stok Produk
            </label>
            <Input id="stock" name="stock" placeholder="Jumlah stok tersedia" required defaultValue={initialData?.stock || ""} />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>

          {/* Tombol Kirim */}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2" disabled={isPending}>
            {isPending ? "Loading..." : isEdit ? "Edit" : "Tambah"} <Send size={18} />
          </Button>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
