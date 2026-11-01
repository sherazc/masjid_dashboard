-- Masjid Dashboard initial schema.
-- Derived from the CDB MongoDB model (cdb/api/data/.../model).
--
-- Conventions
--   * Primary keys are BIGINT identity columns (replaces Mongo ObjectId).
--   * Embedded Mongo arrays/objects are normalized into child tables, except
--     small fixed-shape objects (address, geo code, DST) which become columns.
--   * Ordered lists keep their order in a sort_order column.
--   * Case-insensitive lookups (findByNameIgnoreCase / findByUrlIgnoreCase)
--     are served by unique indexes on lower(...).
--   * Audit columns mirror BaseModel (createdDate/updatedDate/createdBy/updatedBy).

-- ---------------------------------------------------------------------------
-- Auth: company, user, roles
-- ---------------------------------------------------------------------------

CREATE TABLE company (
    id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name             VARCHAR(255) NOT NULL,
    url              VARCHAR(255) NOT NULL,
    website          VARCHAR(512) NOT NULL,
    -- Address (embedded object)
    street           VARCHAR(255),
    city             VARCHAR(128),
    state            VARCHAR(64),
    zip              VARCHAR(32),
    longitude        VARCHAR(32),
    latitude         VARCHAR(32),
    active           BOOLEAN      NOT NULL DEFAULT TRUE,
    expiration_date  TIMESTAMPTZ,
    created_date     TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_date     TIMESTAMPTZ,
    created_by       VARCHAR(255),
    updated_by       VARCHAR(255)
);

CREATE UNIQUE INDEX uq_company_name_lower ON company (lower(name));
CREATE UNIQUE INDEX uq_company_url_lower  ON company (lower(url));

CREATE TABLE user_profile (
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id         BIGINT       NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    email              VARCHAR(255) NOT NULL,
    password           VARCHAR(1024),
    first_name         VARCHAR(128),
    last_name          VARCHAR(128),
    email_verify_code  VARCHAR(255),
    registration_date  TIMESTAMPTZ,
    active             BOOLEAN      NOT NULL DEFAULT FALSE,
    verified           BOOLEAN      NOT NULL DEFAULT FALSE,
    created_date       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_date       TIMESTAMPTZ,
    created_by         VARCHAR(255),
    updated_by         VARCHAR(255)
);

-- Login is company scoped ("<companyId>/<email>"), so email is unique per company.
CREATE UNIQUE INDEX uq_user_profile_company_email_lower ON user_profile (company_id, lower(email));

CREATE TABLE user_role (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role_name  VARCHAR(32) NOT NULL,
    CONSTRAINT uq_user_role_name UNIQUE (role_name)
);

CREATE TABLE m2m_user_profile_user_role (
    user_profile_id  BIGINT NOT NULL REFERENCES user_profile (id) ON DELETE CASCADE,
    user_role_id     BIGINT NOT NULL REFERENCES user_role (id) ON DELETE CASCADE,
    PRIMARY KEY (user_profile_id, user_role_id)
);
CREATE INDEX idx_m2m_user_profile_user_role_role ON m2m_user_profile_user_role (user_role_id);

INSERT INTO user_role (role_name) VALUES ('SUPER_ADMIN'), ('ADMIN'), ('USER');

-- Hashed refresh tokens (the raw token is only ever returned to the client).
CREATE TABLE refresh_token (
    id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_profile_id  BIGINT       NOT NULL REFERENCES user_profile (id) ON DELETE CASCADE,
    token_hash       VARCHAR(255) NOT NULL,
    expires_at       TIMESTAMPTZ  NOT NULL,
    revoked_at       TIMESTAMPTZ,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_refresh_token_hash UNIQUE (token_hash)
);
CREATE INDEX idx_refresh_token_user_profile ON refresh_token (user_profile_id);

-- ---------------------------------------------------------------------------
-- Versioning (clients poll these to detect changes)
-- ---------------------------------------------------------------------------

CREATE TABLE company_data_version (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id  BIGINT NOT NULL UNIQUE REFERENCES company (id) ON DELETE CASCADE,
    version     BIGINT NOT NULL
);

-- Version of the company list as a whole (global; expected to hold one row).
CREATE TABLE company_list_version (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    version       BIGINT      NOT NULL,
    created_date  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_date  TIMESTAMPTZ,
    created_by    VARCHAR(255),
    updated_by    VARCHAR(255)
);

-- ---------------------------------------------------------------------------
-- Central control (per-company display content).
-- The Mongo centralControl document had one row per company with embedded
-- lists; each list is now a child table keyed by company_id.
-- ---------------------------------------------------------------------------

CREATE TABLE announcement (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id  BIGINT NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    sort_order  INT    NOT NULL DEFAULT 0,
    detail      TEXT
);
CREATE INDEX idx_announcement_company ON announcement (company_id);

CREATE TABLE custom_configuration (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id  BIGINT       NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    sort_order  INT          NOT NULL DEFAULT 0,
    name        VARCHAR(255) NOT NULL,
    value       TEXT
);
CREATE INDEX idx_custom_configuration_company ON custom_configuration (company_id);

CREATE TABLE event (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id   BIGINT NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    sort_order   INT    NOT NULL DEFAULT 0,
    event_date   TIMESTAMPTZ,
    title        VARCHAR(255),
    event_time   VARCHAR(64),
    description  TEXT
);
CREATE INDEX idx_event_company ON event (company_id);

CREATE TABLE expense (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id  BIGINT        NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    sort_order  INT           NOT NULL DEFAULT 0,
    line_item   VARCHAR(255),
    amount      NUMERIC(14,2),
    enabled     BOOLEAN
);
CREATE INDEX idx_expense_company ON expense (company_id);

CREATE TABLE fund (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id  BIGINT        NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    sort_order  INT           NOT NULL DEFAULT 0,
    name        VARCHAR(255),
    goal        NUMERIC(14,2),
    current     NUMERIC(14,2),
    pledge      NUMERIC(14,2),
    end_date    DATE,
    enabled     BOOLEAN
);
CREATE INDEX idx_fund_company ON fund (company_id);

CREATE TABLE jummah (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id    BIGINT NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    sort_order    INT    NOT NULL DEFAULT 0,
    jummah_date   DATE,
    khateeb       VARCHAR(255),
    enabled       BOOLEAN
);
CREATE INDEX idx_jummah_company ON jummah (company_id);

-- Expense sheets (CentralControl.expenseSheets)
CREATE TABLE sheet (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id   BIGINT       NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    sort_order   INT          NOT NULL DEFAULT 0,
    name         VARCHAR(255),
    description  TEXT,
    enabled      BOOLEAN      NOT NULL DEFAULT FALSE
);
CREATE INDEX idx_sheet_company ON sheet (company_id);

CREATE TABLE sheet_row (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sheet_id   BIGINT       NOT NULL REFERENCES sheet (id) ON DELETE CASCADE,
    row_order  INT          NOT NULL,
    label      VARCHAR(255),
    value      TEXT
);
CREATE INDEX idx_sheet_row_sheet ON sheet_row (sheet_id);

-- ---------------------------------------------------------------------------
-- Prayer configuration and daily prayer times
-- ---------------------------------------------------------------------------

CREATE TABLE prayer_config (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id            BIGINT       NOT NULL UNIQUE REFERENCES company (id) ON DELETE CASCADE,
    location              VARCHAR(255),
    calculation_method    INT,
    asr_juristic_method   INT,
    -- Offsets (minutes) for the 7 prayer times; array of length 7.
    prayer_offset_minutes INT[]        NOT NULL DEFAULT ARRAY[0,0,0,0,0,0,0],
    -- GeoCode (embedded object)
    geo_latitude          DOUBLE PRECISION,
    geo_longitude         DOUBLE PRECISION,
    geo_timezone          DOUBLE PRECISION,
    geo_timezone_id       VARCHAR(64),
    geo_timezone_name     VARCHAR(128),
    -- Dst (embedded object)
    dst_enable            BOOLEAN,
    dst_automatic_calculate BOOLEAN,
    dst_begin_month_date  VARCHAR(32),
    dst_end_month_date    VARCHAR(32),
    CONSTRAINT chk_prayer_offset_len CHECK (cardinality(prayer_offset_minutes) = 7)
);

-- One row per day; replaces PrayerConfig.prayers (embedded list).
-- Times are stored as the display strings the clients already consume.
CREATE TABLE prayer_day (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    prayer_config_id      BIGINT       NOT NULL REFERENCES prayer_config (id) ON DELETE CASCADE,
    prayer_date           TIMESTAMPTZ  NOT NULL,
    hijri_string          VARCHAR(64),
    fajr                  VARCHAR(16),
    fajr_iqama            VARCHAR(16),
    dhuhr                 VARCHAR(16),
    dhuhr_iqama           VARCHAR(16),
    asr                   VARCHAR(16),
    asr_iqama             VARCHAR(16),
    maghrib               VARCHAR(16),
    maghrib_iqama         VARCHAR(16),
    isha                  VARCHAR(16),
    isha_iqama            VARCHAR(16),
    sunrise               VARCHAR(16),
    -- Scheduled iqama changes
    fajr_change           VARCHAR(16),
    fajr_change_date      TIMESTAMPTZ,
    dhuhr_change          VARCHAR(16),
    dhuhr_change_date     TIMESTAMPTZ,
    asr_change            VARCHAR(16),
    asr_change_date       TIMESTAMPTZ,
    maghrib_change        VARCHAR(16),
    maghrib_change_date   TIMESTAMPTZ,
    isha_change           VARCHAR(16),
    isha_change_date      TIMESTAMPTZ,
    CONSTRAINT uq_prayer_day UNIQUE (prayer_config_id, prayer_date)
);

-- ---------------------------------------------------------------------------
-- Picklists (global configuration templates)
-- ---------------------------------------------------------------------------

CREATE TABLE picklist (
    id  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);

CREATE TABLE picklist_configuration (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    picklist_id    BIGINT       NOT NULL REFERENCES picklist (id) ON DELETE CASCADE,
    sort_order     INT          NOT NULL DEFAULT 0,
    name           VARCHAR(255) NOT NULL,
    type           VARCHAR(16)  CHECK (type IN ('text', 'date', 'number', 'bool', 'time')),
    label          VARCHAR(255),
    default_value  TEXT,
    description    TEXT
);
CREATE INDEX idx_picklist_configuration_picklist ON picklist_configuration (picklist_id);

-- ---------------------------------------------------------------------------
-- Hadith
-- ---------------------------------------------------------------------------

CREATE TABLE hadith (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text       TEXT NOT NULL,
    reference  VARCHAR(512)
);

-- ---------------------------------------------------------------------------
-- File metadata (binary content lives in S3)
-- ---------------------------------------------------------------------------

CREATE TABLE cdb_file (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id  BIGINT       NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    storage     VARCHAR(32)  NOT NULL CHECK (storage IN ('S3CdbClient', 'S3CdbServer')),
    file_type   VARCHAR(32)  NOT NULL CHECK (file_type IN ('CompanyLogo')),
    directory   VARCHAR(512) NOT NULL,
    file_name   VARCHAR(255) NOT NULL
);
CREATE INDEX idx_cdb_file_company ON cdb_file (company_id, file_type);
