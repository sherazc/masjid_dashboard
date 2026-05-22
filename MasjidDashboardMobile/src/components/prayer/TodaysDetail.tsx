
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Cog from "../../images/Cog";
import Sunrise from "../../images/Sunrise";
import Underline from "../../images/Underline";
import { ConfigurationKey, ConstantsStyles } from "../../services/Constants";
import { dateToTime12h } from "mdb-core-js";
import { findConfigurationByName } from "mdb-core-js";
import { PrayerTimeSummaryMessage } from "../../types/react-types";
import { CompanyData } from "mdb-core-js";
import Refresh from "../../images/Refresh";
import {restartCompanyDataInterval} from "../../services/AppService";
import { useRouter } from "expo-router";

interface Props {
    prayerTimeMessage: PrayerTimeSummaryMessage;
    companyData: CompanyData;
}

export const TodaysDetail: React.FC<Props> = ({ prayerTimeMessage, companyData}) => {
    const router = useRouter();
    return (
        <View>
            {/* Company name and Setting */}
            <View style={styles.companyNameSettingView}>
                <View style={styles.companyNameView}>
                    <Text style={styles.companyName}>
                        {getCompanyName(companyData)}
                    </Text>
                    <Underline fill={ConstantsStyles.color.lines} width={220} />
                </View>
                <View style={styles.settingView}>
                    <TouchableOpacity onPress={() => restartCompanyDataInterval(companyData)}>
                        <Refresh fill={ConstantsStyles.color.lines} />
                    </TouchableOpacity>
                </View>
                <View style={styles.settingView}>
                    <TouchableOpacity onPress={() => router.push("/settings")}>
                        <Cog fill={ConstantsStyles.color.lines} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Salah Details */}
            <View style={styles.prayerJammatView}>
                <View style={styles.prayerView}>
                    <Text style={styles.prayerName}>{prayerTimeMessage.prayerName}</Text>
                    {getSunriseComponent(prayerTimeMessage)}
                </View>
                <View style={styles.prayerJammatSeparatorView}>
                    <View style={styles.prayerJammatSeparator}></View>
                </View>
                <View style={styles.jammatView}>
                    {getPrayerOrNextPrayerStatus(prayerTimeMessage)}
                    <Text style={{ ...styles.heading, marginTop: 20 }}>Jummah</Text>
                    <Text style={styles.textNormal}>
                        {findConfigurationByName(companyData.configurations, ConfigurationKey.JUMAH_PRAYER)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const getCompanyName = (companyData: CompanyData) => {
    let result = "";
    if (companyData && companyData.company && companyData.company.name) {
        result = companyData.company.name;
    }
    return result;
}

const getPrayerOrNextPrayerStatus = (prayerTimeMessage: PrayerTimeSummaryMessage) => {
    if (prayerTimeMessage.jamatStatusSet) {
        return prayerTimeMessage.jamatStatus
    } else {
        return prayerTimeMessage.nextPrayerStatus
    }
}

const getSunriseComponent = (prayerTimeMessage: PrayerTimeSummaryMessage) => {
    let result = <></>
    if (prayerTimeMessage && prayerTimeMessage.prayerTimeSummary
        && prayerTimeMessage.prayerTimeSummary.sunriseTime) {

        result = <>
            <Sunrise fill="#fff" width={55} height={25} />
            <Text style={styles.heading}>Sunrise</Text>
            <Text style={styles.textNormal}>
                {dateToTime12h(prayerTimeMessage.prayerTimeSummary.sunriseTime)}
            </Text>
        </>
    }

    return result;
}


const styles = StyleSheet.create({
    companyNameSettingView: {
        flexDirection: "row",
    },
    companyNameView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    companyName: {
        fontSize: 25,
        color: ConstantsStyles.text.colorLight,
        marginTop: 10,
        textAlign: "center",
    },
    settingView: {
        flexBasis: 50,
        flexGrow: 0,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    prayerJammatView: {
        flexDirection: "row",
        marginTop: 20
    },
    // Container for Prayer and Sunrise
    prayerView: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red"
    },
    prayerName: {
        color: ConstantsStyles.text.colorLight,
        fontSize: 35,
        marginBottom: 10,
    },
    prayerJammatSeparatorView: {
        flexBasis: 10,
        flexGrow: 0,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    prayerJammatSeparator: {
        width: 3,
        height: 60,
        backgroundColor: ConstantsStyles.color.lines,
        borderRadius: 3,
    },
    // Container for Jammat and Jummah
    jammatView: {
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        // backgroundColor: "blue"
    },
    heading: {
        color: ConstantsStyles.text.colorLight,
        fontSize: 15,
        fontWeight: "bold"
    },
    textNormal: {
        color: ConstantsStyles.text.colorLight,
        fontSize: 15,
    }
});