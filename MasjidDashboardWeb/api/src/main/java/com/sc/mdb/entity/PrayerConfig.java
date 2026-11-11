package com.sc.mdb.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "prayer_config")
@Getter
@Setter
@NoArgsConstructor
public class PrayerConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false, unique = true)
    private Company company;

    private String location;

    private Integer calculationMethod;

    private Integer asrJuristicMethod;

    private Integer offsetFajar;

    private Integer offsetDhuhr;

    private Integer offsetAsr;

    private Integer offsetMaghrib;

    private Integer offsetIsha;

    private Integer offsetSunrise;

    private Double geoLatitude;

    private Double geoLongitude;

    private Double geoTimezone;

    private String geoTimezoneId;

    private String geoTimezoneName;

    private Boolean dstEnable;

    private Boolean dstAutomaticCalculate;

    private String dstBeginMonthDate;

    private String dstEndMonthDate;
}
