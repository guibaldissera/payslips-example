import { FlatList, StyleSheet } from "react-native";
import type { PayslipModel } from "../../../api/useFetchPayslips";
import { PayslipEmptyList } from "./PayslipEmptyList";
import { PayslipItem } from "./PayslipItem";
import { PayslipListLoading } from "./PayslipListLoading";

interface PayslipFlatListProps {
  data: PayslipModel[];
  loading: boolean;
  refetch: () => void;
  onItemPress?: (id: string) => void;
}

export const PayslipFlatList = ({
  data,
  loading,
  refetch,
  onItemPress,
}: PayslipFlatListProps) => {
  if (loading) {
    return <PayslipListLoading />;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <PayslipItem item={item} onItemPress={onItemPress} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={PayslipEmptyList}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    padding: 16,
  },
});
