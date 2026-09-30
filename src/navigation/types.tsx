import type { NavigatorScreenParams } from "@react-navigation/native";

// the screens that are shown before login
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// the 4 bottom tabs
export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  MyOrders: undefined;
  Profile: undefined;
};

// screens shown after login (tabs + screens that open on top of tabs)
export type MainStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProductDetails: { productId: string };
  Checkout: undefined;
  OrderSuccess: { orderId: string };
};
