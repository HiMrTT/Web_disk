var yzm_value;
function pop_login(){
    event.preventDefault();
    document.getElementById("under_face").style.display="block";
    document.getElementById("resigter_login").style.display="block";
}
function cha_cha(){
    event.preventDefault();
    document.getElementById("under_face").style.display="none";
    document.getElementById("resigter_login").style.display="none";
}
function show_font(){
    var len=document.getElementById("acc").value.length;
    if(len>0){
        document.getElementById("zhanghu").style.display="block";
    }else{
        document.getElementById("zhanghu").style.display="none";
    }
}
function show_font2(){
    var len=document.getElementById("psw").value.length;
    if(len>0){
        document.getElementById("mima").style.display="block";
    }else{
        document.getElementById("mima").style.display="none";
    }
}
function forget_acc(){
    event.preventDefault();
}
function forget_psw(){
    event.preventDefault();
}
function login_verify(){
    event.preventDefault();
    var sql="SELECT * FROM User";
        $(document).ready(function(){
            $.ajax({
                url:"http://localhost/online_disk/conndbconfig/getUser.php",
                type:"GET",
                data:{
                    msg:sql
                },
                dataType:"json",
                success:function(res){
                    var acc=document.getElementById("acc").value;
                    var psw=document.getElementById("psw").value;
                    var flag=0;
                    for(var i=0;i<res.length;i++){
                        if(res[i][1]===acc){
                            flag=1;
                            if(res[i][2]===SHA256(psw)){
                                if(res[i][6]==="none"){
                                    alert("Login Successfully");
                                    localStorage.setItem("login_state",res[i][6]);
                                    localStorage.setItem("acc",acc);
                                    localStorage.setItem("psw",psw);
                                    window.location.href="http://localhost/online_disk/search_resource.html";
                                }else if(res[i][6]==="lock"){
                                    alert("The account already lockded,Please ask manager to unlock")
                                }
                                break;
                            }else{
                                alert("PassWord Error");
                                break;
                            }
                        }
                    }
                    if(flag===0){
                        alert("The UserName not exist or already logged out");
                    }
                },
                error:function(){
                    console.log("connection database error")
                }
            });
        });
}
function _reset(){
    event.preventDefault();
    document.getElementById("acc").value="";
    document.getElementById("psw").value="";
    show_font();
    show_font2();
}
function _color11(){
    if(document.getElementById("cj_yhm").value.length==0){
        document.getElementById("input_error_tip1").style.display="none";
    }
}
function _color22(){
    if(document.getElementById("cj_mm").value.length==0){
        document.getElementById("input_error_tip2").style.display="none";
    }
}
function _color33(){
    if(document.getElementById("qr_mm").value.length==0){
        document.getElementById("input_error_tip3").style.display="none";
    }
}
function _color44(){
    if(document.getElementById("cj_dh").value.length==0){
        document.getElementById("input_error_tip4").style.display="none";
    }
}
function _color1(){
    document.getElementById("cj_yhm").style.borderColor="rgb(13, 174, 255)";
}
function check_yhm(){
    if(document.getElementById("cj_yhm").value.length>0){
        if(document.getElementById("cj_yhm").value.match(/[\s\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\:\;\"\'\<\>\?\,\.\|\\\/]/g)){
            document.getElementById("input_error_tip1").style.display="block";
            document.getElementById("input_error_tip1").style.color="red";
            document.getElementById("input_error_tip1").innerHTML="Only support number/letter/underline/chinese";
            document.getElementById("cj_yhm").style.borderColor="red";
        }else{
            document.getElementById("cj_yhm").style.borderColor="rgb(18, 254, 41)";
            document.getElementById("input_error_tip1").style.display="none";
        }
    }else{
        document.getElementById("input_error_tip1").style.display="none";
        document.getElementById("cj_yhm").style.borderColor="darkgray";
    }
}
function _color2(){
    document.getElementById("cj_mm").style.borderColor="rgb(13, 174, 255)";
}
function check_mm(){
    if(document.getElementById("cj_mm").value.length>0){
        if(document.getElementById("cj_mm").value.match(/[\u4e00-\u9fff\u3400-\u4dff\s]+/g)){
            document.getElementById("input_error_tip2").style.display="block";
            document.getElementById("input_error_tip2").style.color="red";
            document.getElementById("input_error_tip2").innerHTML="Don`t allow chinese/space";
            document.getElementById("cj_mm").style.borderColor="red";
        }else{
            document.getElementById("cj_mm").style.borderColor="rgb(18, 254, 41)";
            document.getElementById("input_error_tip2").style.display="none";
        }
    }else{
        document.getElementById("input_error_tip2").style.display="none";
        document.getElementById("cj_mm").style.borderColor="darkgray";
    }
}
function _color3(){
    document.getElementById("qr_mm").style.borderColor="rgb(13, 174, 255)";
}
function check_mm2(){
    if(document.getElementById("qr_mm").value.length>0){
        if(document.getElementById("qr_mm").value!==document.getElementById("cj_mm").value){
            document.getElementById("input_error_tip3").style.display="block";
            document.getElementById("input_error_tip3").style.color="red";
            document.getElementById("input_error_tip3").innerHTML="Two passwords entered are not the same";
            document.getElementById("qr_mm").style.borderColor="red";
        }else{
            document.getElementById("qr_mm").style.borderColor="rgb(18, 254, 41)";
            document.getElementById("input_error_tip3").style.display="none";
        }
    }else{
        document.getElementById("input_error_tip3").style.display="none";
        document.getElementById("qr_mm").style.borderColor="darkgray";
    }
}
function _color4(){
    document.getElementById("cj_dh").style.borderColor="rgb(13, 174, 255)";
}
function check_phone(){
    if(document.getElementById("cj_dh").value.length>0){
        if(document.getElementById("cj_dh").value.match(/[^0-9]/g)||document.getElementById("cj_dh").value.length<11){
            document.getElementById("input_error_tip4").style.display="block";
            document.getElementById("input_error_tip4").style.color="red";
            document.getElementById("input_error_tip4").innerHTML="Wrong phone number format";
            document.getElementById("cj_dh").style.borderColor="red";
        }else{
            document.getElementById("cj_dh").style.borderColor="rgb(18, 254, 41)";
            document.getElementById("input_error_tip4").style.display="none";
        }
    }else{
        document.getElementById("input_error_tip4").style.display="none";
        document.getElementById("cj_dh").style.borderColor="darkgray";
    }
}
function gain_yzm(){
    var code="";
    var str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var i=0;i<5;i++){
        code+=str.charAt(Math.floor(Math.random()*str.length));
    }
    return code;
}
function change_yzm(){
    var code=gain_yzm();
    yzm_value=code;
    var cvs=document.getElementById("draw_yzm");
    var context=cvs.getContext("2d");
    context.clearRect(0,0,cvs.width,cvs.height);
    context.font="80px Arial";
    context.fillText(code,20,100);
}
function register_state(){
    event.preventDefault();
    if(document.getElementById("input_error_tip1").style.display==="block"||document.getElementById("input_error_tip2").style.display==="block"||document.getElementById("input_error_tip3").style.display==="block"||document.getElementById("input_error_tip4").style.display==="block"){
        alert("Error");
        event.preventDefault();
    }else if(document.getElementById("cj_yhm").value===""){
        alert("UserName is NULL")
        event.preventDefault();
    }else if(document.getElementById("cj_mm").value===""){
        alert("PassWord is NULL")
        event.preventDefault();
    }else if(document.getElementById("qr_mm").value===""){
        alert("Confirm PassWord is NULL")
        event.preventDefault();
    }else if(document.getElementById("cj_dh").value===""){
        alert("Phone is NULL")
        event.preventDefault();
    }else if(document.getElementById("yzm").value!==yzm_value){
        alert("Verify Code is error");
        event.preventDefault();
        var code=gain_yzm();
        yzm_value=code;
        var cvs=document.getElementById("draw_yzm");
        var context=cvs.getContext("2d");
        context.clearRect(0,0,cvs.width,cvs.height);
        context.font="80px Arial";
        context.fillText(code,20,100);
    }else{
        var acc=document.getElementById("cj_yhm").value;
        var psw=document.getElementById("cj_mm").value;
        var dh=document.getElementById("cj_dh").value;
        var sql="SELECT * FROM User;";
        $(document).ready(function(){
            $.ajax({
                url:"http://localhost/online_disk/conndbconfig/getUser.php",
                type:"GET",
                data:{
                    msg:sql
                },
                dataType:"json",
                success:function(res){
                    var flag=1;
                    for(var i=0;i<res.length;i++){
                        if(res[i][1]===acc){
                            alert("The UserName has been register !");
                            change_yzm();
                            flag=0;
                            break;
                        }else if(res[i][3]===dh){
                            alert("The phonenumber has been registered !");
                            change_yzm();
                            flag=0;
                            break;
                        }
                    }
                    if(flag===1){
                        var d=new Date();
                        var arr=d.toLocaleTimeString().split(":");
                        var dtime=d.toLocaleDateString()+" "+arr[0]+":"+arr[1];
                        sql="INSERT INTO User VALUES('https://tse4-mm.cn.bing.net/th/id/OIP-C.PZU4MWIRJXuSOaGDMWJKuAHaHs?pid=ImgDet&rs=1','"+acc+"','"+SHA256(psw)+"','"+dh+"',0,'"+dtime+"','none');";
                        $(document).ready(function(){
                            $.ajax({
                                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                type:"POST",
                                data:{
                                    msg:sql
                                },
                                dataType:"json"
                            });
                        });
                        alert("Register SuccessFully")
                        window.location.href="http://localhost/online_disk/search_resource.html";
                    }
                }
            });
        });
    }
}