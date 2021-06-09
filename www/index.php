<?php
include 'config.php';

# Check for required POST info
if(!isset($_POST['code'])) {
  echo "No R script provided.\n";
  exit();
}
if(!isset($_POST['block'])) {
  echo "No block identifier provided.\n";
  exit();
}
if(!(strlen($_POST['block']) == 3 && is_numeric($_POST['block']) && is_int($_POST['block']+0))) {
  echo "Invalid block identifier provided.\n";
  exit();
}
if(!isset($_POST['uuid'])) {
  echo "No UUID provided.\n";
  exit();
}
if(strlen($_POST['uuid']) != 36) {
  echo "Incorrect UUID length.\n";
  exit();
}

# UUID
$uuid = hash("sha256", $_POST['uuid']);
setcookie('uuid', $uuid, array('expires' =>  time()+3600, 'domain' => $DOMAIN, 'samesite' => 'Lax'));
$uuid = hash("sha256", $_POST['uuid'].$_POST['sess']);

# Other vars
$blockid = $_POST['block'];
$path = (isset($_POST['persistent']) ? '/1/persistent' : '/1/ephemeral');

# Clear out any existing files for this block and session
system("rm /1/*-$blockid-$uuid.html; rm /2/*-$blockid-$uuid.R; rm /3/*-$blockid-$uuid.R");

# Write code to be processed
$t = time();
file_put_contents("$path/$t-$blockid-$uuid.R", $_POST['code']);

# Redirect to await result
header('Location: running.php?block='.$blockid.'&uuid='.urlencode($_POST['uuid']).'&sess='.urlencode($_POST['sess']),
       true, 302);
exit();
?>
