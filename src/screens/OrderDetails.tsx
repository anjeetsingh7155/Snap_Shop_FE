import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { getOrder } from "../api/orders";
import { getErrorMessage } from "../api/client";
import type { Order } from "../types";
import type { MainStackParamList } from "../navigation/types";
import StatusBadge from "../components/StatusBadge";

export default function OrderDetails() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const route = useRoute<NativeStackScreenProps<MainStackParamList, "OrderDetails">["route"]>();
  const { orderId } = route.params;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrder(orderId)
      .then(setOrder)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [orderId]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>
        <Text style={styles.topTitle}>Order Details</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : error || !order ? (
        <Text style={styles.message}>{error || "Order not found"}</Text>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* order id, date and status */}
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.orderId}>Order #{order._id.slice(-6).toUpperCase()}</Text>
              <StatusBadge status={order.status} />
            </View>
            <Text style={styles.date}>Placed on {new Date(order.createdAt).toLocaleString()}</Text>
          </View>

          {/* items */}
          <Text style={styles.sectionTitle}>Items</Text>
          <View style={styles.card}>
            {order.items.map((item) => (
              <View key={item.productId} style={styles.itemRow}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.itemSub}>
                    {item.quantity} x ₹{item.price}
                  </Text>
                </View>
                <Text style={styles.itemTotal}>₹{item.quantity * item.price}</Text>
              </View>
            ))}
            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>₹{order.totalAmount}</Text>
            </View>
          </View>

          {/* delivery and payment */}
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.card}>
            <Text style={styles.info}>{order.shippingAddress}</Text>
            <Text style={styles.info}>Phone: {order.phone}</Text>
          </View>

          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.card}>
            <Text style={styles.info}>Cash on Delivery</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  backButton: { padding: 4, marginRight: 8 },
  topTitle: { color: colors.white, fontSize: 18, fontWeight: "600" },
  message: { textAlign: "center", marginTop: 40, color: colors.textLight },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  orderId: { fontSize: 16, fontWeight: "bold", color: colors.text },
  date: { fontSize: 12, color: colors.textLight, marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: colors.text, marginBottom: 8 },
  itemRow: { flexDirection: "row", alignItems: "center", paddingVertical: 6 },
  image: { width: 56, height: 56, borderRadius: 8, backgroundColor: colors.primaryLight },
  itemTitle: { fontSize: 14, fontWeight: "600", color: colors.text },
  itemSub: { fontSize: 12, color: colors.textLight, marginTop: 2 },
  itemTotal: { fontSize: 14, fontWeight: "bold", color: colors.text },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 8, paddingTop: 10 },
  totalText: { fontWeight: "bold", fontSize: 16, color: colors.primaryDark },
  info: { fontSize: 14, color: colors.text, lineHeight: 22 },
});
