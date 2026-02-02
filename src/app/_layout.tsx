import { Stack } from "expo-router";
import { AlertProvider } from "../components";

export default function RootLayout() {
  return (
    <AlertProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Payslips" }} />
        <Stack.Screen
          name="details"
          options={{
            title: "Payslip Details",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </AlertProvider>
  );
}
