CREATE TABLE company
(
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    url             VARCHAR(255) NOT NULL,
    website         VARCHAR(512) NOT NULL,
    street          VARCHAR(255),
    city            VARCHAR(128),
    state           VARCHAR(64),
    zip             VARCHAR(32),
    longitude       VARCHAR(32),
    latitude        VARCHAR(32),
    active          BOOLEAN      NOT NULL DEFAULT TRUE,
    expiration_date TIMESTAMP,
    created_date    TIMESTAMP NOT NULL DEFAULT now(),
    updated_date    TIMESTAMP,
    created_by      VARCHAR(255),
    updated_by      VARCHAR(255)
);

CREATE UNIQUE INDEX uq_company_name_lower ON company (lower(name));
CREATE UNIQUE INDEX uq_company_url_lower ON company (lower(url));

CREATE TABLE user_profile
(
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id        BIGINT       NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    email             VARCHAR(255) NOT NULL,
    password          VARCHAR(1024),
    first_name        VARCHAR(128),
    last_name         VARCHAR(128),
    email_verify_code VARCHAR(255),
    registration_date TIMESTAMP,
    active            BOOLEAN      NOT NULL DEFAULT FALSE,
    verified          BOOLEAN      NOT NULL DEFAULT FALSE,
    created_date      TIMESTAMP NOT NULL DEFAULT now(),
    updated_date      TIMESTAMP,
    created_by        VARCHAR(255),
    updated_by        VARCHAR(255)
);

CREATE UNIQUE INDEX uq_user_profile_company_email_lower ON user_profile (company_id, lower(email));

CREATE TABLE user_role
(
    id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role_name VARCHAR(32) NOT NULL,
    CONSTRAINT uq_user_role_name UNIQUE (role_name)
);

CREATE TABLE m2m_user_profile_user_role
(
    user_profile_id BIGINT NOT NULL REFERENCES user_profile (id) ON DELETE CASCADE,
    user_role_id    BIGINT NOT NULL REFERENCES user_role (id) ON DELETE CASCADE,
    PRIMARY KEY (user_profile_id, user_role_id)
);
CREATE INDEX idx_m2m_user_profile_user_role_role ON m2m_user_profile_user_role (user_role_id);

INSERT INTO user_role (id, role_name) OVERRIDING SYSTEM VALUE
VALUES (1, 'SUPER_ADMIN'),
       (2, 'ADMIN'),
       (3, 'USER');

SELECT setval(pg_get_serial_sequence('user_role', 'id'), (SELECT COALESCE(MAX(id), 0) FROM user_role));

CREATE TABLE refresh_token
(
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_profile_id BIGINT       NOT NULL REFERENCES user_profile (id) ON DELETE CASCADE,
    token_hash      VARCHAR(2048) NOT NULL,
    expires_at      TIMESTAMP NOT NULL,
    revoked_at      TIMESTAMP,
    created_at      TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT uq_refresh_token_hash UNIQUE (token_hash)
);
CREATE INDEX idx_refresh_token_user_profile ON refresh_token (user_profile_id);

CREATE TABLE company_data_version
(
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id BIGINT NOT NULL UNIQUE REFERENCES company (id) ON DELETE CASCADE,
    version    BIGINT NOT NULL
);

CREATE TABLE company_list_version
(
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    version      BIGINT      NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT now(),
    updated_date TIMESTAMP,
    created_by   VARCHAR(255),
    updated_by   VARCHAR(255)
);

CREATE TABLE fundraise_campaign
(
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id BIGINT NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    sort_order INT    NOT NULL DEFAULT 0,
    name       VARCHAR(255),
    goal       NUMERIC(14, 2),
    current    NUMERIC(14, 2),
    pledge     NUMERIC(14, 2),
    end_date   DATE,
    enabled    BOOLEAN
);
CREATE INDEX idx_fundraise_campaign_company ON fundraise_campaign (company_id);

CREATE TABLE jummah_khateeb
(
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id   BIGINT NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    jummah_date  DATE,
    khateeb_name VARCHAR(255),
    enabled      BOOLEAN
);
CREATE INDEX idx_jummah_khateeb_company ON jummah_khateeb (company_id);

CREATE TABLE jummah_jammat
(
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id  BIGINT NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    jummah_time TIMESTAMP,
    description VARCHAR(255)
);
CREATE INDEX idx_jummah_jammat_company ON jummah_jammat (company_id);


CREATE TABLE expense_sheet
(
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id  BIGINT NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    sort_order  INT    NOT NULL DEFAULT 0,
    name        VARCHAR(255),
    description TEXT
);
CREATE INDEX idx_expense_sheet_company ON expense_sheet (company_id);

CREATE TABLE expense_sheet_row
(
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sheet_id   BIGINT NOT NULL REFERENCES expense_sheet (id) ON DELETE CASCADE,
    sort_order INT    NOT NULL DEFAULT 0,
    label      VARCHAR(255),
    value      TEXT
);
CREATE INDEX idx_expense_sheet_row_sheet ON expense_sheet_row (sheet_id);

CREATE TABLE prayer_config
(
    id                      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id              BIGINT NOT NULL UNIQUE REFERENCES company (id) ON DELETE CASCADE,
    location                VARCHAR(255),
    calculation_method      INT,
    asr_juristic_method     INT,
    offset_fajar            INT,
    offset_dhuhr            INT,
    offset_asr              INT,
    offset_maghrib          INT,
    offset_isha             INT,
    offset_sunrise          INT,
    geo_latitude            DOUBLE PRECISION,
    geo_longitude           DOUBLE PRECISION,
    geo_timezone            DOUBLE PRECISION,
    geo_timezone_id         VARCHAR(64),
    geo_timezone_name       VARCHAR(128),
    dst_enable              BOOLEAN,
    dst_automatic_calculate BOOLEAN,
    dst_begin_month_date    VARCHAR(32),
    dst_end_month_date      VARCHAR(32)
);

CREATE TABLE prayer_day
(
    id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    prayer_config_id BIGINT NOT NULL REFERENCES prayer_config (id) ON DELETE CASCADE,
    prayer_date      DATE   NOT NULL,
    -- varchar because they are in 18:52 format
    fajr             VARCHAR(16),
    fajr_iqama       VARCHAR(16),
    dhuhr            VARCHAR(16),
    dhuhr_iqama      VARCHAR(16),
    asr              VARCHAR(16),
    asr_iqama        VARCHAR(16),
    maghrib          VARCHAR(16),
    isha             VARCHAR(16),
    isha_iqama       VARCHAR(16),
    sunrise          VARCHAR(16),
    CONSTRAINT uq_prayer_day UNIQUE (prayer_config_id, prayer_date)
);

CREATE TABLE picklist_group
(
    picklist_group_name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE picklist
(
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    picklist_group_name VARCHAR(255) NOT NULL REFERENCES picklist_group (picklist_group_name),
    key                 VARCHAR(255) NOT NULL,
    value               VARCHAR(255),
    display_value       VARCHAR(255),
    display_image_url   VARCHAR(1024)
);

CREATE TABLE company_configuration_default
(
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sort_order          INT          NOT NULL DEFAULT 0,
    name                VARCHAR(255) NOT NULL,
    picklist_group_name VARCHAR(255) REFERENCES picklist_group (picklist_group_name),
    label               VARCHAR(255),
    default_value       TEXT,
    description         TEXT,
    display_image_url   VARCHAR(1024)
);

INSERT INTO picklist_group (picklist_group_name)
VALUES ('clock_type'),
       ('dashboard_type');

INSERT INTO picklist (picklist_group_name, key, value, display_value, display_image_url)
VALUES ('clock_type', '0', '0', 'No Clock', NULL),
       ('clock_type', '1', '1', 'Analog', NULL),
       ('clock_type', '2', '2', 'Digital', NULL),
       ('dashboard_type', '1', '1', 'Dashboard 1', NULL),
       ('dashboard_type', '2', '2', 'Dashboard 2', NULL);

INSERT INTO company_configuration_default (sort_order, name, picklist_group_name, label, default_value, description, display_image_url)
VALUES (10, 'hijri_adjust_days', NULL, 'Hijri Adjust Days', '0',
        'This config is used to adjust Hijri Calendar date. Valid value is number. Could be positive or negative values', NULL),
       (20, 'clock_type', 'clock_type', 'Clock Type', '1',
        E'0 = no clock\n1 = analog\n2 = digital', NULL),
       (30, 'fajr_iqama', NULL, 'Fajr Iqama', '',
        E'Overrides Fajr iqama time.\nIqama and next change time in calendar will be ignored.\nEnter time in 24 hours format 00:00 or a short message.', NULL),
       (40, 'zuhar_iqama', NULL, 'Zuhr Iqama', '',
        E'Overrides Zuhr iqama time.\nIqama and next change time in calendar will be ignored.\nEnter time in 24 hours format 00:00 or a short message.', NULL),
       (50, 'asr_iqama', NULL, 'Asr Iqama', '',
        E'Overrides Asr iqama time.\nIqama and next change time in calendar will be ignored.\nEnter time in 24 hours format 00:00 or a short message.', NULL),
       (60, 'maghrib_iqama', NULL, 'Maghrib Iqama', '5 Mins',
        E'Overrides Magrib time.\nIqama and next change time in calendar will be ignored.\nEnter time in 24 hours format 00:00 or a short message.', NULL),
       (70, 'isha_iqama', NULL, 'Isha Iqama', '',
        E'Overrides Isha iqama time.\nIqama and next change time in calendar will be ignored.\nEnter time in 24 hours format 00:00 or a short message.', NULL),
       (80, 'dashboard_type', 'dashboard_type', 'Dashboard Type', '1',
        'Switches the dashboard layout displayed on the masjid screen.', NULL);

CREATE TABLE company_configuration_override
(
    id                               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_id                       BIGINT NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    company_configuration_default_id BIGINT NOT NULL REFERENCES company_configuration_default (id) ON DELETE CASCADE,
    value                            TEXT
);
CREATE INDEX idx_custom_configuration_company ON company_configuration_override (company_id);


-- ---------------------------------------------------------------------------
-- Hadith
-- ---------------------------------------------------------------------------

CREATE TABLE hadith
(
    id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text      TEXT NOT NULL,
    reference VARCHAR(512)
);
