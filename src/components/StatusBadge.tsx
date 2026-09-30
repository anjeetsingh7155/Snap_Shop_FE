import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { OrderStatus } from "../types";

const statusColors: Record<OrderStatus, { bg: string; text: string }> = {
  Pending: { bg: "#FEF3C7", text: "#B45309" },
  Confirmed: { bg: "#DBEAFE", text: "#1D4ED8" },
  Shipped: { bg: "#EDE9FE", text: "#6D28D9" },
  Delivered: { bg: colors.primaryLight, text: colors.primaryDark },
  Cancelled: { bg: "#FEE2E2", text: colors.error },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const c = statusColors[status];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: "flex-start" },
  text: { fontSize: 12, fontWeight: "600" },
});
