<?php
$file=$_GET['file'];

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($file).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    $chunksize=1024*1024;
    $handle=fopen($file,'rb');
    while(!feof($handle)){
        echo fread($handle,$chunksize);
    }
    fclose($handle);
    exit;
}
?>