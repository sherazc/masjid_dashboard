import { StatusBar, Text, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "../store/rootReducer";
import { ConstantsStyles } from "../services/Constants";
import { NavRoutes } from "../components/NavRoutes";
import { Company } from "mdb-core-js";
import { createStackNavigator } from "@react-navigation/stack";



const Stack = createStackNavigator<MdParamList>();

export type MdParamList = {
    CompanySelect: undefined;
    PrayerTime: { selectedCompany?: Company };
    Settings: { backScreenName: string };
    RegisterInfo: { backScreenName: string };
}

const noHeaderOptions = {
    header: () => null
};


export default function Index() {

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={ConstantsStyles.color.background2} />
      <NavRoutes />
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
