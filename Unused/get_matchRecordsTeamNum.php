<?php
ini_set('display_errors', 'On');
include_once('DaisyScout.php');

$data = json_decode(file_get_contents("php://input"));

if($data->tNum) {
	echo json_encode(DaisyScout::daisybase()->getMatchRecordsTeamNum($data->tNum));
}

// TODO: Success/Error reporting
?>