import { useEffect, useState } from "react";
import {
  ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { getCategories, getProducts } from "../api/products";
import { getErrorMessage } from "../api/client";
import type { Category, Product } from "../types";
import type { MainStackParamList } from "../navigation/types";
import Logo from "../components/Logo";
import AppName from "../components/AppName";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState(""); // what the user is typing
  const [search, setSearch] = useState(""); // the search that is applied
  const [category, setCategory] = useState(""); // selected category id ("" = All)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // load categories one time
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => setError(getErrorMessage(err)));
  }, []);

  // load products again whenever search or category changes
  useEffect(() => {
    setLoading(true);
    setError("");
    getProducts({ search: search || undefined, category: category || undefined })
      .then(setProducts)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [search, category]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* header with logo and name */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Logo size={34} />
          <AppName size={24} />
        </View>

        {/* search box */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products"
            placeholderTextColor={colors.textLight}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => setSearch(searchText.trim())}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <Pressable
              onPress={() => {
                setSearchText("");
                setSearch("");
              }}
            >
              <Ionicons name="close-circle" size={18} color={colors.textLight} />
            </Pressable>
          )}
        </View>
      </View>

      {/* category chips */}
      <View style={styles.chipRow}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ _id: "", title: "All" }, ...categories]}
          keyExtractor={(item) => item._id || "all"}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => {
            const selected = category === item._id;
            return (
              <Pressable
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setCategory(item._id)}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                  {item.title}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* product list */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.message}>{error}</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={{ padding: 6 }}
          ListEmptyComponent={<Text style={styles.message}>No products found</Text>}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate("ProductDetails", { productId: item._id })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 6,
  },
  brandRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: { flex: 1, marginLeft: 8, color: colors.text, fontSize: 15 },
  chipRow: { paddingVertical: 10 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontSize: 14 },
  chipTextSelected: { color: colors.white, fontWeight: "600" },
  message: { textAlign: "center", marginTop: 40, color: colors.textLight, fontSize: 15 },
});
