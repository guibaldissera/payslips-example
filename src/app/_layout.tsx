import { Stack } from "expo-router";
import { AlertProvider } from "../components";

export default function RootLayout() {
  return (
    <AlertProvider>
      <Stack />
    </AlertProvider>
  );
}
