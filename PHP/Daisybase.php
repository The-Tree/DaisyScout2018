<?php

class Daisybase
{
    private $db;
    const EVENTS = 'Events';
	const MATCHRECORDS = 'MatchRecords';
	const INTERVIEWRECORDS = 'InterviewRecords';
	const TEAMS = 'Teams';
	const EVENTTEAMS = 'EventTeams';
	const EVENTSCHEDULE = 'EventSchedule';

    public function __construct($db) {
        $this->db = $db;
    }
    
	//EVENTS
    public function addEvent($name) {
        $add = $this->db->prepare(
            "INSERT INTO " . self::EVENTS . "(name) values(:name)");
            
        $add->bindValue(':name', $name, SQLITE3_TEXT);
        $add->execute();
        $add->close();
        
        return $this->db->changes() > 0;
    }
    
    public function getEvents() {
    
        $events = array();
        $query = "SELECT * FROM " . self::EVENTS;
        $result = $this->db->query($query);
        
        while ($res = $result->fetchArray(SQLITE3_ASSOC)) {
            array_push($events, $res);
        }
        
        return $events;
    }
	
	public function getEvent($eventID) {
		
		$event = array();
		$query = $this->db->prepare("SELECT * FROM " . self::EVENTS . " WHERE event_id=:id");
        $query->bindValue(':id', $eventID, SQLITE3_INTEGER);
		
		$result = $query->execute();
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			array_push($event, $res);
		}
		
		return $event[0];
	}
	
	public function getTeam($teamID) {
		
		$team = array();
		$query = $this->db->prepare("SELECT * FROM " . self::TEAMS . " WHERE team_num=:teamID");
        $query->bindValue(':teamID', $teamID, SQLITE3_INTEGER);
		
		$result = $query->execute();
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			array_push($team, $res);
		}
		
		return $team[0];
	}
	
	public function getEventTeamList($eventID) {
		
		$teams = array();
		$query = $this->db->prepare("SELECT * from " . self::EVENTTEAMS . " JOIN " . self::TEAMS . " on " . self::EVENTTEAMS . ".team_num = " . SELF::TEAMS . ".team_num WHERE event_id=:id");
        $query->bindValue(':id', $eventID, SQLITE3_INTEGER);
		
		$result = $query->execute();
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			array_push($teams, $res);
		}
		
		return $teams;
	}
	
	public function getEventTeamRecords($eventID, $teamID) {
		$records = array();
		$query = $this->db->prepare("SELECT * from " . self::MATCHRECORDS . " WHERE event_id=:eventID and team_num=:teamID");
        $query->bindValue(':eventID', $eventID, SQLITE3_INTEGER);
		$query->bindValue(':teamID', $teamID, SQLITE3_INTEGER);
		
		$result = $query->execute();
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			array_push($records, $res);
		}
		
		return $records;
	}
	
	public function getEventSchedule($eventID) {
		$event_schedule = array();
		$query = $this->db->prepare("SELECT * from " . self::EVENTSCHEDULE . " WHERE event_id=:eventID");
		$query->bindValue(':eventID', $eventID, SQLITE3_INTEGER);
	   
		$result = $query->execute();
	   
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			array_push($event_schedule, $res);
		}
		
		return $event_schedule;
	}
	
	public function getEventMatch($matchID, $eventID) {
		$records = array();
		$query = $this->db->prepare("SELECT * from " . self::EVENTSCHEDULE . " WHERE match_num=:matchID and event_id=:eventID");
        $query->bindValue(':matchID', $matchID, SQLITE3_INTEGER);
		$query->bindValue(':eventID', $eventID, SQLITE3_INTEGER);
		
		$result = $query->execute();
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			return $res;
		}
		
		//return $records[0];
	}
	
	public function editEventMatch($event_schedule_id,
									$event_id,
									$match_num,
									$red_alliance1,
									$red_alliance2,
									$red_alliance3,
									$red_score,
									$blue_score,
									$blue_alliance1,
									$blue_alliance2,
									$blue_alliance3) {
        $add = $this->db->prepare(
            "UPDATE " . self::EVENTSCHEDULE . " SET 
			event_id=:event_id, 
			match_num=:match_num, 
			red_alliance1=:red_alliance1,
			red_alliance2=:red_alliance2,
			red_alliance3=:red_alliance3,
			red_score=:red_score,
			blue_score=:blue_score,
			blue_alliance1=:blue_alliance1,
			blue_alliance2=:blue_alliance2,
			blue_alliance3=:blue_alliance3 
			WHERE event_schedule_id=:event_schedule_id");
            
		$add->bindValue(':event_schedule_id', $event_schedule_id, SQLITE3_INTEGER);
        $add->bindValue(':event_id', $event_id, SQLITE3_INTEGER);  
        $add->bindValue(':match_num', $match_num, SQLITE3_INTEGER);
        
        $add->bindValue(':red_alliance1', $red_alliance1, SQLITE3_TEXT);
		$add->bindValue(':red_alliance2', $red_alliance2, SQLITE3_TEXT);
		$add->bindValue(':red_alliance3', $red_alliance3, SQLITE3_TEXT);
		$add->bindValue(':red_score', $red_score, SQLITE3_INTEGER);
		$add->bindValue(':blue_score', $blue_score, SQLITE3_INTEGER);
		$add->bindValue(':blue_alliance1', $blue_alliance1, SQLITE3_TEXT);
		$add->bindValue(':blue_alliance2', $blue_alliance2, SQLITE3_TEXT);
		$add->bindValue(':blue_alliance3', $blue_alliance3, SQLITE3_TEXT);
		
        $add->execute();
        $add->close();
        
        return $this->db->changes() > 0;
    }
	
	//MATCH RECORDS
	public function addMatchRecord(	$event_id,
									$scout_name,
									$team_num,
									$alliance_color,
									$match_num,
									$auton_midline,
									$auton_switch,
									$auton_scale,
									$auton_vault,
									$auton_collected,
									$alliance_switch,
									$enemy_switch,
									$scale,
									$collected,
									$vault,
									$force_used,
									$force_when,
									$boost_used,
									$boost_when,
									$levitate_used,
									$hang,
									$park,
									$partners_lifted,
									$end_score,
									$penalty_points,
									$comments) {
        $add = $this->db->prepare(
            "INSERT INTO " . self::MATCHRECORDS . " (event_id, scout_name, team_num, alliance_color, match_num, auton_midline, auton_switch,
														auton_scale, auton_vault, auton_collected, alliance_switch, enemy_switch, scale, collected, vault,
														force_used, force_when, boost_used, boost_when, levitate_used, hang, park, partners_lifted, end_score, penalty_points, comments) 
													values(:event_id, :scout_name, :team_num, :alliance_color, :match_num, :auton_midline, :auton_switch,
														:auton_scale, :auton_vault, :auton_collected, :alliance_switch, :enemy_switch, :scale, :collected,
														:vault, :force_used, :force_when, :boost_used, :boost_when, :levitate_used, :hang, :park, :partners_lifted, :end_score,
														:penalty_points, :comments)");
            
        $add->bindValue(':event_id', $event_id, SQLITE3_INTEGER);  
		$add->bindValue(':scout_name', $scout_name, SQLITE3_TEXT);
        $add->bindValue(':team_num', $team_num, SQLITE3_INTEGER);  
		$add->bindValue(':alliance_color', $alliance_color, SQLITE3_TEXT);
        $add->bindValue(':match_num', $match_num, SQLITE3_INTEGER);
        
        $add->bindValue(':auton_midline', $auton_midline, SQLITE3_TEXT);
		$add->bindValue(':auton_switch', $auton_switch, SQLITE3_INTEGER);
		$add->bindValue(':auton_scale', $auton_scale, SQLITE3_INTEGER);
		$add->bindValue(':auton_vault', $auton_vault, SQLITE3_INTEGER);
		$add->bindValue(':auton_collected', $auton_collected, SQLITE3_INTEGER);
		
		$add->bindValue(':alliance_switch', $alliance_switch, SQLITE3_INTEGER);
		$add->bindValue(':enemy_switch', $enemy_switch, SQLITE3_INTEGER);
		$add->bindValue(':scale', $scale, SQLITE3_INTEGER);
		$add->bindValue(':collected', $collected, SQLITE3_INTEGER);
		$add->bindValue(':vault', $vault, SQLITE3_INTEGER);
	
		$add->bindValue(':force_used', $force_used, SQLITE3_INTEGER);
		$add->bindValue(':force_when', $force_when, SQLITE3_INTEGER);
		$add->bindValue(':boost_used', $boost_used, SQLITE3_INTEGER);
		$add->bindValue(':boost_when', $boost_when, SQLITE3_INTEGER);
		$add->bindValue(':levitate_used', $levitate_used, SQLITE3_INTEGER);

		$add->bindValue(':hang', $hang, SQLITE3_TEXT);
		$add->bindValue(':park', $park, SQLITE3_TEXT);
		$add->bindValue(':partners_lifted', $partners_lifted, SQLITE3_INTEGER);
		$add->bindValue(':end_score', $end_score, SQLITE3_INTEGER);
		$add->bindValue(':penalty_points', $penalty_points, SQLITE3_INTEGER);
		$add->bindValue(':comments', $comments, SQLITE3_TEXT);
		
        $add->execute();
        $add->close();
        
        return $this->db->changes() > 0;
	}
	
	public function editMatchRecord($match_id,
									$event_id,
									$scout_name,
									$team_num,
									$alliance_color,
									$match_num,
									$auton_midline,
									$auton_switch,
									$auton_scale,
									$auton_vault,
									$auton_collected,
									$alliance_switch,
									$enemy_switch,
									$scale,
									$collected,
									$vault,
									$force_used,
									$force_when,
									$boost_used,
									$boost_when,
									$levitate_used,
									$park,
									$partners_lifted,
									$hang,
									$end_score,
									$penalty_points,
									$comments) {
        $add = $this->db->prepare(
            "UPDATE " . self::MATCHRECORDS . " SET 
			event_id=:event_id, 
			scout_name=:scout_name, 
			team_num=:team_num,
			alliance_color=:alliance_color,
			match_num=:match_num, 
			auton_midline=:auton_midline,
			auton_switch=:auton_switch,
			auton_scale=:auton_scale,
			auton_vault=:auton_vault,
			auton_collected=:auton_collected,
			alliance_switch=:alliance_switch,
			enemy_switch=:enemy_switch,
			scale=:scale,
			collected=:collected,
			vault=:vault,
			force_used=:force_used,
			force_when=:force_when,
			boost_used=:boost_used,
			boost_when=:boost_when,
			levitate_used=:levitate_used,
			hang=:hang,
			park=:park,
			partners_lifted=:partners_lifted,
			end_score=:end_score,
			penalty_points=:penalty_points,
			comments=:comments
			WHERE match_id=:match_id");
            
		$add->bindValue(':match_id', $match_id, SQLITE3_INTEGER);
        $add->bindValue(':event_id', $event_id, SQLITE3_INTEGER);  
		$add->bindValue(':scout_name', $scout_name, SQLITE3_TEXT);
        $add->bindValue(':team_num', $team_num, SQLITE3_INTEGER);  
		$add->bindValue(':alliance_color', $alliance_color, SQLITE3_TEXT);
        $add->bindValue(':match_num', $match_num, SQLITE3_INTEGER);
        
        $add->bindValue(':auton_midline', $auton_midline, SQLITE3_TEXT);
		$add->bindValue(':auton_switch', $auton_switch, SQLITE3_INTEGER);
		$add->bindValue(':auton_scale', $auton_scale, SQLITE3_INTEGER);
		$add->bindValue(':auton_vault', $auton_vault, SQLITE3_INTEGER);
		$add->bindValue(':auton_collected', $auton_collected, SQLITE3_INTEGER);
		
		$add->bindValue(':alliance_switch', $alliance_switch, SQLITE3_INTEGER);
		$add->bindValue(':enemy_switch', $enemy_switch, SQLITE3_INTEGER);
		$add->bindValue(':scale', $scale, SQLITE3_INTEGER);
		$add->bindValue(':collected', $collected, SQLITE3_INTEGER);
		$add->bindValue(':vault', $vault, SQLITE3_INTEGER);
	
		$add->bindValue(':force_used', $force_used, SQLITE3_INTEGER);
		$add->bindValue(':force_when', $force_when, SQLITE3_INTEGER);
		$add->bindValue(':boost_used', $boost_used, SQLITE3_INTEGER);
		$add->bindValue(':boost_when', $boost_when, SQLITE3_INTEGER);
		$add->bindValue(':levitate_used', $levitate_used, SQLITE3_INTEGER);

		$add->bindValue(':hang', $hang, SQLITE3_TEXT);
		$add->bindValue(':park', $park, SQLITE3_TEXT);
		$add->bindValue(':partners_lifted', $partners_lifted, SQLITE3_INTEGER);
		$add->bindValue(':end_score', $end_score, SQLITE3_INTEGER);
		$add->bindValue(':penalty_points', $penalty_points, SQLITE3_INTEGER);
		$add->bindValue(':comments', $comments, SQLITE3_TEXT);
		
        $add->execute();
        $add->close();
        
        return $this->db->changes() > 0;
    }
	
	public function getMatchRecords() {
		
		$matchRecords = array();
		$query = "SELECT * FROM " . self::MATCHRECORDS;
		$result = $this->db->query($query);
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			array_push($matchRecords, $res);
		}
		
		return $matchRecords;
	}
	
	public function getEventMatchRecords($eventID) {
		$records = array();
		$query = $this->db->prepare("SELECT * from " . self::MATCHRECORDS . " WHERE event_id=:eventID");
        $query->bindValue(':eventID', $eventID, SQLITE3_INTEGER);
		
		$result = $query->execute();
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			array_push($records, $res);
		}
		
		return $records;
	}
	
	public function getMatchRecord($matchID) {
		$records = array();
		$query = $this->db->prepare("SELECT * from " . self::MATCHRECORDS . " WHERE match_id=:matchID");
        $query->bindValue(':matchID', $matchID, SQLITE3_INTEGER);
		
		$result = $query->execute();
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			return $res;
		}
		
		//return $records[0];
	}

	//INTERVIEW RECORDS
	public function addInterviewRecord($event_id, $scout_name, $team_num, $base_width, $base_length, $base_height, $drive_motors, $wheel_num, $drive_system, $wheel_type, $speed, $shooter_type, $capacity, $ball_rof, $primary_goal, $gear_ability, $gear_loading, $scale_ability, $auton_mobility, $auton_autoload, $auton_ball, $auton_num_gears, $auton_description) {
        $add = $this->db->prepare("INSERT INTO " . self::INTERVIEWRECORDS . "(event_id, scout_name, team_num, base_width, base_length, base_height, drive_motors, wheel_num, drive_system, wheel_type, speed, shooter_type, capacity, ball_rof, primary_goal, gear_ability, gear_loading, scale_ability, auton_mobility, auton_autoload, auton_ball, auton_num_gears, auton_description) values(:event_id, :scout_name, :team_num, :base_width, :base_length, :base_height, :drive_motors, :wheel_num, :drive_system, :wheel_type, :speed, :shooter_type, :capacity, :ball_rof, :primary_goal, :gear_ability, :gear_loading, :scale_ability, :auton_mobility, :auton_autoload, :auton_ball, :auton_num_gears, :auton_description)");
            
        $add->bindValue(':event_id', $event_id, SQLITE3_INTEGER);
        $add->bindValue(':scout_name', $scout_name, SQLITE3_TEXT);
        $add->bindValue(':team_num', $team_num, SQLITE3_INTEGER);
		
        $add->bindValue(':base_width', $base_width, SQLITE3_INTEGER);
        $add->bindValue(':base_length', $base_length, SQLITE3_INTEGER);
        $add->bindValue(':base_height', $base_height, SQLITE3_INTEGER);
        $add->bindValue(':drive_motors', $drive_motors, SQLITE3_TEXT);
        $add->bindValue(':wheel_num', $wheel_num, SQLITE3_INTEGER);
        $add->bindValue(':drive_system', $drive_system, SQLITE3_TEXT);
        $add->bindValue(':wheel_type', $wheel_type, SQLITE3_TEXT);        
    
        $add->bindValue(':speed', $speed, SQLITE3_INTEGER);
		
        $add->bindValue(':shooter_type', $shooter_type, SQLITE3_TEXT);
        $add->bindValue(':capacity', $capacity, SQLITE3_INTEGER);
		$add->bindValue(':ball_rof', $ball_rof, SQLITE3_INTEGER);
		$add->bindValue(':primary_goal', $primary_goal, SQLITE3_TEXT);
		
		$add->bindValue(':gear_ability', $gear_ability, SQLITE3_TEXT);
		$add->bindValue(':gear_loading', $gear_loading, SQLITE3_TEXT);
        $add->bindValue(':scale_ability', $scale_ability, SQLITE3_TEXT);
		
		$add->bindValue(':auton_mobility', $auton_mobility, SQLITE3_TEXT);
		$add->bindValue(':auton_autoload', $auton_autoload, SQLITE3_TEXT);
		$add->bindValue(':auton_ball', $auton_ball, SQLITE3_TEXT);
		$add->bindValue(':auton_num_gears', $auton_num_gears, SQLITE3_INTEGER);
		$add->bindValue(':auton_description', $auton_description, SQLITE3_TEXT);
		
        $add->execute();
        $add->close();
        
        return $this->db->changes() > 0;
    }
	
	public function getInterviewRecords($eventID) {
		
		$interviewRecords = array();
		$query = $this->db->prepare("SELECT * from " . self::INTERVIEWRECORDS . " WHERE event_id=:eventID");
        $query->bindValue(':eventID', $eventID, SQLITE3_INTEGER);
		
		$result = $query->execute();
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			array_push($interviewRecords, $res);
		}
		
		return $interviewRecords;
	}
	
	public function getEventInterviewRecord($eventID, $teamID) {
		$records = array();
		$query = $this->db->prepare("SELECT * from " . self::INTERVIEWRECORDS . " WHERE event_id=:eventID and team_num=:teamID");
        $query->bindValue(':eventID', $eventID, SQLITE3_INTEGER);
		$query->bindValue(':teamID', $teamID, SQLITE3_INTEGER);
		
		$result = $query->execute();
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			array_push($records, $res);
		}
		
		return $records[0];
	}
	
	public function getInterviewRecord($interview_id) {
		$records = array();
		$query = $this->db->prepare("SELECT * from " . self::INTERVIEWRECORDS . " WHERE interview_id=:interview_id");
        $query->bindValue(':interview_id', $interview_id, SQLITE3_INTEGER);
		
		$result = $query->execute();
		
		while($res = $result->fetchArray(SQLITE3_ASSOC)) {
			array_push($records, $res);
		}
		
		return $records[0];
	}
	
	public function editInterviewRecord($event_id, $scout_name, $team_num, $base_width, $base_length, $base_height, $drive_motors, $wheel_num, $drive_system, $wheel_type, $speed, $shooter_type, $capacity, $ball_rof, $primary_goal, $gear_ability, $gear_loading, $scale_ability, $auton_mobility, $auton_autoload, $auton_ball, $auton_num_gears, $auton_description) 
	{
		$add = $this->db->prepare("UPDATE " . self::INTERVIEWRECORDS . " SET 
		event_id=:event_id, 
		scout_name=:scout_name, 
		team_num=:team_num, 
		base_width=:base_width, 
		base_length=:base_length, 
		base_height=:base_height, 
		drive_motors=:drive_motors, 
		wheel_num=:wheel_num, 
		drive_system=:drive_system,	
		wheel_type=:wheel_type, 
		speed=:speed, 
		shooter_type=:shooter_type, 
		capacity=:capacity, 
		ball_rof=:ball_rof,
		primary_goal=:primary_goal, 
		gear_ability=:gear_ability, 
		gear_loading=:gear_loading,
		scale_ability=:scale_ability,
		auton_mobility=:auton_mobility,
		auton_autoload=:auton_autoload,
		auton_ball=:auton_ball,
		auton_num_gears=:auton_num_gears,
		auton_description=:auton_description WHERE interview_id=:interview_id
		");
		
		$add->bindValue(':event_id', $event_id, SQLITE3_INTEGER);
        $add->bindValue(':scout_name', $scout_name, SQLITE3_TEXT);
        $add->bindValue(':team_num', $team_num, SQLITE3_INTEGER);
		
        $add->bindValue(':base_width', $base_width, SQLITE3_INTEGER);
        $add->bindValue(':base_length', $base_length, SQLITE3_INTEGER);
        $add->bindValue(':base_height', $base_height, SQLITE3_INTEGER);
        $add->bindValue(':drive_motors', $drive_motors, SQLITE3_TEXT);
        $add->bindValue(':wheel_num', $wheel_num, SQLITE3_INTEGER);
        $add->bindValue(':drive_system', $drive_system, SQLITE3_TEXT);
        $add->bindValue(':wheel_type', $wheel_type, SQLITE3_TEXT);        
    
        $add->bindValue(':speed', $speed, SQLITE3_INTEGER);
		
        $add->bindValue(':shooter_type', $shooter_type, SQLITE3_TEXT);
        $add->bindValue(':capacity', $capacity, SQLITE3_INTEGER);
		$add->bindValue(':ball_rof', $ball_rof, SQLITE3_INTEGER);
		$add->bindValue(':primary_goal', $primary_goal, SQLITE3_TEXT);
		
		$add->bindValue(':gear_ability', $gear_ability, SQLITE3_TEXT);
		$add->bindValue(':gear_loading', $gear_loading, SQLITE3_TEXT);
        $add->bindValue(':scale_ability', $scale_ability, SQLITE3_TEXT);
		
		$add->bindValue(':auton_mobility', $auton_mobility, SQLITE3_TEXT);
		$add->bindValue(':auton_autoload', $auton_autoload, SQLITE3_TEXT);
		$add->bindValue(':auton_ball', $auton_ball, SQLITE3_TEXT);
		$add->bindValue(':auton_num_gears', $auton_num_gears, SQLITE3_INTEGER);
		$add->bindValue(':auton_description', $auton_description, SQLITE3_TEXT);
		
		$add->execute();
        $add->close();
        
        return $this->db->changes() > 0;
    }
}

?>