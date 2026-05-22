
import { Stack } from "expo-router";
import { ConstantsStyles } from "../services/Constants";
import { Provider } from "react-redux";
import store from "../store/rootReducer";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const customTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: ConstantsStyles.color.background2,
    },
  };

  return (
    <Provider store={store}>
      <ThemeProvider value={customTheme}>
        {/* <StatusBar> sets top bar where time, batter and network bars are shown */}
        <StatusBar style="light" animated={true}/>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: ConstantsStyles.color.background2 },
            headerTintColor: ConstantsStyles.text.colorLight,
            contentStyle: { backgroundColor: ConstantsStyles.color.background2 },
            // headerShadowVisible: false,
            // headerTransparent: false,
            // headerBlurEffect: "none",
          }}>

        <Stack.Screen
          name="index"
          options={{ headerShown: false }} />

        <Stack.Screen
          name="prayer/[companyId]"
          options={{ headerShown: false }} />

        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: true,
            headerBackTitle: "Back"
          }} />

        <Stack.Screen
          name="company/register-info"
          options={{
            title: "Register",
            headerShown: true,
            headerBackTitle: "Back"
          }} />
        <Stack.Screen
          name="company/company-select"
          options={{ headerShown: false }} />
      </Stack>
      </ThemeProvider>
    </Provider>
  );
}
