<?php
ini_set('display_errors', 'On');
include_once('DaisyScout.php');

$data = json_decode(file_get_contents("php://input"));

echo json_encode(DaisyScout::daisybase()->editEventMatch(
$data->event_schedule_id,
$data->event_id,
$data->match_num,
$data->red_alliance1,
$data->red_alliance2, 
$data->red_alliance3,
$data->red_score,
$data->blue_score,
$data->blue_alliance1,
$data->blue_alliance2,
$data->blue_alliance3
));

?>