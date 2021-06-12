<?php
include 'config.php';

# Check for required POST info
if(!isset($_GET['block'])) {
  echo "No block identifier provided.\n";
  exit();
}
if(!(strlen($_GET['block']) == 3 && is_numeric($_GET['block']) && is_int($_GET['block']+0))) {
  echo "Invalid block identifier provided.\n";
  exit();
}
if(!isset($_GET['uuid'])) {
  echo "No UUID provided.\n";
  exit();
}
if(strlen($_GET['uuid']) != 36) {
  echo "Incorrect UUID length.\n";
  exit();
}

# UUID + auth if needed
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
$uuid = hash("sha256", $_GET['uuid'].$_GET['sess']);

# Other vars
$blockid = $_GET['block'];

# Check if execution completed
if(count(glob("/3/*-$blockid-$uuid.html"))>0) {
  echo file_get_contents(glob("/3/*-$blockid-$uuid.html")[0]);
  system("rm /3/*-$blockid-$uuid.html");
  exit();
}

# Otherwise, discover if we are queuing or running
if(array_key_exists('strt', $_GET)) {
  $strt = $_GET['strt'];
} else {
  $strt = time();
}
if(count(glob("/2/*-$blockid-$uuid.R"))>0) {
  header('Refresh:1; url=running.php?strt='.urlencode($strt).'&block='.$blockid.'&uuid='.urlencode($_GET['uuid']).'&sess='.urlencode($_GET['sess']));
  $runtime = time()-filemtime(glob("/2/*-$blockid-$uuid.R")[0]);
  echo "Your code is currently executing!  Running for $runtime seconds ... (max allowed $MAXRUNTIME)";
  # Don't need to do an unblock call to pipe as surfeR.sh only moves from queue
  # to running state, so if already running just need to wait for completion
  exit();
}
if(count(glob("/1/persistent/*-$blockid-$uuid.R"))+count(glob("/1/ephemeral/*-$blockid-$uuid.R"))>0) {
  $d = array_merge(scandir("/1/persistent"),scandir("/1/ephemeral"));
  sort($d);
  array_splice($d, 0, 4);
  $pos = array_keys(array_filter($d, fn($d2) => str_contains($d2,"-$blockid-$uuid.R")))[0]+1;
  $tot = count($d);
  $runtime = time()-$strt;
  header('Refresh:'.$pos.'; url=running.php?strt='.urlencode($strt).'&block='.$blockid.'&uuid='.urlencode($_GET['uuid']).'&sess='.urlencode($_GET['sess']));
  echo "<script>var secs = $runtime; setInterval(updT, 1000); function updT() { ++secs; document.getElementById('secs').innerHTML = secs+'.'; }</script>Your code is in the queue waiting to run, please wait!  Currently in position $pos of $tot ... (you have been in the queue for <span id='secs'>$runtime</span> seconds)";
  system('echo "." > /1/pause &'); # Ensure run loop unblocked
  exit();
}
?>
Sorry, request not recognised.  Please try again.
