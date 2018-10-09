<?php
ini_set('display_errors', 'On');
include_once('DaisyScout.php');

$data = json_decode(file_get_contents("php://input"));
if(property_exists($data, 'eventID') && property_exists($data, 'teamID')) {
	echo json_encode(DaisyScout::daisybase()->getEventInterviewRecord($data->eventID, $data->teamID));
}

// TODO: Success/Error reporting
?>