"use client";
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { toast } from "sonner";

const DeleteButton = ({ product_id, onDelete }: { product_id: string; onDelete: (id: string) => void }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/delete/${product_id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.status === "SUCCESS") {
        toast.success(data.message || "Berhasil menghapus produk");
        onDelete(product_id);
      } else {
        toast.error(data.message || "Gagal menghapus produk");
      }
    } catch (err) {
      console.log("Error: ", err);
      toast.error("Terjadi kesalahan saat menghapus.");
    }
  };
  return (
    <>
      <div className="bg-red-500 text-white hover:bg-red-600 p-2 rounded-[10px]">
        <AlertDialog>
          <AlertDialogTrigger>
            <span className="font-semibold">Hapus</span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
              <AlertDialogDescription>Ini akan menghapus data produk dari database kamu</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Lanjut</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default DeleteButton;
