<?php
ini_set('display_errors', 'On');
include_once('DaisyScout.php');

$data = json_decode(file_get_contents("php://input"));

echo json_encode(DaisyScout::daisybase()->getEventMatch($data->matchID, $data->eventID));
// TODO: Success/Error reporting
?>	