import { StyleSheet, Text, View } from "react-native";
import type { PayslipModel } from "../../../api/useFetchPayslips";
import { formatFullDateRange } from "../../../utilities/formatFullDateRange";

interface PayslipDetailsInfoProps {
  payslip: PayslipModel;
}

export const PayslipDetailsInfo = ({ payslip }: PayslipDetailsInfoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payslip Details</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Period:</Text>
        <Text style={styles.value}>
          {formatFullDateRange(payslip.fromDate, payslip.toDate)}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{payslip.id}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>From Date:</Text>
        <Text style={styles.value}>
          {new Date(payslip.fromDate).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>To Date:</Text>
        <Text style={styles.value}>
          {new Date(payslip.toDate).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
  },
  value: {
    fontSize: 16,
    color: "#000000",
  },
});
