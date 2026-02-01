import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { PayslipModel } from "../../../api/useFetchPayslips";
import { EmptyPayslipList } from "./EmptyPayslipList";
import { PayslipItem } from "./PayslipItem";

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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading payslips...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <PayslipItem item={item} onItemPress={onItemPress} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={EmptyPayslipList}
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
});
