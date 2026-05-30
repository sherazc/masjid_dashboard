import { testRemoveAllNotifications, testScheduleNotification } from "@/misc/TestNotification";
import { ConstantsStyles } from "@/services/Constants";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

interface Props { }

const TestModeScreen: React.FC<Props> = () => {
  const [testNotificationDelaySeconds, setTestNotificationDelaySeconds] = useState<number>(0);
  const showNotification = () => {
    console.log("Showing sample notification");
    testScheduleNotification(testNotificationDelaySeconds);
  }

  const removeNotifications = () => {
    console.log("Removing Notifications...")
    testRemoveAllNotifications();
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType='number-pad'
        style={{ height: 40, backgroundColor: "#fff" }}
        placeholder="Test notification delay seconds"
        onChangeText={num => setTestNotificationDelaySeconds(+num)}
      />
      <Button onPress={showNotification} title="Notification" />
      <Button onPress={removeNotifications} title="Remove All Notifications" />
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