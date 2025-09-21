import { Text, View } from "react-native";
import { isNotBlankString, nameToInitials, stringToHslColor, trimEllipsis } from "mdb-core-js";

export default function Index() {

  
  const isTrue = isNotBlankString("test");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen. {isTrue && "worked"}</Text>
    </View>
);
}
