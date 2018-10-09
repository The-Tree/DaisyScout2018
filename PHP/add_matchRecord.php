<?php
ini_set('display_errors', 'On');
include_once('DaisyScout.php');

$data = json_decode(file_get_contents("php://input"));

echo json_encode(DaisyScout::daisybase()->addMatchRecord(
$data->event_id,
$data->scout_name,
$data->team_num,
$data->alliance_color,
$data->match_num,
$data->auton_midline,
$data->auton_switch,
$data->auton_scale,
$data->auton_vault,
$data->auton_collected,
$data->alliance_switch,
$data->enemy_switch,
$data->scale,
$data->collected,
$data->vault,
$data->force_used,
$data->force_when,
$data->boost_used,
$data->boost_when,
$data->levitate_used,
$data->hang,
$data->park,
$data->partners_lifted,
$data->end_score,
$data->penalty_points,
$data->comments
));

?>