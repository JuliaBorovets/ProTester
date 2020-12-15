DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tokens CASCADE;
DROP TABLE IF EXISTS action_declarations CASCADE;
DROP TABLE IF EXISTS actions CASCADE;
DROP TABLE IF EXISTS action_parameters CASCADE;
DROP TABLE IF EXISTS compounds CASCADE;
DROP TABLE IF EXISTS compounds_actions CASCADE;
DROP TABLE IF EXISTS libraries CASCADE;
DROP TABLE IF EXISTS libraries_storage CASCADE;
DROP TABLE IF EXISTS tests_scenarios CASCADE;
DROP TABLE IF EXISTS steps CASCADE;
DROP TABLE IF EXISTS step_params CASCADE;
DROP TABLE IF EXISTS tests_scenarios_actions_compounds CASCADE;
DROP TABLE IF EXISTS data_sets CASCADE;
DROP TABLE IF EXISTS data_set_parameters CASCADE;
DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS test_cases CASCADE;
DROP TABLE IF EXISTS test_case_data_sets CASCADE;
DROP TABLE IF EXISTS test_cases_watchers CASCADE;
DROP TABLE IF EXISTS result_tests CASCADE;
DROP TABLE IF EXISTS test_case_result CASCADE;
DROP TABLE IF EXISTS action_result CASCADE;
DROP TABLE IF EXISTS action_result_extra CASCADE;

CREATE TABLE roles
(
    role_id   SERIAL PRIMARY KEY,
    role_name VARCHAR(16) UNIQUE NOT NULL
);

CREATE TABLE users (
    user_id			SERIAL PRIMARY KEY,
    role_id			INTEGER			   NOT NULL,
    user_username	VARCHAR(32) UNIQUE NOT NULL,
    user_password	CHAR(60) 		   NOT NULL,
    user_email 		VARCHAR(32) UNIQUE NOT NULL,
    user_active		BOOLEAN			   NOT NULL,
    user_first_name	VARCHAR(32) 	   NOT NULL,
    user_last_name	VARCHAR(32) 	   NOT NULL,
    CONSTRAINT user_role_fk FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

CREATE TABLE tokens (
    token_id			SERIAL PRIMARY KEY,
    user_id				INTEGER 		   NOT NULL,
    token_value			VARCHAR(64)	UNIQUE NOT NULL,
    token_expiry_date	TIMESTAMPTZ,
    CONSTRAINT token_user_fk FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE actions (
    action_id		SERIAL PRIMARY KEY,
    action_class    VARCHAR(256) NOT NULL,
    action_description TEXT
);

CREATE TABLE compounds (
    compound_id				SERIAL PRIMARY KEY,
    compound_name			VARCHAR(64)	NOT NULL,
    compound_description 	TEXT        NOT NULL
);

CREATE TABLE libraries (
    library_id 			SERIAL PRIMARY KEY,
    library_name 		VARCHAR(32) NOT NULL,
    library_description TEXT
);

CREATE TABLE libraries_storage (
    library_storage_id SERIAL PRIMARY KEY,
    library_id	INTEGER NOT NULL,
    action_id	INTEGER,
    compound_id INTEGER,
    is_action   BOOLEAN NOT NULL,
    CONSTRAINT ls_library_fk FOREIGN KEY (library_id) REFERENCES libraries (library_id) ON DELETE CASCADE,
    CONSTRAINT ls_action_fk  FOREIGN KEY (action_id)  REFERENCES actions (action_id)    ON DELETE CASCADE,
    CONSTRAINT ls_compound_fk FOREIGN KEY (compound_id) REFERENCES compounds (compound_id) ON DELETE CASCADE
);

CREATE TABLE tests_scenarios (
    scenario_id 			SERIAL PRIMARY KEY,
    scenario_name 			VARCHAR(64) NOT NULL,
    scenario_description 	TEXT        NOT NULL
);

CREATE TABLE steps (
    step_id                SERIAL PRIMARY KEY,
    outer_is_compound      BOOLEAN NOT NULL,
    outer_compound_id      INTEGER,
    outer_test_scenario_id INTEGER,
    inner_is_action        BOOLEAN NOT NULL,
    inner_action_id        INTEGER,
    inner_compound_id      INTEGER,
    step_order             INTEGER NOT NULL,
    CONSTRAINT step_outer_test_scenario_id_fk FOREIGN KEY (outer_test_scenario_id) REFERENCES tests_scenarios (scenario_id) ON DELETE CASCADE,
    CONSTRAINT step_outer_compound_id_fk FOREIGN KEY (outer_compound_id) REFERENCES compounds (compound_id) ON DELETE CASCADE,
    CONSTRAINT step_inner_compound_id_fk FOREIGN KEY (inner_compound_id) REFERENCES compounds (compound_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT step_inner_action_id_fk FOREIGN KEY (inner_action_id) REFERENCES actions (action_id) ON DELETE CASCADE
);

CREATE TABLE step_params (
    step_param_id SERIAL PRIMARY KEY,
    step_id       INTEGER      NOT NULL,
    key           VARCHAR(256) NOT NULL,
    value         VARCHAR(256) NOT NULL,
    CONSTRAINT step_param_step_id_fk FOREIGN KEY (step_id) REFERENCES steps (step_id) ON DELETE CASCADE
);

CREATE TABLE data_sets (
    data_set_id 		 SERIAL PRIMARY KEY,
    data_set_name 		 VARCHAR(32) UNIQUE NOT NULL,
    data_set_description TEXT
);

CREATE TABLE data_set_parameters (
    parameter_id	SERIAL PRIMARY KEY,
    data_set_id		INTEGER     NOT NULL,
    data_set_key	VARCHAR(64) NOT NULL,
    data_set_value  VARCHAR(64) NOT NULL,
    CONSTRAINT parameter_data_fk FOREIGN KEY (data_set_id) REFERENCES data_sets (data_set_id) ON DELETE CASCADE
);

CREATE TABLE projects (
    project_id 				SERIAL PRIMARY KEY,
    creator_id				INTEGER 		   NOT NULL,
    project_name 			VARCHAR(32) UNIQUE NOT NULL,
    project_website_link	VARCHAR(64) UNIQUE NOT NULL,
    project_active			BOOLEAN 		   NOT NULL,
    CONSTRAINT project_creator_fk  FOREIGN KEY (creator_id)  REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE statuses (
    status_id	SERIAL PRIMARY KEY,
    status_name	VARCHAR(32)	UNIQUE NOT NULL
);

CREATE TABLE test_cases
(
    test_case_id          SERIAL PRIMARY KEY,
    test_case_name        VARCHAR(64)  NOT NULL,
    test_case_description VARCHAR(256) NOT NULL,
    project_id            INTEGER      NOT NULL,
    author_id             INTEGER      NOT NULL,
    scenario_id           INTEGER      NOT NULL,
    CONSTRAINT tc_project_fk FOREIGN KEY (project_id) REFERENCES projects (project_id) ON DELETE CASCADE,
    CONSTRAINT tc_author_fk FOREIGN KEY (author_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT tc_ts_fk FOREIGN KEY (scenario_id) REFERENCES tests_scenarios (scenario_id) ON DELETE CASCADE
);

CREATE TABLE test_case_data_sets
(
    test_case_id INTEGER NOT NULL,
    data_set_id  INTEGER NOT NULL,
    CONSTRAINT tcw_testcase_fk FOREIGN KEY (test_case_id) REFERENCES test_cases (test_case_id),
    CONSTRAINT tcw_dataset_fk FOREIGN KEY (data_set_id) REFERENCES data_sets (data_set_id)
);

CREATE TABLE test_cases_watchers
(
    test_case_id INTEGER NOT NULL,
    user_id      INTEGER NOT NULL,
    CONSTRAINT tcw_testcase_fk FOREIGN KEY (test_case_id) REFERENCES test_cases (test_case_id),
    CONSTRAINT tcw_watcher_fk FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE test_case_result
(
    test_case_result_id     SERIAL PRIMARY KEY,
    user_id                 INTEGER,
    test_case_id            INTEGER,
    status_id               INTEGER,
    start_date              TIMESTAMPTZ NOT NULL,
    end_date                TIMESTAMPTZ,
    CONSTRAINT test_case_id_fk  FOREIGN KEY (test_case_id)  REFERENCES test_cases (test_case_id) ON DELETE SET NULL,
    CONSTRAINT user_id_fk 	    FOREIGN KEY (user_id)       REFERENCES users (user_id),
    CONSTRAINT status_id_fk     FOREIGN KEY (status_id) 	REFERENCES statuses (status_id)
);

CREATE TABLE IF NOT EXISTS action_result (
    action_result_id SERIAL PRIMARY KEY,
    test_case_result_id INTEGER NOT NULL,
    action_name VARCHAR(128) NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    status_id INTEGER NOT NULL,
    message TEXT,
    type VARCHAR(64) NOT NULL,
    CONSTRAINT test_case_result_id_fk  FOREIGN KEY (test_case_result_id)  REFERENCES test_case_result (test_case_result_id)    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS action_result_extra (
    action_result_extra_id SERIAL PRIMARY KEY,
    action_result_id INTEGER NOT NULL,
    key VARCHAR(256) NOT NULL,
    value VARCHAR(256) NOT NULL,
    CONSTRAINT action_result_id_fk  FOREIGN KEY (action_result_id)  REFERENCES action_result (action_result_id)    ON DELETE CASCADE
);
