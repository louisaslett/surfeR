<?php
include 'config.php'

if(!isset($_COOKIE['id'])) {
  echo "Sorry, request not recognised.  Please try again.";
  exit();
}
setcookie('id', $_COOKIE['id'], array('expires' =>  time()+3600, 'domain' => $DOMAIN, 'samesite' => 'Lax'));
$id = $_COOKIE['id'];

if(count(glob("/3/*-$id.html"))>0) {
  echo file_get_contents(glob("/3/*-$id.html")[0]);
  system("rm /3/*-$id.html");
  exit();
}

if(array_key_exists('i', $_GET)) {
  $i = $_GET['i']+1;
} else {
  $i = 0;
}
if(count(glob("/2/*-$id.R"))>0) {
  header("Refresh:1; url=running.php?i={$i}");
  $runtime = time()-filemtime(glob("/2/*-$id.R")[0]);
  echo "Your code is currently executing!  Running for $runtime seconds ... (max allowed $MAXRUNTIME)";
  exit();
}
if(count(glob("/1/*-$id.R"))>0) {
  header("Refresh:1; url=running.php?i={$i}");
  $d = scandir("/1");
  array_splice($d, 0, 2);
  $pos = array_keys(array_filter($d, fn($d2) => str_contains($d2,"-$id.R")))[0]+1;
  $tot = count(glob("/1/*-$id.R"));
  echo "Your code is in the queue waiting to run, please wait!  Currently in position $pos of $tot ... (you have been in the queue for $i seconds)";
  exit();
}
?>
Sorry, request not recognised.  Please try again.
