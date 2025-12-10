export const ROLES = {
  MANAGER: "manager",
  STORE_KEEPER: "store_keeper",
} as const;

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  PRODUCTS: "/products",
  ADD_PRODUCT: "/products/add",
  EDIT_PRODUCT: "/products/edit",
} as const;

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  PRODUCTS: "/products",
  PRODUCT_BY_ID: "/products/:id",
} as const;

