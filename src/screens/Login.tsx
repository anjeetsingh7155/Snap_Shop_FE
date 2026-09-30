import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/types";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/client";
import { colors } from "../theme/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import AppName from "../components/AppName";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    // simple check before calling the server
    if (email.trim() === "" || password === "") {
      setErrorMessage("Please enter your email and password");
      return;
    }

    setErrorMessage("");
    setLoading(true);
    try {
      await login(email.trim(), password);
      // after a successful login the app moves to Home by itself
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Logo size={90} />
            <AppName size={38} />
            <Text style={styles.tagline}>Your one-stop shop</Text>
          </View>

          <View style={styles.formBox}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Login to continue shopping</Text>

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
            />

            {errorMessage !== "" && <Text style={styles.error}>{errorMessage}</Text>}

            <Button title="Login" onPress={handleLogin} loading={loading} />

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Don't have an account? </Text>
              <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
                Register
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 16,
  },
  tagline: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: 2,
  },
  formBox: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textLight,
    marginTop: 4,
    marginBottom: 24,
  },
  error: {
    color: colors.error,
    marginBottom: 12,
    fontSize: 14,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  bottomText: {
    color: colors.textLight,
    fontSize: 15,
  },
  link: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
});
