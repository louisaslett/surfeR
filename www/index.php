<?php
include 'config.php';

# Check for required POST info
if(!isset($_POST['code'])) {
  echo "No R script provided.\n";
  exit();
}

# Establish user ID
if(!isset($_COOKIE['id'])) {
  $id = uniqid('', true);
  setcookie('id', $id, array('expires' =>  time()+3600, 'domain' => $DOMAIN, 'samesite' => 'Lax'));
} else {
  setcookie('id', $_COOKIE['id'], array('expires' =>  time()+3600, 'domain' => $DOMAIN, 'samesite' => 'Lax'));
  $id = $_COOKIE['id'];
}
# Clear out any existing files
system("rm /3/*-$id.html; rm /2/*-$id.R; rm /1/*-$id.R");

$t = time();
file_put_contents("/1/$t-$id.R", $_POST['code']);
header('Location: running.php', true, 302);
exit();
?>
