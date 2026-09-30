import { useCallback, useState } from "react";
import {
  ActivityIndicator, Alert, FlatList, Image, Pressable, StyleSheet, Text, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { getCart, removeFromCart, updateCartItem } from "../api/cart";
import { getErrorMessage } from "../api/client";
import type { Cart as CartType, CartItem } from "../types";
import type { MainStackParamList } from "../navigation/types";
import Button from "../components/Button";

export default function Cart() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      setError("");
      getCart()
        .then(setCart)
        .catch((err) => setError(getErrorMessage(err)))
        .finally(() => setLoading(false));
    }, [])
  );

  const changeQuantity = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.stock) return;
    try {
      const updated = await updateCartItem(item.productId, newQuantity);
      setCart(updated);
    } catch (err) {
      Alert.alert("Error", getErrorMessage(err));
    }
  };

  const removeItem = async (item: CartItem) => {
    try {
      const updated = await removeFromCart(item.productId);
      setCart(updated);
    } catch (err) {
      Alert.alert("Error", getErrorMessage(err));
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>

        <View style={styles.qtyRow}>
          <Pressable style={styles.qtyButton} onPress={() => changeQuantity(item, item.quantity - 1)}>
            <Text style={styles.qtyButtonText}>-</Text>
          </Pressable>
          <Text style={styles.qtyNumber}>{item.quantity}</Text>
          <Pressable style={styles.qtyButton} onPress={() => changeQuantity(item, item.quantity + 1)}>
            <Text style={styles.qtyButtonText}>+</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.itemRight}>
        <Pressable onPress={() => removeItem(item)}>
          <Ionicons name="trash-outline" size={22} color={colors.error} />
        </Pressable>
        <Text style={styles.subtotal}>₹{item.subtotal}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.message}>{error}</Text>
      ) : !cart || cart.items.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="cart-outline" size={64} color={colors.border} />
          <Text style={styles.message}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart.items}
            keyExtractor={(item) => item.productId}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 12 }}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total ({cart.totalItems} items)</Text>
              <Text style={styles.totalPrice}>₹{cart.totalPrice}</Text>
            </View>
            <Button title="Proceed to Checkout" onPress={() => navigation.navigate("Checkout")} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 14 },
  headerTitle: { color: colors.white, fontSize: 20, fontWeight: "bold" },
  emptyBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  message: { textAlign: "center", marginTop: 12, color: colors.textLight, fontSize: 15 },
  item: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 10,
  },
  image: { width: 80, height: 80, borderRadius: 8, backgroundColor: colors.primaryLight },
  itemInfo: { flex: 1, marginLeft: 10 },
  itemTitle: { fontSize: 14, fontWeight: "600", color: colors.text },
  itemPrice: { fontSize: 14, color: colors.primaryDark, marginTop: 2 },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: { fontSize: 18, color: colors.primaryDark, fontWeight: "bold" },
  qtyNumber: { marginHorizontal: 12, fontSize: 15, color: colors.text },
  itemRight: { alignItems: "flex-end", justifyContent: "space-between" },
  subtotal: { fontSize: 15, fontWeight: "bold", color: colors.text },
  footer: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  totalLabel: { fontSize: 15, color: colors.textLight },
  totalPrice: { fontSize: 20, fontWeight: "bold", color: colors.primaryDark },
});
