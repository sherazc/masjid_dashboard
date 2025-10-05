import { PrayerTimeSummary } from "mdb-core-js";
import React, { JSX } from "react";

export interface PrayerTimeSummaryMessage {
    prayerTimeSummary?: PrayerTimeSummary;
    prayerName: JSX.Element;
    jamatStatus: JSX.Element;
    nextPrayerStatus: JSX.Element;
    jamatStatusSet: boolean;
}


export const createEmptyPrayerTimeSummaryMessage = (): PrayerTimeSummaryMessage => {
    return {
        prayerName: <></>,
        jamatStatus: <></>,
        nextPrayerStatus: <></>,
        jamatStatusSet: false,
        prayerTimeSummary: undefined,
    };
}