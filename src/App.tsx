import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { getCategories } from "./api/products";
import { getErrorMessage } from "./api/client";

export default function App() {
  const [message, setMessage] = useState("Checking connection...");

  useEffect(() => {
    getCategories()
      .then((c) => setMessage(`Connected to server: ${c.length} categories found`))
      .catch((e) => setMessage(getErrorMessage(e)));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SnapShop</Text>
      <Text style={styles.message}>{message}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 12 },
  message: { fontSize: 16, textAlign: "center" },
});
