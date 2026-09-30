import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={{ marginTop: 24, alignSelf: "stretch" }}>
          <Button title="Logout" onPress={logout} outline />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  box: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  name: { fontSize: 22, fontWeight: "bold", color: colors.text },
  email: { fontSize: 15, color: colors.textLight, marginTop: 4 },
});
