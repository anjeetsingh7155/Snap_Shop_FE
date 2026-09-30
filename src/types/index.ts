export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type Category = { _id: string; title: string };

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  categoryId: Category;
};

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
  subtotal: number;
};

export type Cart = { items: CartItem[]; totalItems: number; totalPrice: number };

export type OrderItem = {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export type OrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  phone: string;
  paymentMethod: "COD";
  status: OrderStatus;
  createdAt: string;
};
