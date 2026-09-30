import { StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  size?: number;
  dark?: boolean;
};

export default function AppName({ size = 30, dark = false }: Props) {
  return (
    <Text
      style={[
        styles.name,
        { fontSize: size, lineHeight: size * 1.3 },
        dark ? styles.darkText : styles.lightText,
      ]}
    >
      Snap Shop
    </Text>
  );
}

const styles = StyleSheet.create({
  name: {
    fontFamily: "EduQLDHand_700Bold",
    paddingHorizontal: 6,
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 5,
  },
  lightText: {
    color: colors.white,
    textShadowColor: "rgba(6, 95, 91, 0.75)",
  },
  darkText: {
    color: colors.primary,
    textShadowColor: "rgba(13, 148, 136, 0.35)",
  },
});
