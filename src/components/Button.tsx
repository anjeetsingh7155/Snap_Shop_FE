import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  outline?: boolean;
};

export default function Button({ title, onPress, loading = false, outline = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.button,
        outline ? styles.outlineButton : styles.filledButton,
        pressed && (outline ? styles.outlinePressed : styles.filledPressed),
      ]}
    >
      {loading ? (
        <ActivityIndicator color={outline ? colors.primary : colors.white} />
      ) : (
        <Text style={[styles.text, outline ? styles.outlineText : styles.filledText]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  filledButton: {
    backgroundColor: colors.primary,
  },
  filledPressed: {
    backgroundColor: colors.primaryDark,
  },
  outlineButton: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  outlinePressed: {
    backgroundColor: colors.primaryLight,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  filledText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
});
