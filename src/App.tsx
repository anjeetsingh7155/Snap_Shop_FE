import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "@expo-google-fonts/edu-qld-hand/useFonts";
import { EduQLDHand_700Bold } from "@expo-google-fonts/edu-qld-hand/700Bold";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({ EduQLDHand_700Bold });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
