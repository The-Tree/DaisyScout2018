<?php
ini_set('display_errors', 'On');
include_once('DaisyScout.php');

$data = json_decode(file_get_contents("php://input"));

if ($data->name) {
    echo json_encode(DaisyScout::daisybase()->addEvent($data->red1,
$data->red2,
$data->red3,
$data->blue1,
$data->blue2,
$data->blue3
	));
}

?>