<?php
$mc=new Memcached();
$mc->addServer("localhost",8080);
$user_id=_POST[id];
$mc->set("UserName",$user_id,3600);
?>