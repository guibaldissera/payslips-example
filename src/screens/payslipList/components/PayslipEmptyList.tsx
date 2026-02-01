import { StyleSheet, Text, View } from "react-native";

export const PayslipEmptyList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No payslips found</Text>
    <Text style={styles.emptySubtext}>
      Your payslips will appear here once available
    </Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
  },
});
