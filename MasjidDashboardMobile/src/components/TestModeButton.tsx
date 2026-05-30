import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useTypedSelector } from '@/store/rootReducer';
import { useFocusEffect } from 'expo-router';
import { storeDispatchTestMode } from '@/store/ReduxStoreService';

interface Props {
    children: React.ReactNode;
}

export const TestModeButton: React.FC<Props> = ({ children }) => {
    const DURATION = 5;
    const LIMIT = 7;

    let tempDuration = 0;

    const testMode = useTypedSelector(state => state.testMode);
    let count: number = 0;

    const onTestMode = () => {
        count++;
        if (count > LIMIT) {
            tempDuration = 0;
            count = 0;
            console.log("turn on or off test mode");
            storeDispatchTestMode(!testMode.mode)
            const message = `Test mode is ${!testMode.mode === true ? "on": "off"}.`;
            Alert.alert('Test Mode', message);
        }
        console.log("Touched!!!", count);
    }

    useFocusEffect(
        useCallback(() => {
            const intervalId = setInterval(() => {
                console.log(`Interval tempDuration=${tempDuration}, count ${count}`);
                if (count > 0) {
                    tempDuration++
                }

                if (tempDuration > DURATION) {
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