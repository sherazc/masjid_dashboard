import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "../store/rootReducer";
import { ConstantsStyles } from "../services/Constants";
import { NavRoutes } from "../components/NavRoutes";
import { CompanySelect } from "./company/CompanySelect";

export default function Index() {

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={ConstantsStyles.color.background2} />
      {/* <NavRoutes /> */}
      <CompanySelect />
    </Provider>
  );


/*
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
  */
}
