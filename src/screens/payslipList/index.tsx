import { StyleSheet, View } from "react-native";
import { useFetchPayslips } from "../../api/useFetchPayslips";
import { PayslipFlatList } from "./components/PayslipFlatList";

export const PayslipListScreen = () => {
  const { data, loading, refetch } = useFetchPayslips();

  return (
    <View style={styles.container}>
      <PayslipFlatList data={data} loading={loading} refetch={refetch} />
    </View>
  );
};
PayslipListScreen.displayName = "PayslipListScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
