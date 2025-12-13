"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { productFormSchema, type ProductFormData } from "@/types/product-form";
import type { Product } from "@/types/product";

interface EditProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (productId: string, data: Partial<Product>) => void;
}

export const EditProductDialog = ({
  product,
  open,
  onOpenChange,
  onSave,
}: EditProductDialogProps) => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: "",
      productCategory: "",
      descriptions: "",
      tagKeywords: "",
      price: "",
      discount: "",
      discountCategory: "",
    },
  });

  useEffect(() => {
    if (product && open) {
      form.reset({
        productName: product.name,
        productCategory: "",
        descriptions: "",
        tagKeywords: "",
        price: product.pricing.toString(),
        discount: "",
        discountCategory: "",
      });
    }
  }, [product, open, form]);

  const onSubmit = (data: ProductFormData) => {
    if (!product) return;

    const updatedProduct: Partial<Product> = {
      name: data.productName,
      pricing: Number(data.price),
    };

    onSave(product.id, updatedProduct);
    onOpenChange(false);
    form.reset();
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">
            Edit Product
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-white">
                    Product Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Name"
                      className="bg-gray-100 dark:bg-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-white">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Pricing"
                      className="bg-gray-100 dark:bg-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-300 dark:border-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

