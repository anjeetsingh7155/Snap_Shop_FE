import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";
import Button from "../components/Button";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Snap Shop</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.welcome}>Welcome, {user?.name}</Text>
        <Text style={styles.info}>
          You are logged in. The product list will be added in the next step.
        </Text>
        <Button title="Logout" onPress={logout} outline />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  body: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  info: {
    fontSize: 15,
    color: colors.textLight,
    marginBottom: 24,
  },
});
