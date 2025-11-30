import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { theme } from "./src/styles/theme";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
