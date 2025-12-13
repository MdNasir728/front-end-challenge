export type ProductStatus = "published" | "draft";

export type ProductCategory =
  | "electronics"
  | "clothing"
  | "food"
  | "books"
  | "toys"
  | "home"
  | "sports"
  | "beauty"
  | "gaming"
  | "accessories";

export type Product = {
  id: string;
  name: string;
  views: number;
  pricing: number;
  revenue: number;
  status: ProductStatus;
  category: ProductCategory;
  image?: string;
};

export type SortField = "name" | "views" | "pricing" | "revenue";
export type SortOrder = "asc" | "desc";

