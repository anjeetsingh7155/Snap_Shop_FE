import { api } from "./client";
import type { Order } from "../types";

export const placeOrder = async (data: {
  shippingAddress: string;
  phone: string;
}): Promise<Order> => {
  const res = await api.post<{ order: Order }>("/orders", data);
  return res.data.order;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const res = await api.get<{ orders: Order[] }>("/orders");
  return res.data.orders;
};

export const getOrder = async (id: string): Promise<Order> => {
  const res = await api.get<{ order: Order }>(`/orders/${id}`);
  return res.data.order;
};
