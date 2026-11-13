package com.sc.mdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Prayer times are stored as strings in "HH:mm" format (e.g. 18:52).
 */
@Entity
@Table(name = "prayer_day",
        uniqueConstraints = @UniqueConstraint(name = "uq_prayer_day", columnNames = {"prayer_config_id", "prayer_date"}))
@Getter
@Setter
@NoArgsConstructor
public class PrayerDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "prayer_config_id", nullable = false)
    private PrayerConfig prayerConfig;

    // Could be any leap year.
    // Year will be calculated in real time.
    @Column(nullable = false)
    private LocalDate prayerDate;

    // Times are in string because they are in HH:mm format.
    @Column(length = 16)
    private String fajr;

    @Column(length = 16)
    private String fajrIqama;

    @Column(length = 16)
    private String dhuhr;

    @Column(length = 16)
    private String dhuhrIqama;

    @Column(length = 16)
    private String asr;

    @Column(length = 16)
    private String asrIqama;

    @Column(length = 16)
    private String maghrib;

    @Column(length = 16)
    private String isha;

    @Column(length = 16)
    private String ishaIqama;

    @Column(length = 16)
    private String sunrise;
}
