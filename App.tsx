import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import COLORS from "./src/constants/COLORS";
import AppNavigation from "./src/navigation/AppNavigation";
import store from "./src/redux/store";
const queryClient = new QueryClient();
export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_400Regular,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
      primary: COLORS.primaryColor,
      secondary: COLORS.secondaryColor,
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <SafeAreaView style={styles.container}>
            <AppNavigation />
          </SafeAreaView>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
