import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "../store/rootReducer";
import { ConstantsStyles } from "../services/Constants";
import { NavRoutes } from "./NavRoutes";

export default function Index() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={ConstantsStyles.color.background2} />
      <NavRoutes />    
    </Provider>
  );
}
