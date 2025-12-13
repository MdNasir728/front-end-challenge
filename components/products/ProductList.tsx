"use client";

import { useState, useEffect, startTransition } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductTable } from "./ProductTable";
import { RelatedDataSection } from "./RelatedDataSection";
import { products as baseProducts } from "@/constants/products";
import { getAllProducts } from "@/lib/productsUtil";
import { downloadProducts } from "@/lib/downloadUtil";
import type { ProductStatus, ProductCategory } from "@/types/product";

export default function ProductList() {
  const pathname = usePathname();
  const [status, setStatus] = useState<ProductStatus>("published");
  const [products, setProducts] = useState(() => getAllProducts(baseProducts));
  const [downloadValue, setDownloadValue] = useState("download");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");

  // Refresh products when component mounts or when returning from add/edit page
  useEffect(() => {
    const refreshProducts = () => {
      setProducts(getAllProducts(baseProducts));
    };

    const handleFocus = () => {
      refreshProducts();
    };
    
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshProducts();
      }
    };

    // Refresh on mount
    refreshProducts();
    
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Refresh products when pathname changes (user navigates back from edit/add page)
  useEffect(() => {
    if (pathname === "/products") {
      startTransition(() => {
        setProducts(getAllProducts(baseProducts));
      });
    }
  }, [pathname]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Product
        </h1>
        <Link href="/products/add">
          <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Tabs value={status} onValueChange={(value) => setStatus(value as ProductStatus)}>
                <TabsList className="bg-transparent h-auto p-0 gap-0 border-0 shadow-none">
                  <TabsTrigger
                    value="published"
                    className="data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:font-bold bg-transparent border-0 shadow-none rounded-none px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-normal"
                  >
                    Published
                  </TabsTrigger>
                  <TabsTrigger
                    value="draft"
                    className="data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:font-bold bg-transparent border-0 shadow-none rounded-none px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-normal"
                  >
                    Draft
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex items-center gap-2">
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value as ProductCategory | "all")}
                >
                  <SelectTrigger className="h-9 w-24 bg-gray-50 dark:bg-gray-700 text-sm border-gray-200 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
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
                <Select
                  value={downloadValue}
                  onValueChange={(value) => {
                    setDownloadValue(value);
                    if (value !== "download") {
                      const filteredProducts = products.filter(
                        (p) => p.status === status
                      );
                      downloadProducts(
                        filteredProducts,
                        value as "csv" | "excel" | "pdf"
                      );
                      // Reset dropdown after a short delay
                      setTimeout(() => {
                        setDownloadValue("download");
                      }, 100);
                    }
                  }}
                >
                  <SelectTrigger className="h-9 w-28 bg-gray-50 dark:bg-gray-700 text-sm border-gray-200 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="download">Download</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ProductTable 
              products={
                selectedCategory === "all"
                  ? products
                  : products.filter((p) => p.category === selectedCategory)
              }
              status={status} 
              onProductChange={() => setProducts(getAllProducts(baseProducts))}
            />
          </div>
        </div>
        <div className="lg:col-span-4">
          <RelatedDataSection />
        </div>
      </div>
    </div>
  );
}
