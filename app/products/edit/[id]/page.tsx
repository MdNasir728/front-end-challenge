"use client";

import { useEffect, useState, startTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { getProductById } from "@/lib/productsUtil";
import { products as baseProducts } from "@/constants/products";
import type { Product } from "@/types/product";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productId = params.id as string;
    const foundProduct = getProductById(productId, baseProducts);
    
    startTransition(() => {
      setProduct(foundProduct);
      setLoading(false);
    });
    
    if (!foundProduct) {
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The product you are looking for does not exist. Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return <ProductForm product={product} />;
}
