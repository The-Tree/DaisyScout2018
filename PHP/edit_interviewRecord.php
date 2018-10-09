<?php
ini_set('display_errors', 'On');
include_once('DaisyScout.php');

$data = json_decode(file_get_contents("php://input"));

echo json_encode(DaisyScout::daisybase()->editInterviewRecord(
$data->event_id,
$data->scout_name,
$data->team_num,
$data->base_width,
$data->base_length,
$data->base_height,
$data->drive_motors,
$data->wheel_num,
$data->drive_system,
$data->wheel_type,
$data->speed,
$data->shooter_type,
$data->capacity,
$data->ball_rof,
$data->primary_goal,
$data->gear_ability,
$data->gear_loading, 
$data->scale_ability,
$data->auton_mobility,
$data->auton_autoload,
$data->auton_ball,
$data->auton_num_gears,
$data->auton_description));

?>