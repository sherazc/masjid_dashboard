import React from "react";
import { StyleSheet, View, Text, Linking, TouchableOpacity } from "react-native";
import { ConstantsStyles } from "@/src/services/Constants";

// TODO: Fix inline styles
interface Props {
}

const REGISTER_LINK = "https://www.masjiddashboard.com/auth/company/create"

const RegisterInfo: React.FC<Props> = () => {
    const onRegister = () => {
        Linking.canOpenURL(REGISTER_LINK)
            .then(() => {
                Linking.openURL(REGISTER_LINK);
            });
    }

    return (
        <View style={styles.container}>
            <View style={{ padding: 15 }}>
                <Text style={styles.paragraph}>
                    Masjid Dashboard shows all masjids that are registered at masjiddashboard.com
                </Text>
                <Text style={styles.paragraph}>
                    Please visit masjiddashboard.com, to make your masjid part of Masjid Dashboard
                </Text>
                <View style={{ alignItems: "center", justifyContent: "center", marginTop: 30 }}>
                    <TouchableOpacity
                        onPress={onRegister}
                        style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "center",
                            backgroundColor: ConstantsStyles.color.background2,
                            borderRadius: 5,
                            width: 320, padding: 15,
                        }}>

                        <Text style={{ fontSize: 15, color: ConstantsStyles.text.colorLight }}>
                            Become a member
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default RegisterInfo;

const styles = StyleSheet.create({
    safeAreaViewTop: {
        flex: 0,
        backgroundColor: ConstantsStyles.color.background2
    },
    safeAreaViewBottom: {
        backgroundColor: ConstantsStyles.color.background3,
        flex: 1
    },
    container: {
        backgroundColor: ConstantsStyles.color.background3,
        // height: "100%"
        flex: 1

    },
    paragraph: {
        fontSize: 18,
        color: ConstantsStyles.text.colorLight,
        marginBottom: 20
    }
});
