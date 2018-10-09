<?php
ini_set('display_errors', 'On');
include_once('DaisyScout.php');

echo json_encode(DaisyScout::daisybase()->getEvents());
// TODO: Success/Error reporting
?>