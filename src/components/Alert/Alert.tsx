import { useCallback, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

/* --------------------------------- Helpers -------------------------------- */
// TODO: Color definitions must be moved to a central theme file
const ALERT_COLORS = {
  success: {
    background: "#10B981",
    text: "#FFFFFF",
  },
  error: {
    background: "#EF4444",
    text: "#FFFFFF",
  },
  warning: {
    background: "#F59E0B",
    text: "#FFFFFF",
  },
  info: {
    background: "#3B82F6",
    text: "#FFFFFF",
  },
};

/* ---------------------------- Alert Definition ---------------------------- */
export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message?: string;
  visible: boolean;
  onDismiss: () => void;
}

export const Alert = ({
  variant,
  title,
  message,
  visible,
  onDismiss,
}: AlertProps) => {
  // ---------- Hooks
  const opacity = useRef(new Animated.Value(0)).current;

  // ---------- Helpers
  const colors = ALERT_COLORS[variant];

  // ---------- Callbacks
  const handleDismiss = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  // ---------- Effects
  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(handleDismiss);
    }
  }, [visible, opacity, handleDismiss]);

  // ---------- Render States
  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.background, opacity },
      ]}
    >
      {title && (
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      )}
      {message && (
        <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
      )}
    </Animated.View>
  );
};

/* --------------------------------- Styles --------------------------------- */
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 9999,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
  },
});
