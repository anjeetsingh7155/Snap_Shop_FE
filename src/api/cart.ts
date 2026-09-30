import { api } from "./client";
import type { Cart } from "../types";

export const getCart = async (): Promise<Cart> => {
  const res = await api.get<{ cart: Cart }>("/cart");
  return res.data.cart;
};

export const addToCart = async (productId: string, quantity = 1): Promise<Cart> => {
  const res = await api.post<{ cart: Cart }>("/cart/add", { productId, quantity });
  return res.data.cart;
};

export const updateCartItem = async (productId: string, quantity: number): Promise<Cart> => {
  const res = await api.put<{ cart: Cart }>("/cart/update", { productId, quantity });
  return res.data.cart;
};

export const removeFromCart = async (productId: string): Promise<Cart> => {
  const res = await api.delete<{ cart: Cart }>(`/cart/remove/${productId}`);
  return res.data.cart;
};
