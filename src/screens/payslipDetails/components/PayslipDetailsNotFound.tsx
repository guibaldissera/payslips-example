import { StyleSheet, Text, View } from "react-native";

interface PayslipDetailsNotFoundProps {
  id: string;
}

export const PayslipDetailsNotFound = ({ id }: PayslipDetailsNotFoundProps) => (
  <View style={styles.notFoundContainer}>
    <Text style={styles.notFoundTitle}>Payslip Not Found</Text>
    <Text style={styles.notFoundText}>
      The payslip with ID {id} could not be found.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 24,
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 12,
  },
  notFoundText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
});
