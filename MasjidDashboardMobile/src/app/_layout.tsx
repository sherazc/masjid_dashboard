import { Stack } from "expo-router";
import { ConstantsStyles } from "../services/Constants";

export default function RootLayout() {
  return <Stack 
      screenOptions={{
        headerStyle: { backgroundColor: ConstantsStyles.color.background2 }, 
        headerTintColor: ConstantsStyles.text.colorLight,
      }}
  />;
}
