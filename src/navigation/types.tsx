import type { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  MyOrders: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProductDetails: { productId: string };
  Checkout: undefined;
  OrderSuccess: { orderId: string };
  OrderDetails: { orderId: string };
};
