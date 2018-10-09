<?php
ini_set('display_errors', 'On');
include_once('DaisyScout.php');

//$data = json_decode(file_get_contents("php://input"));

echo json_encode(DaisyScout::daisybase()->removeMatch(
null->match_id, 
null->event_id,
null->team_num,
null->match_num,
null->scout_name,
null->auton_reach,
null->auton_cross,
null->auton_midline,
null->auton_scored_high,
null->auton_shot_high,
null->auton_scored_low,
null->auton_shot_low,
null->bot_type,
null->defensive_ability,
null->portcullis_crossings,
null->chevaldefrise_crossings,
null->moat_crossings,
null->ramparts_crossings,
null->drawbridge_crossings,
null->sallyport_crossings,
null->roughterrain_crossings,
null->rockwall_crossings,
null->lowbar_crossings,
null->shooter_range,
null->primary_goal,
null->high_boulders_scored,
null->high_boulders_shot,
null->low_boulders_scored,
null->low_boulders_shot,
null->balls_acquired,
null->challenge,
null->scaled,
null->comments));

?>