<?php
$host="localhost";
$user="root";
$password="02070201";
$dbName="Web_Disk";
$con=new mysqli($host,$user,$password,$dbName);
$con->set_charset("utf8");
$Msg=$_GET['msg'];
if($con->connect_error){
  die("连接失败：".$con->connect_error);
}else {
  $sql=$Msg;
  $res=$con->query($sql);
  $data=$res->fetch_all();
  echo json_encode($data);

}
?>