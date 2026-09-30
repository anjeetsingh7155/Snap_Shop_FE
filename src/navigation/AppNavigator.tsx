import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";
import type { AuthStackParamList, MainStackParamList, TabParamList } from "./types";
import Logo from "../components/Logo";
import AppName from "../components/AppName";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import MyOrders from "../screens/MyOrders";
import Profile from "../screens/Profile";
import ProductDetails from "../screens/ProductDetails";
import Checkout from "../screens/Checkout";
import OrderSuccess from "../screens/OrderSuccess";
import OrderDetails from "../screens/OrderDetails";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// the bottom tab bar (Home, Cart, My Orders, Profile)
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarIcon: ({ color, size }) => {
          // choose an icon for each tab
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          if (route.name === "Cart") iconName = "cart-outline";
          if (route.name === "MyOrders") iconName = "receipt-outline";
          if (route.name === "Profile") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="MyOrders" component={MyOrders} options={{ title: "My Orders" }} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  // wait while we check if the user is already logged in
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.white }}>
        <Logo size={110} />
        <View style={{ marginBottom: 20 }}>
          <AppName size={40} dark />
        </View>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          <MainStack.Screen name="Tabs" component={Tabs} />
          <MainStack.Screen name="ProductDetails" component={ProductDetails} />
          <MainStack.Screen name="Checkout" component={Checkout} />
          <MainStack.Screen name="OrderSuccess" component={OrderSuccess} options={{ gestureEnabled: false }} />
          <MainStack.Screen name="OrderDetails" component={OrderDetails} />
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
