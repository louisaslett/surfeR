<?php
include 'config.php';

# Check for required POST info
if(!isset($_POST['code'])) {
  echo "No R script provided.\n";
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
$uuid = hash("sha256", $_POST['uuid']);

# Establish user ID
if(!isset($_COOKIE['uuid'])) {
  $id = $uuid;
  setcookie('uuid', $id, array('expires' =>  time()+3600, 'domain' => $DOMAIN, 'samesite' => 'Lax'));
} else {
  setcookie('uuid', $_COOKIE['uuid'], array('expires' =>  time()+3600, 'domain' => $DOMAIN, 'samesite' => 'Lax'));
  if($uuid != $_COOKIE['uuid']) {
    echo "UUID mismatch between Javascript and browser.\n";
    exit();
  }
}
# Clear out any existing files
system("rm /1/*-$uuid.html; rm /2/*-$uuid.R; rm /3/*-$uuid.R");

$t = time();
file_put_contents("/1/$t-$uuid.R", $_POST['code']);
header('Location: running.php?uuid='.urlencode($_POST['uuid']), true, 302);
exit();
?>
