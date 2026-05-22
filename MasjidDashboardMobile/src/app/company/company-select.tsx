import React, { useEffect } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { useTypedSelector } from '../../store/rootReducer';

import { ConstantsStyles } from "../../services/Constants";
import { Info } from '../../images/Info';

import { CompanyList } from "@/components/company/CompanyList";
import { Link } from "expo-router";
import { beginCompanyListDataInterval, destroyTrackerInterval } from "@/services/AppService";
import { LoadingStatus } from "mdb-core-js";
import { Brand } from "@/components/company/Brand";

interface Props {
}

const CompanySelect: React.FC<Props> = () => {
    const companyListData = useTypedSelector(state => state.companyListData);
    const loading = useTypedSelector(state => state.loading);


    useEffect(() => {
        if (loading.recoverInitState === LoadingStatus.COMPLETE || loading.recoverInitState === LoadingStatus.FAILED) {
            beginCompanyListDataInterval(companyListData);
        }

        return () => {
            destroyTrackerInterval("CompanyListDataInterval", companyListData.tracker);
        }
    }, [loading])

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <Image source={require('../../images/background3.png')} style={styles.backgroundImage} />
            </View>
            <View style={styles.content}>
                <View style={styles.brand}>
                    <Brand />
                </View>
                <View style={styles.companyList}>
                    <CompanyList companyListData={companyListData} />
                </View>
                <View style={{
                    height: "8%",
                    alignItems: "center", justifyContent: "center",
                }}>
                    <Link href="/company/register-info">
                        <View
                            // onPress={() => { navigation.navigate("RegisterInfo", {backScreenName: "Masjid"}) }}
                            style={{
                                flexDirection: "row", alignItems: "center", justifyContent: "center",
                                backgroundColor: ConstantsStyles.color.background2,
                                borderRadius: 5,
                                width: 320, padding: 5,
                            }}>
                            <View style={{ marginRight: 5 }}>
                                <Info height={15} width={15} fill={ConstantsStyles.text.colorLight}></Info>
                            </View>
                            <Text style={{ fontSize: 15, color: ConstantsStyles.text.colorLight }}>
                                Become part of Masjid Dashboard
                            </Text>
                        </View>
                    </Link>
                </View>

            </View>
        </View>
    );
}

export default CompanySelect;

const styles = StyleSheet.create({
    container: {
    },
    background: {
        height: "100%",
        width: "100%"
    },
    backgroundImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover'
    },
    content: {
        backgroundColor: ConstantsStyles.color.background1,
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%"
    },
    brand: {
        height: "36%"
    },
    companyList: {
        height: "56%",
        paddingBottom: 0,
        paddingLeft: 15,
        paddingRight: 15,
    }
});
