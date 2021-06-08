<?php
include 'config.php';

if(!isset($_GET['uuid'])) {
  echo "No UUID provided.\n";
  exit();
}
if(strlen($_GET['uuid']) != 36) {
  echo "Incorrect UUID length.\n";
  exit();
}
$uuid = hash("sha256", $_GET['uuid']);

if(strlen($DOMAIN) > 0) {
  if(!isset($_COOKIE['uuid'])) {
    echo "Sorry, cross-site request denied.";
    exit();
  }
}
if(isset($_COOKIE['uuid']) && $uuid != $_COOKIE['uuid']) {
  echo "UUID mismatch between Javascript and browser.\n";
  exit();
}
setcookie('uuid', $uuid, array('expires' =>  time()+3600, 'domain' => $DOMAIN, 'samesite' => 'Lax'));

if(count(glob("/3/*-$uuid.html"))>0) {
  echo file_get_contents(glob("/3/*-$uuid.html")[0]);
  system("rm /3/*-$uuid.html");
  exit();
}

if(array_key_exists('i', $_GET)) {
  $i = $_GET['i']+1;
} else {
  $i = 0;
}
if(count(glob("/2/*-$uuid.R"))>0) {
  header('Refresh:1; url=running.php?i='.urlencode($i).'&uuid='.urlencode($_GET['uuid']));
  $runtime = time()-filemtime(glob("/2/*-$uuid.R")[0]);
  echo "Your code is currently executing!  Running for $runtime seconds ... (max allowed $MAXRUNTIME)";
  exit();
}
if(count(glob("/1/*-$uuid.R"))>0) {
  header('Refresh:1; url=running.php?i='.urlencode($i).'&uuid='.urlencode($_GET['uuid']));
  $d = scandir("/1");
  array_splice($d, 0, 2);
  $pos = array_keys(array_filter($d, fn($d2) => str_contains($d2,"-$uuid.R")))[0]+1;
  $tot = count(glob("/1/*-$uuid.R"));
  echo "Your code is in the queue waiting to run, please wait!  Currently in position $pos of $tot ... (you have been in the queue for $i seconds)";
  exit();
}
?>
Sorry, request not recognised.  Please try again.
