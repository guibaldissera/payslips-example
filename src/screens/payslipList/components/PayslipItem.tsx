import { Pressable, StyleSheet, Text, View } from "react-native";
import type { PayslipModel } from "../../../api/useFetchPayslips";
import { formatDateRange } from "../../../utilities/formatDateRange";

interface PayslipItemProps {
  item: PayslipModel;
  onItemPress?: (id: string) => void;
}

export const PayslipItem = ({ item, onItemPress }: PayslipItemProps) => (
  <Pressable
    style={({ pressed }: { pressed: boolean }) => [
      styles.itemContainer,
      pressed && styles.itemPressed,
    ]}
    onPress={() => onItemPress?.(item.id)}
  >
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>
        {formatDateRange(item.fromDate, item.toDate)}
      </Text>
      <Text style={styles.itemSubtitle}>ID: {item.id}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemPressed: {
    opacity: 0.7,
    backgroundColor: "#F0F0F0",
  },
  itemContent: {
    flexDirection: "column",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666666",
  },
});
