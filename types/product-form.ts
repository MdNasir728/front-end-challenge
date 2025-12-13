import { z } from "zod";

export const productFormSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productCategory: z.string().min(1, "Product category is required"),
  descriptions: z.string().min(1, "Description is required"),
  tagKeywords: z.string().optional(),
  price: z.string().min(1, "Price is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Price must be a valid positive number"
  ),
  discount: z.string().optional(),
  discountCategory: z.string().optional(),
  previewImage: z.any().optional().nullable(),
  thumbnailImage: z.any().optional().nullable(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
