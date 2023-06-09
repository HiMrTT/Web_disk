<?php
$searchText=$_GET["search"];
function searchFiles($dir){
  $files=[];
  $handle=opendir($dir);
  while($file=readdir($handle)){
    if($file==='.'||$file==='..'){
      continue;
    }
    if(is_dir("$dir/$file")){
      $files=array_merge($files,searchFiles("$dir/$file"));
    }else{
      $files[]="$dir/$file";
    }
  }
  closedir($handle);
  return $files;
}
$list=searchFiles("E:/download_files/");
$result=[];
foreach($list as $file){
  if(strpos($file,$searchText)!==false){
    $size=filesize($file);
    $result[]=[
      "name"=>basename($file),
      "path"=>$file,
      "size"=>$size
    ];
  }
}
header("Content-Type:application/json");
echo json_encode($result);
?>