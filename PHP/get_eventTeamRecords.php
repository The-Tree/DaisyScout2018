<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
include_once('DaisyScout.php');

$data = json_decode(file_get_contents("php://input"));

if(property_exists($data, 'eventID') && property_exists($data, 'teamID')) {
	echo json_encode(DaisyScout::daisybase()->getEventTeamRecords($data->eventID, $data->teamID));
}

// TODO: Success/Error reporting
?>