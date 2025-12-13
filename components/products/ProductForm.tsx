"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { productFormSchema, type ProductFormData } from "@/types/product-form";
import { addProduct, updateProduct } from "@/lib/productsUtil";
import { showToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types/product";
import { randomViews, calculateRevenue } from "@/constants/products";
import { useEffect } from "react";

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!product;
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    product?.image || null
  );
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: product?.name || "",
      productCategory: product?.category || "",
      descriptions: "",
      tagKeywords: "",
      price: product?.pricing?.toString() || "",
      discount: "",
      discountCategory: "",
      previewImage: null,
      thumbnailImage: null,
    },
  });

  // Update form when product changes (for edit mode)
  useEffect(() => {
    if (product) {
      form.reset({
        productName: product.name || "",
        productCategory: product.category || "",
        descriptions: "",
        tagKeywords: "",
        price: product.pricing?.toString() || "",
        discount: "",
        discountCategory: "",
        previewImage: null,
        thumbnailImage: null,
      });
      // Use setTimeout to avoid synchronous state update in effect
      setTimeout(() => {
        setPreviewImageUrl(product.image || null);
      }, 0);
    }
  }, [product, form]);

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    setImageUrl: (url: string | null) => void,
    fieldName: "previewImage" | "thumbnailImage"
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      form.setValue(fieldName, file);
    }
  };

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImageUrl: (url: string | null) => void,
    fieldName: "previewImage" | "thumbnailImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      form.setValue(fieldName, file);
    }
  };

  const removeImage = (
    setImageUrl: (url: string | null) => void,
    fieldName: "previewImage" | "thumbnailImage"
  ) => {
    setImageUrl(null);
    form.setValue(fieldName, null);
  };

  const handleSave = (data: ProductFormData) => {
    if (isEditMode && product) {
      // Update existing product - preserve all original fields
      const updatedProduct: Product = {
        id: product.id,
        name: data.productName,
        views: product.views, // Preserve original views
        pricing: Number(data.price),
        revenue: product.revenue, // Preserve original revenue
        status: product.status, // Preserve original status
        category: (data.productCategory as ProductCategory) || product.category,
        image: previewImageUrl || product.image || undefined,
      };
      updateProduct(updatedProduct);
      showToast.success("Product updated successfully!");
      // Navigate back to products list
      router.push("/products");
      return;
    } else {
      // Create new product
      const generateId = () => String(Date.now());

      const views = randomViews();
      const priceValue = Number(data.price);
      const revenue = calculateRevenue(views, priceValue);
      
      const newProduct: Product = {
        id: generateId(),
        name: data.productName,
        views,
        pricing: priceValue,
        revenue,
        status: "published" as const,
        category: (data.productCategory as ProductCategory) || "electronics",
        image: previewImageUrl || undefined,
      };

      addProduct(newProduct);
      showToast.success("Product added successfully!");
    }
    router.push("/products");
  };

  const handleDiscard = () => {
    if (isEditMode) {
      // In edit mode, just navigate back without saving
      router.push("/products");
      return;
    }

    // In add mode, save as draft
    const generateId = () => String(Date.now());

    const views = randomViews();
    const priceValue = Number(form.getValues("price")) || 0;
    const revenue = calculateRevenue(views, priceValue);
    
      const newProduct: Product = {
        id: generateId(),
        name: form.getValues("productName") || "Unnamed Product",
        views,
        pricing: priceValue,
        revenue,
        status: "draft" as const,
        category: (form.getValues("productCategory") as ProductCategory) || "electronics",
        image: previewImageUrl || undefined,
      };

    addProduct(newProduct);
    showToast.info("Product saved as draft");
    router.push("/products");
  };

  const onSubmit = (data: ProductFormData) => {
    handleSave(data);
  };

  const onDiscard = () => {
    handleDiscard();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h1>
      </div>

      <DashboardCard className="rounded-xl bg-white dark:bg-gray-800 p-6">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onDiscard}
              className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Discard Change
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              Save
            </Button>
          </div>
        </div>
      </DashboardCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">

          <DashboardCard className="rounded-xl bg-white dark:bg-gray-800 p-6">
            <Form {...form}>
              <form className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    General Information
                  </h2>

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
                    name="productCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-white">
                          Product Category
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-800">
                              <SelectValue placeholder="Product Category" />
                            </SelectTrigger>
                          </FormControl>
                            <SelectContent>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="gaming">Gaming</SelectItem>
                              <SelectItem value="home">Home</SelectItem>
                              <SelectItem value="sports">Sports</SelectItem>
                              <SelectItem value="beauty">Beauty</SelectItem>
                              <SelectItem value="accessories">Accessories</SelectItem>
                              <SelectItem value="books">Books</SelectItem>
                              <SelectItem value="toys">Toys</SelectItem>
                              <SelectItem value="food">Food</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descriptions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-white">
                          Descriptions
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description"
                            className="min-h-[120px] bg-gray-100 dark:bg-gray-800 resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tagKeywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-white">
                          Tag Keywords
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tag Keywords"
                            className="min-h-[120px] bg-gray-100 dark:bg-gray-800 resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </DashboardCard>

          <DashboardCard className="rounded-xl bg-white dark:bg-gray-800 p-6">
            <Form {...form}>
              <form>
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Pricing
                  </h2>

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

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 dark:text-white">
                            Discount
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Discount"
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
                      name="discountCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 dark:text-white">
                            Discount Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-100 dark:bg-gray-800">
                                <SelectValue placeholder="Discount Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="percentage">Percentage</SelectItem>
                              <SelectItem value="fixed">Fixed Amount</SelectItem>
                              <SelectItem value="buy-one-get-one">Buy One Get One</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </DashboardCard>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <DashboardCard className="rounded-xl bg-white dark:bg-gray-800 p-6">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Preview Product
            </h2>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Drag And Your Image Here
            </p>
            <div
              className={cn(
                "relative flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-700",
                "hover:border-gray-400 dark:hover:border-gray-500"
              )}
              onDrop={(e) =>
                handleDrop(e, setPreviewImageUrl, "previewImage")
              }
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("preview-upload")?.click()}
            >
              <input
                id="preview-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleFileInput(e, setPreviewImageUrl, "previewImage")
                }
              />
              {previewImageUrl ? (
                <div className="relative h-full w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewImageUrl}
                    alt="Preview"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(setPreviewImageUrl, "previewImage");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mb-2 h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Drag and drop here
                  </p>
                </>
              )}
            </div>
          </DashboardCard>

          <DashboardCard className="rounded-xl bg-white dark:bg-gray-800 p-6">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Thumbnail Product
            </h2>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Drag And Your Image Here
            </p>
            <div
              className={cn(
                "relative flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-700",
                "hover:border-gray-400 dark:hover:border-gray-500"
              )}
              onDrop={(e) =>
                handleDrop(e, setThumbnailImageUrl, "thumbnailImage")
              }
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("thumbnail-upload")?.click()}
            >
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleFileInput(e, setThumbnailImageUrl, "thumbnailImage")
                }
              />
              {thumbnailImageUrl ? (
                <div className="relative h-full w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailImageUrl}
                    alt="Thumbnail"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(setThumbnailImageUrl, "thumbnailImage");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mb-2 h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Drag and drop here
                  </p>
                </>
              )}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
