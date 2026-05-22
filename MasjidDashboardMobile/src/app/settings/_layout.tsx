import { Stack } from "expo-router";
import { ConstantsStyles } from "../../services/Constants";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: ConstantsStyles.color.background2 },
        headerTintColor: ConstantsStyles.text.colorLight,
        contentStyle: { backgroundColor: ConstantsStyles.color.background2 },
        // headerShadowVisible: false,
        // headerTransparent: false,
        // headerBlurEffect: "none",
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}