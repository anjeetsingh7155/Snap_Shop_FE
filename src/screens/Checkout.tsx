import { useEffect, useState } from "react";
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useAuth } from "../context/AuthContext";
import { getCart } from "../api/cart";
import { placeOrder } from "../api/orders";
import { getErrorMessage } from "../api/client";
import type { Cart } from "../types";
import type { MainStackParamList } from "../navigation/types";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Checkout() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { user } = useAuth();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");

  useEffect(() => {
    getCart()
      .then(setCart)
      .catch((err) => Alert.alert("Error", getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const handlePlaceOrder = async () => {
    if (address.trim().length < 5) {
      Alert.alert("Missing address", "Please enter your full delivery address.");
      return;
    }
    if (phone.trim().length < 7) {
      Alert.alert("Missing phone", "Please enter a valid phone number.");
      return;
    }

    setPlacing(true);
    try {
      const order = await placeOrder({ shippingAddress: address.trim(), phone: phone.trim() });
      navigation.replace("OrderSuccess", { orderId: order._id });
    } catch (err) {
      Alert.alert("Could not place order", getErrorMessage(err));
    } finally {
      setPlacing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>
        <Text style={styles.topTitle}>Checkout</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.card}>
              {cart?.items.map((item) => (
                <View key={item.productId} style={styles.summaryRow}>
                  <Text style={styles.summaryText} numberOfLines={1}>
                    {item.quantity} x {item.title}
                  </Text>
                  <Text style={styles.summaryText}>₹{item.subtotal}</Text>
                </View>
              ))}
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalText}>₹{cart?.totalPrice ?? 0}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Delivery Details</Text>
            <Input
              label="Address"
              value={address}
              onChangeText={setAddress}
              placeholder="House no, street, city, pincode"
            />
            <Input
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              placeholder="Your phone number"
              keyboardType="phone-pad"
            />

            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.codBox}>
              <Ionicons name="cash-outline" size={22} color={colors.primary} />
              <Text style={styles.codText}>Cash on Delivery</Text>
              <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
            </View>

            <View style={{ marginTop: 20 }}>
              <Button title="Place Order" onPress={handlePlaceOrder} loading={placing} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  sectionTitle: { fontSize: 16, fontWeight: "600", color: colors.text, marginTop: 8, marginBottom: 8 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  summaryText: { color: colors.text, fontSize: 14, flex: 1 },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 6, paddingTop: 8 },
  totalText: { fontWeight: "bold", fontSize: 16, color: colors.primaryDark },
  codBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 14,
  },
  codText: { flex: 1, marginLeft: 10, color: colors.text, fontSize: 15, fontWeight: "600" },
});
