var download_url;
function load_page(){
    if(localStorage.getItem("login_state")==="none"){
        document.getElementById("file_name").innerHTML=localStorage.getItem("file_name");
        document.getElementById("file_size").innerHTML=transferSize(localStorage.getItem("file_size"));
        download_url=localStorage.getItem("download_url");
        var sql="SELECT * FROM userlike";
        $(document).ready(function(){
            $.ajax({
                url:"http://localhost/online_disk/conndbconfig/getUser.php",
                type:"GET",
                data:{
                    msg:sql
                },
                dataType:"json",
                success:function(res){
                    var acc=localStorage.getItem("acc");
                    var furl=download_url;
                    for(let i=0;i<res.length;i++){
                        if(res[i][0]===acc&&res[i][1]===furl){
                            document.getElementById("sc_img").src="http://localhost/image/jsc2.png";
                            break;
                        }
                    }
                }
            });
        });
    }else{
        window.location.href="http://localhost/online_disk/search_resource.html";
    }
}
function set_sc(){
    event.preventDefault();
    if(document.getElementById("sc_img").src==="http://localhost/image/jsc1.png"){
        document.getElementById("sc_img").src="http://localhost/image/jsc2.png";
        var acc=localStorage.getItem("acc");
        var furl=download_url;
        var fname=document.getElementById("file_name").innerHTML;
        var fsize=document.getElementById("file_size").innerHTML;
        var sql="INSERT INTO userlike VALUES('"+acc+"','"+furl+"','"+fname+"','"+fsize+"');";
        $(document).ready(function(){
            $.ajax({
                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                type:"POST",
                data:{
                    msg:sql
                },
                dataType:"html"
            });
        });
    }else{
        document.getElementById("sc_img").src="http://localhost/image/jsc1.png";
        var acc=localStorage.getItem("acc");
        var furl=download_url;
        var sql="DELETE FROM userlike WHERE UserName='"+acc+"' AND furl='"+furl+"';";
        $(document).ready(function(){
            $.ajax({
                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                type:"POST",
                data:{
                    msg:sql
                },
                dataType:"html"
            });
        });
    }
}
function transferSize(size){
    if(!size.includes("B")){
        let size1=parseFloat(size);
        const type=["B","KB","MB","GB","TB"];
        let index=0;
        while(size1>=1024&&index<type.length-1){
            size1/=1024;
            index++;
        }
        return size1.toFixed(2)+" "+type[index];
    }else{
        return size;
    }
}
function file_download(){
    event.preventDefault();
    var d=new Date();
    var acc=localStorage.getItem("acc");
    var furl=download_url;
    var fname=document.getElementById("file_name").innerHTML;
    var fsize=document.getElementById("file_size").innerHTML;
    var arr=d.toLocaleTimeString().split(":");
    var dtime=d.toLocaleDateString()+" "+arr[0]+":"+arr[1];
    var sql="SELECT * FROM userhistory";
        $(document).ready(function(){
            $.ajax({
                url:"http://localhost/online_disk/conndbconfig/getUser.php",
                type:"GET",
                data:{
                    msg:sql
                },
                dataType:"json",
                success:function(res){
                    var isExist=false;
                    for(var i=0;i<res.length;i++){
                        if(res[i][0]===acc){
                            if(res[i][1]===download_url){
                                isExist=true;
                                var sql1="UPDATE userhistory SET dtime='"+dtime+"' WHERE furl='"+download_url+"';";
                                $(document).ready(function(){
                                    $.ajax({
                                        url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                        type:"POST",
                                        data:{
                                            msg:sql1
                                        },
                                        dataType:"html",
                                        success:function(res){
                                            window.location.href=download_url;
                                        }
                                    })
                                })
                                break;
                            }
                        }
                    }
                    if(!isExist){
                        var sql2="INSERT INTO userhistory VALUES('"+acc+"','"+furl+"','"+fname+"','"+fsize+"','"+dtime+"');";
                        $(document).ready(function(){
                            $.ajax({
                                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                type:"POST",
                                data:{
                                    msg:sql2
                                },
                                dataType:"html",
                                success:function(res){
                                    window.location.href=download_url;
                                }
                            })
                        })
                    }
                },
                error:function(){
                    console.log("connection database error")
                }
            });
        });
}