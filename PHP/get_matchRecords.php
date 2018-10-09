<?php
ini_set('display_errors', 'On');
include_once('DaisyScout.php');

echo json_encode(DaisyScout::daisybase()->getMatchRecords());
// TODO: Success/Error reporting
?>