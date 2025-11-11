
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
        }}
      />
    </Provider>
  );
}
