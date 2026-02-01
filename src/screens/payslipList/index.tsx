import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useFetchPayslips } from "../../api/useFetchPayslips";
import { PayslipFlatList } from "./components/PayslipFlatList";

export const PayslipListScreen = () => {
  const router = useRouter();
  const { data, loading, refetch } = useFetchPayslips();

  const handleItemPress = (id: string) => {
    router.push(`/details?id=${id}`);
  };

  return (
    <View style={styles.container}>
      <PayslipFlatList
        data={data}
        loading={loading}
        refetch={refetch}
        onItemPress={handleItemPress}
      />
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
