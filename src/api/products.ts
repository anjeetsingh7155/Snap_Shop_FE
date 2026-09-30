import { api } from "./client";
import type { Category, Product } from "../types";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<{ categories: Category[] }>("/categories");
  return res.data.categories;
};

export const getProducts = async (params?: {
  search?: string;
  category?: string;
}): Promise<Product[]> => {
  const res = await api.get<{ products: Product[] }>("/products", { params });
  return res.data.products;
};

export const getProduct = async (id: string): Promise<Product> => {
  const res = await api.get<{ product: Product }>(`/products/${id}`);
  return res.data.product;
};
