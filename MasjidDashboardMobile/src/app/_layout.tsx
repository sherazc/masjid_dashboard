
import { Stack } from "expo-router";
import { ConstantsStyles } from "../services/Constants";
import { Provider } from "react-redux";
import store from "../store/rootReducer";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: ConstantsStyles.color.background2 },
          headerTintColor: ConstantsStyles.text.colorLight,
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
    </Provider>
  );
}
