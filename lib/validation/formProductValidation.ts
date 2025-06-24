// untuk validation form product
import { z } from "zod";

export const createProductValidation = z.object({
  name: z.string().min(3).max(50),
  price: z.number().min(1000),
  description: z.string().min(10).max(250),
  category: z.string().min(3).max(50),
  link: z.instanceof(File).refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {
    message: "Hanya gambar JPG, JPEG, atau PNG yang diperbolehkan",
  }),
  stock: z.number().min(1),
});

//  form EDIT produk (link optional)
export const editProductValidation = z.object({
  name: z.string().min(3).max(50),
  price: z.number().min(1000),
  description: z.string().min(10).max(250),
  category: z.string().min(3).max(50),
  link: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
      },
      {
        message: "Hanya gambar JPG, JPEG, atau PNG yang diperbolehkan",
      }
    ),
  stock: z.number().min(1),
});
