import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useTypedSelector } from '@/store/rootReducer';
import { useFocusEffect } from 'expo-router';
import { storeDispatchTestMode } from '@/store/ReduxStoreService';

interface Props {
    children: React.ReactNode;
}

const DURATION = 3;
const LIMIT = 7;
/**
 * Created these variable outside component because they were getting reset on returning back to the screen.
 * Maybe because closure in interval
 */
let count: number = 0;
let tempDuration = 0;
export const TestModeButton: React.FC<Props> = ({ children }) => {
    const testMode = useTypedSelector(state => state.testMode);

    const onTestMode = () => {
        count++;
        console.log
        if (count > LIMIT) {
            tempDuration = 0;
            count = 0;
            console.log("turn on or off test mode");
            storeDispatchTestMode(!testMode.mode)
            const message = `Test mode is ${!testMode.mode === true ? "on" : "off"}.`;
            Alert.alert('Test Mode', message);
        }
        console.log(`Touched!!! tempDuration=${tempDuration}, count ${count}`);
    }

    useFocusEffect(
        useCallback(() => {
            const intervalId = setInterval(() => {
                if (count > 0) {
                    tempDuration++
                }

                if (tempDuration > DURATION) {
                    console.log(`Duration limit reached. Resetting tempDuration=${tempDuration}, count ${count}`);
                    tempDuration = 0;
                    count = 0;
                }
            }, 1000);

            return () => {
                clearInterval(intervalId);
                console.log("Remove interval")
            }
        }, [])
    );

    return (
        <>
            <View onTouchEnd={onTestMode}>
                {children}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
});