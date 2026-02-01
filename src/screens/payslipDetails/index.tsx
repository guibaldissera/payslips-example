import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { useFetchPayslips } from "../../api/useFetchPayslips";
import { PayslipDetailsFileViewer } from "./components/PayslipDetailsFileViewer";
import { PayslipDetailsInfo } from "./components/PayslipDetailsInfo";
import { PayslipDetailsLoading } from "./components/PayslipDetailsLoading";
import { PayslipDetailsNotFound } from "./components/PayslipDetailsNotFound";

/* ---------------------------- Screen Definition --------------------------- */
export const PayslipDetailsScreen = () => {
  // ---------- Hooks
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, loading } = useFetchPayslips();

  // ---------- Helpers
  const payslip = data.find((item) => item.id === id);

  // ---------- Extra States
  if (loading) {
    return <PayslipDetailsLoading />;
  }

  if (!payslip) {
    return <PayslipDetailsNotFound id={id} />;
  }

  // ---------- Render Main States
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <PayslipDetailsInfo payslip={payslip} />
      <PayslipDetailsFileViewer fileUri={payslip.file} />
    </ScrollView>
  );
};
PayslipDetailsScreen.displayName = "PayslipDetailsScreen";

/* ---------------------------- Style Definitions --------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    padding: 16,
  },
});
