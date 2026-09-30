import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

// TEMPORARY screen - the real one comes in a later step
export default function MyOrders() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>My Orders screen coming soon</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.white },
  text: { color: colors.textLight, fontSize: 16 },
});
