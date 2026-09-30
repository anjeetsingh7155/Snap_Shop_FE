import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

// TEMPORARY screen - the real one comes in a later step
export default function Cart() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Cart screen coming soon</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.white },
  text: { color: colors.textLight, fontSize: 16 },
});
