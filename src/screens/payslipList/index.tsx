import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useFetchPayslips } from "../../api/useFetchPayslips";
import { PayslipFlatList } from "./components/PayslipFlatList";

export const PayslipListScreen = () => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { data, loading, refetch } = useFetchPayslips({ sortOrder });

  const handleItemPress = (id: string) => {
    router.push(`/details?id=${id}`);
  };

  const toggleSortOrder = useCallback(() => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    refetch({ sortOrder: newSortOrder });
  }, [sortOrder, refetch]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerRight: () => (
            <Pressable
              onPress={toggleSortOrder}
              style={({ pressed }) => [
                {
                  marginRight: 16,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <MaterialIcons
                name={"sort"}
                size={24}
                color="#007AFF"
                style={{
                  transform: [
                    { rotate: sortOrder === "asc" ? "180deg" : "0deg" },
                  ],
                }}
              />
            </Pressable>
          ),
        }}
      />

      <View style={styles.container}>
        <PayslipFlatList
          data={data}
          loading={loading}
          refetch={refetch}
          onItemPress={handleItemPress}
        />
      </View>
    </>
  );
};
PayslipListScreen.displayName = "PayslipListScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
