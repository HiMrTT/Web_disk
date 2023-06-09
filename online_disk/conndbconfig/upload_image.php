<?php
$targetDir="C:/Windows/System32/Apache24/htdocs/image/";
if(!is_dir($targetDir)){
    mkdir($targetDir,0777,true);
}
$targetFile=$targetDir.basename($_FILES["avatar"]["name"]);
$acc=$_POST["msg"];
$uploadOK=1;
$imageFileType=strtolower(pathinfo($targetFile,PATHINFO_EXTENSION));
if($imageFileType!="jpg"&&$imageFileType!="png"&&$imageFileType!="jpeg"&&$imageFileType!="gif"){
    echo "Only support .jpg/.png/.jpeg/.gif picture";
    $uploadOK=0;
}
if(file_exists($targetFile)){
    $host="localhost";
    $user="root";
    $password="02070201";
    $dbName="Web_Disk";
    $con=new mysqli($host,$user,$password,$dbName);
    $con->set_charset("utf8");
    if($con->connect_error){
        die("连接失败：".$con->connect_error);
    }else{
    $path=str_replace("C:/Windows/System32/Apache24/htdocs", "http://localhost", $targetFile);
    $sql="UPDATE user SET UserImage='".$path."' WHERE UserName='".$acc."';";
    $res=$con->query($sql);    
    }
}else if($_FILES["avatar"]["error"]==0&&$uploadOK==1){
        if((move_uploaded_file($_FILES["avatar"]["tmp_name"],$targetFile))){
            $host="localhost";
            $user="root";
            $password="hjt19422";
            $dbName="Web_Disk";
            $con=new mysqli($host,$user,$password,$dbName);
            $con->set_charset("utf8");
            if($con->connect_error){
                die("连接失败：".$con->connect_error);
            }else{
            $path=str_replace("C:/Windows/System32/Apache24/htdocs", "http://localhost", $targetFile);
            $sql="UPDATE user SET UserImage='".$path."' WHERE UserName='".$acc."';";
            $res=$con->query($sql);    
            }
            echo "the image already upload successfully";
        }else{
            echo "the image already upload failly". $_FILES["avatar"]["error"];
        }
    }else{
        echo "file upload is failed";
    }
?>
