<?php
$mc=new Memcached();
$mc->addServer("localhost",8080);
$user_id=_GET[id];
$user_info=$mc->get("user_$user_id");
if(!$user_info){
    $mysql_conn=mysqli_connect("localhost", "user", "password", "database");
    $sql="SELECT * FROM users WHERE UserName=$user_id";
    $result=mysqli_query($mysql_conn,$sql);
    $user_info=mysqli_fetch_assoc($result);
    mysqli_close($mysql_conn);
    $mc->set("user_$user_id",$user_info,3600);
}
echo "UserName: ".$user_info['name'];
?>