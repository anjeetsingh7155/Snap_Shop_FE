import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { getMyOrders } from "../api/orders";
import { getErrorMessage } from "../api/client";
import type { Order } from "../types";
import type { MainStackParamList } from "../navigation/types";
import StatusBadge from "../components/StatusBadge";

export default function MyOrders() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      setError("");
      getMyOrders()
        .then(setOrders)
        .catch((err) => setError(getErrorMessage(err)))
        .finally(() => setLoading(false));
    }, [])
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.message}>{error}</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 12 }}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="receipt-outline" size={64} color={colors.border} />
              <Text style={styles.message}>You have no orders yet</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate("OrderDetails", { orderId: item._id })}
            >
              <View style={styles.row}>
                <Text style={styles.orderId}>Order #{item._id.slice(-6).toUpperCase()}</Text>
                <StatusBadge status={item.status} />
              </View>
              <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
              <View style={styles.row}>
                <Text style={styles.items}>{item.items.length} item(s)</Text>
                <Text style={styles.total}>₹{item.totalAmount}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 14 },
  headerTitle: { color: colors.white, fontSize: 20, fontWeight: "bold" },
  emptyBox: { alignItems: "center", marginTop: 60 },
  message: { textAlign: "center", marginTop: 12, color: colors.textLight, fontSize: 15 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  orderId: { fontSize: 15, fontWeight: "600", color: colors.text },
  date: { fontSize: 12, color: colors.textLight, marginVertical: 6 },
  items: { fontSize: 14, color: colors.textLight },
  total: { fontSize: 16, fontWeight: "bold", color: colors.primaryDark },
});
