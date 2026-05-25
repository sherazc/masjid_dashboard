import * as Notifications from 'expo-notifications';
import {ScheduleNotification} from "mdb-core-js";
import * as Device from 'expo-device';
import {Alert, Platform} from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        // shouldShowAlert: true, // Deprecated
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export const expoRemoveNotificationsAsync = () => {
    const promises: Array<Promise<any>> = [];

    console.log("Dismissing notification from status bar");
    const dismissAllPromise: Promise<void> = Notifications.dismissAllNotificationsAsync();
    promises.push(dismissAllPromise);
    console.log("Removing all notification. Notifications.cancelAllScheduledNotificationsAsync()");
    const cancelAllPromise: Promise<void> = Notifications.cancelAllScheduledNotificationsAsync();
    promises.push(cancelAllPromise);
    console.log("Removing individual notifications");


    Notifications.getAllScheduledNotificationsAsync()
        .then(expoNotificationArray => expoNotificationArray.forEach(expoNotification => {
            console.log("Removing and dismissing notification: ", expoNotification.identifier);
            const dismissPromise = Notifications.dismissNotificationAsync(expoNotification.identifier);
            promises.push(dismissPromise);

            const cancelPromise = Notifications.cancelScheduledNotificationAsync(expoNotification.identifier);
            promises.push(cancelPromise);
        }));

    return Promise.all(promises);
}

// Returns notification identifier 
export const expoScheduleNotificationAsync = async (scheduleNotification: ScheduleNotification): Promise<string> => {
    // TODO try to find what happens if same id is passed for multiple schedule notification
    return await Notifications.scheduleNotificationAsync({
        content: {
            title: scheduleNotification.title,
            body: scheduleNotification.message,
            data: { data: 'goes here' },
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: scheduleNotification.date,
        } as Notifications.DateTriggerInput
    });
}


// https://docs.expo.dev/push-notifications/push-notifications-setup/
// returns boolean if registration was successful
export const expoRegisterForNotificationsAsync = async (): Promise<boolean> => {
    let result = false;
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        Alert.alert('Notification permission', "Unable to set notification.");
    } else {
        result = true;
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return result;
};

export const isNotificationPossible = (): boolean => {
    if (!Device.isDevice) {
        Alert.alert('No device!', "Must use physical device for Notifications.");
    }
    return Device.isDevice;
};
