CREATE TABLE Events(
    event_id INTEGER PRIMARY KEY ASC,
    name TEXT UNIQUE NOT NULL,
	event_code TEXT UNIQUE NOT NULL
);
----------------------------------------------------------------------------------------------------------------------
INSERT INTO Events (event_id, name, event_code) VALUES (0, "Hatboro-Horsham", "PAHAT");
INSERT INTO Events (event_id, name, event_code) VALUES (1, "Westtown", "PAWCH");
INSERT INTO Events (event_id, name, event_code) VALUES (2, "MAR Championship", "MRCMP");

CREATE TABLE Teams(
    team_num INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
	locality TEXT,
	region TEXT,
	country TEXT
);

INSERT INTO Teams (team_num, name, locality, region, country) VALUES (25, "Raider Robotix", "North Brunswick", "NJ", "USA");
INSERT INTO Teams (team_num, name, locality, region, country) VALUES (341, "Miss Daisy", "Ambler", "PA", "USA");

CREATE TABLE EventTeams(
	event_id INTEGER,
	team_num INTEGER,
	
	FOREIGN KEY(event_id) REFERENCES Events(event_id),
	FOREIGN KEY(team_num) REFERENCES Teams(team_num)
);

CREATE TABLE EventSchedule(
	event_schedule_id INTEGER PRIMARY KEY ASC,
	event_id INTEGER,
	match_num INTEGER,
	red_alliance1 TEXT, --this is text bc blue api returns keys like "frc###" rather than "###"
	red_alliance2 TEXT,
	red_alliance3 TEXT,
	red_score INTEGER,
	blue_score INTEGER,
	blue_alliance1 TEXT, --this is text bc blue api returns keys like "frc###" rather than "###"
	blue_alliance2 TEXT,
	blue_alliance3 TEXT
);

INSERT INTO EventTeams (event_id, team_num) VALUES (0, 25);
INSERT INTO EventTeams (event_id, team_num) VALUES (0, 341);
INSERT INTO EventTeams (event_id, team_num) VALUES (1, 341);
INSERT INTO EventTeams (event_id, team_num) VALUES (2, 341);

CREATE TABLE InterviewRecords(
 
	--basic team info
	interview_id INTEGER PRIMARY KEY ASC,
	event_id INTEGER,
	scout_name TEXT,
	team_num INTEGER,

	--robot specs
	drive_system TEXT,
	base_width INTEGER,
	base_length INTEGER,
	base_height INTEGER,
	drive_motors TEXT,
	motors_num INTEGER,
	wheel_type TEXT,
	wheel_num INTEGER,
	speed INTEGER,

	box_manip TEXT,
	hang_ability TEXT,

	FOREIGN KEY(event_id) REFERENCES Events(event_id),
	FOREIGN KEY(team_num) REFERENCES Teams(team_num)
);

CREATE TABLE MatchRecords(

    --basic match/robot info
	match_id INTEGER PRIMARY KEY ASC,
	event_id INTEGER,
	scout_name TEXT,
	team_num INTEGER,
	alliance_color TEXT,
	match_num INTEGER,
	
	--autonomous mode
	auton_midline TEXT,
	auton_switch INTEGER,
	auton_scale INTEGER,
	auton_vault INTEGER,
	auton_collected INTEGER,

    -- Teleoperated mode
	alliance_switch INTEGER,
	enemy_switch INTEGER,
	scale INTEGER,
	collected INTEGER,
	vault INTEGER,
	
	force_used INTEGER,
	force_when INTEGER,
	boost_used INTEGER,
	boost_when INTEGER,
	levitate_used INTEGER,

	hang TEXT,
	park TEXT,
	partners_lifted INTEGER,
	end_score INTEGER,
	penalty_points INTEGER,
	comments TEXT,
	
	FOREIGN KEY(event_id) REFERENCES Events(event_id),
	FOREIGN KEY(team_num) REFERENCES Teams(team_num)
);