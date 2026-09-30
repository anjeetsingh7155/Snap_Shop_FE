import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import type { Product } from "../types";

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.category}>{product.categoryId?.title}</Text>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        {product.stock === 0 && <Text style={styles.out}>Out of stock</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  image: { width: "100%", height: 130, backgroundColor: colors.primaryLight },
  info: { padding: 10 },
  category: { fontSize: 11, color: colors.primary, fontWeight: "600" },
  title: { fontSize: 14, color: colors.text, fontWeight: "600", marginTop: 2, minHeight: 36 },
  price: { fontSize: 16, color: colors.primaryDark, fontWeight: "bold", marginTop: 4 },
  out: { fontSize: 11, color: colors.error, marginTop: 2 },
});
