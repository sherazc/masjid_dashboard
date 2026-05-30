import { ConstantsStyles } from "@/services/Constants";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const TestModeScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>Test Mode Screen</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: ConstantsStyles.color.background3,
        // height: "100%"
        flex: 1

    }
});

export default TestModeScreen;