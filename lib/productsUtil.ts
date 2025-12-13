import type { Product } from "@/types/product";

// Get products from localStorage or return empty array
export const getStoredProducts = (): Product[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("additionalProducts");
  return stored ? JSON.parse(stored) : [];
};

// Get updated products from localStorage
export const getUpdatedProducts = (): Record<string, Product> => {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem("updatedProducts");
  return stored ? JSON.parse(stored) : {};
};

// Get deleted product IDs from localStorage (for base products only)
export const getDeletedProductIds = (): Set<string> => {
  if (typeof window === "undefined") return new Set();
  const stored = localStorage.getItem("deletedProductIds");
  return stored ? new Set(JSON.parse(stored)) : new Set();
};

/**
 * Add a new product to the stored products array
 * @param product - The product to add
 */
export const addProduct = (product: Product): void => {
  if (typeof window === "undefined") return;
  const existing = getStoredProducts();
  const updated = [...existing, product];
  localStorage.setItem("additionalProducts", JSON.stringify(updated));
};

/**
 * Delete a product - removes from stored products or marks base product as deleted
 * @param productId - The ID of the product to delete
 */
export const deleteProduct = (productId: string): void => {
  if (typeof window === "undefined") return;
  
  // First, try to remove from stored products
  const stored = getStoredProducts();
  const filteredStored = stored.filter((p) => p.id !== productId);
  
  if (filteredStored.length !== stored.length) {
    // Product was in stored products, remove it
    localStorage.setItem("additionalProducts", JSON.stringify(filteredStored));
    
    // Also remove from updated products if it exists there
    const updated = getUpdatedProducts();
    if (updated[productId]) {
      delete updated[productId];
      localStorage.setItem("updatedProducts", JSON.stringify(updated));
    }
  } else {
    // Product is in base products, mark as deleted
    const deletedIds = getDeletedProductIds();
    deletedIds.add(productId);
    localStorage.setItem("deletedProductIds", JSON.stringify(Array.from(deletedIds)));
    
    // Also remove from updated products if it exists there
    const updated = getUpdatedProducts();
    if (updated[productId]) {
      delete updated[productId];
      localStorage.setItem("updatedProducts", JSON.stringify(updated));
    }
  }
};

/**
 * Update a product - updates in stored products array or marks as updated for base products
 * @param product - The updated product
 */
export const updateProduct = (product: Product): void => {
  if (typeof window === "undefined") return;
  
  // First, check if product is in stored products
  const stored = getStoredProducts();
  const productIndex = stored.findIndex((p) => p.id === product.id);
  
  if (productIndex !== -1) {
    // Product is in stored products, update it directly in the array
    stored[productIndex] = product;
    localStorage.setItem("additionalProducts", JSON.stringify(stored));
    
    // Also remove from updated products if it exists there (cleanup)
    const updated = getUpdatedProducts();
    if (updated[product.id]) {
      delete updated[product.id];
      localStorage.setItem("updatedProducts", JSON.stringify(updated));
    }
  } else {
    // Product is a base product, store the update
    const updated = getUpdatedProducts();
    updated[product.id] = product;
    localStorage.setItem("updatedProducts", JSON.stringify(updated));
  }
};

/**
 * Get a product by ID (checks updated products first, then stored, then base products)
 * @param productId - The ID of the product to retrieve
 * @param baseProducts - The base products array from constants
 * @returns The product if found, null otherwise
 */
export const getProductById = (
  productId: string,
  baseProducts: Product[]
): Product | null => {
  const updated = getUpdatedProducts();
  if (updated[productId]) {
    return updated[productId];
  }
  
  const stored = getStoredProducts();
  const storedProduct = stored.find((p) => p.id === productId);
  if (storedProduct) {
    return storedProduct;
  }
  
  const deletedIds = getDeletedProductIds();
  if (deletedIds.has(productId)) {
    return null;
  }
  
  return baseProducts.find((p) => p.id === productId) || null;
};

/**
 * Get all products (from constants + stored, excluding deleted, applying updates)
 * @param baseProducts - The base products array from constants
 * @returns Combined array of all products with updates applied
 */
export const getAllProducts = (baseProducts: Product[]): Product[] => {
  const stored = getStoredProducts();
  const deletedIds = getDeletedProductIds();
  const updated = getUpdatedProducts();
  
  // Filter base products to exclude deleted ones
  const filteredBase = baseProducts.filter((p) => !deletedIds.has(p.id));
  
  // Combine filtered base and stored products
  const allProducts = [...filteredBase, ...stored];
  
  // Apply updates
  return allProducts.map((p) => updated[p.id] || p);
};

