package com.sc.mdb.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.Getter;

/**
 * Prayer time calculation methods. {@code id} is the value stored in
 * {@code prayer_config.calculation_method}.
 */
@Getter
public enum CalculationMethod {
    ISNA(2, "Islamic Society of North America (ISNA)"),
    KARACHI(1, "University of Islamic Sciences, Karachi"),
    MWL(3, "Muslim World League (MWL)"),
    UMM_AL_QURA(4, "Umm al-Qura, Makkah"),
    EGYPTIAN(5, "Egyptian General Authority of Survey"),
    TEHRAN(6, "Institute of Geophysics, University of Tehran"),
    ITHNA_ASHARI(0, "Ithna Ashari");

    private final int id;
    private final String displayName;

    CalculationMethod(int id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    public static CalculationMethod fromId(int id) {
        for (CalculationMethod m : values()) {
            if (m.id == id) {
                return m;
            }
        }
        throw new IllegalArgumentException("Unknown calculation method id: " + id);
    }

    @Converter
    public static class JpaConverter implements AttributeConverter<CalculationMethod, Integer> {
        @Override
        public Integer convertToDatabaseColumn(CalculationMethod attribute) {
            return attribute == null ? null : attribute.getId();
        }

        @Override
        public CalculationMethod convertToEntityAttribute(Integer dbData) {
            return dbData == null ? null : fromId(dbData);
        }
    }
}
