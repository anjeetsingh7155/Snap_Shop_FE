import { useEffect, useState } from "react";
import {
  ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { getProduct } from "../api/products";
import { addToCart } from "../api/cart";
import { getErrorMessage } from "../api/client";
import type { Product } from "../types";
import type { MainStackParamList } from "../navigation/types";
import Button from "../components/Button";

export default function ProductDetails() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const route = useRoute<NativeStackScreenProps<MainStackParamList, "ProductDetails">["route"]>();
  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getProduct(productId)
      .then(setProduct)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addToCart(product._id, quantity);
      Alert.alert("Added to cart", `${quantity} x ${product.title} added to your cart.`);
    } catch (err) {
      Alert.alert("Error", getErrorMessage(err));
    } finally {
      setAdding(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>
        <Text style={styles.topTitle}>Product Details</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : error || !product ? (
        <Text style={styles.message}>{error || "Product not found"}</Text>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          <Image source={{ uri: product.image }} style={styles.image} />

          <View style={styles.content}>
            <Text style={styles.category}>{product.categoryId?.title}</Text>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={product.stock > 0 ? styles.inStock : styles.outStock}>
              {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
            </Text>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>

            {product.stock > 0 && (
              <>
                <View style={styles.qtyRow}>
                  <Text style={styles.sectionTitle}>Quantity</Text>
                  <View style={styles.qtyBox}>
                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Text style={styles.qtyButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.qtyNumber}>{quantity}</Text>
                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>

                <Button title="Add to Cart" onPress={handleAddToCart} loading={adding} />
              </>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  backButton: { padding: 4, marginRight: 8 },
  topTitle: { color: colors.white, fontSize: 18, fontWeight: "600" },
  image: { width: "100%", height: 280, backgroundColor: colors.primaryLight },
  content: { padding: 16 },
  category: { color: colors.primary, fontWeight: "600", fontSize: 13 },
  title: { fontSize: 22, fontWeight: "bold", color: colors.text, marginTop: 4 },
  price: { fontSize: 24, fontWeight: "bold", color: colors.primaryDark, marginTop: 6 },
  inStock: { color: colors.primary, marginTop: 4 },
  outStock: { color: colors.error, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: colors.text, marginTop: 16 },
  description: { color: colors.textLight, marginTop: 6, lineHeight: 22 },
  qtyRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  qtyBox: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: { fontSize: 20, color: colors.primaryDark, fontWeight: "bold" },
  qtyNumber: { marginHorizontal: 16, fontSize: 18, color: colors.text },
  message: { textAlign: "center", marginTop: 40, color: colors.textLight },
});
