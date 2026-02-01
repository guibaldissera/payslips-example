import { useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useFetchPayslips } from "../../api/useFetchPayslips";
import { PayslipDetailsInfo } from "./components/PayslipDetailsInfo";
import { PayslipFileViewer } from "./components/PayslipFileViewer";

export const PayslipDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, loading } = useFetchPayslips();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading payslip details...</Text>
      </View>
    );
  }

  const payslip = data.find((item) => item.id === id);

  if (!payslip) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Payslip Not Found</Text>
        <Text style={styles.notFoundText}>
          The payslip with ID {id} could not be found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <PayslipDetailsInfo payslip={payslip} />
      <PayslipFileViewer fileUri={payslip.file} />
    </ScrollView>
  );
};
PayslipDetailsScreen.displayName = "PayslipDetailsScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666666",
  },
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
