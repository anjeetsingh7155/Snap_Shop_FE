import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import type { MainStackParamList } from "../navigation/types";
import Button from "../components/Button";

export default function OrderSuccess() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const route = useRoute<NativeStackScreenProps<MainStackParamList, "OrderSuccess">["route"]>();
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Ionicons name="checkmark-circle" size={100} color={colors.primary} />
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.text}>Thank you for shopping with SnapShop.</Text>
        <Text style={styles.text}>Pay in cash when your order is delivered.</Text>
        <Text style={styles.orderId}>Order ID: {orderId}</Text>
      </View>

      <View style={styles.buttons}>
        <Button title="View My Orders" onPress={() => navigation.navigate("Tabs", { screen: "MyOrders" })} />
        <View style={{ height: 10 }} />
        <Button title="Continue Shopping" outline onPress={() => navigation.navigate("Tabs", { screen: "Home" })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  box: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 26, fontWeight: "bold", color: colors.primaryDark, marginTop: 12 },
  text: { fontSize: 15, color: colors.textLight, marginTop: 6, textAlign: "center" },
  orderId: { fontSize: 12, color: colors.textLight, marginTop: 16 },
  buttons: { padding: 20 },
});
