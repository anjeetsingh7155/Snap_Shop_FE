import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/types";
import { register } from "../api/auth";
import { getErrorMessage } from "../api/client";
import { colors } from "../theme/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function Register({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    // simple checks before calling the server
    if (name.trim().length < 3) {
      setErrorMessage("Name must be at least 3 characters");
      return;
    }
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage("");
    setLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password: password,
        phone: phone.trim() === "" ? undefined : phone.trim(),
      });
      Alert.alert("Account created", "Please login with your new account.");
      navigation.navigate("Login");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
    setLoading(false);
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
            <Text style={styles.appName}>Snap Shop</Text>
            <Text style={styles.tagline}>Create your account</Text>
          </View>

          <View style={styles.formBox}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>It only takes a minute</Text>

            <Input
              label="Full name"
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              autoCapitalize="words"
            />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Phone (optional)"
              value={phone}
              onChangeText={setPhone}
              placeholder="10 digit number"
              keyboardType="phone-pad"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="At least 6 characters"
              secureTextEntry
              autoCapitalize="none"
            />
            <Input
              label="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Enter the password again"
              secureTextEntry
              autoCapitalize="none"
            />

            {errorMessage !== "" && <Text style={styles.error}>{errorMessage}</Text>}

            <Button title="Create account" onPress={handleRegister} loading={loading} />

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Already have an account? </Text>
              <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
                Login
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
  appName: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 8,
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
    marginBottom: 20,
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
