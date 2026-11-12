package com.sc.mdb.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.Getter;

/**
 * Asr juristic methods. {@code id} is the value stored in
 * {@code prayer_config.asr_juristic_method}.
 */
@Getter
public enum AsrJuristicMethod {
    SHAFII(0, "Shafii (standard)"),
    HANAFI(1, "Hanafi");

    private final int id;
    private final String displayName;

    AsrJuristicMethod(int id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    public static AsrJuristicMethod fromId(int id) {
        for (AsrJuristicMethod m : values()) {
            if (m.id == id) {
                return m;
            }
        }
        throw new IllegalArgumentException("Unknown asr juristic method id: " + id);
    }

    @Converter
    public static class JpaConverter implements AttributeConverter<AsrJuristicMethod, Integer> {
        @Override
        public Integer convertToDatabaseColumn(AsrJuristicMethod attribute) {
            return attribute == null ? null : attribute.getId();
        }

        @Override
        public AsrJuristicMethod convertToEntityAttribute(Integer dbData) {
            return dbData == null ? null : fromId(dbData);
        }
    }
}
