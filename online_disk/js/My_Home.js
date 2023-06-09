function load_page(){
    if(localStorage.getItem("login_state")==="none"){
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
                    var acc=localStorage.getItem("acc");
                    var psw=localStorage.getItem("psw");
                    for(var i=0;i<res.length;i++){
                        if(res[i][1]===acc&&res[i][2]===psw){
                            if(res[i][4]==1){
                                document.getElementById("module3").style.display="block";
                                document.getElementById("a_m_").style.display="block";
                                var sql1="SELECT * FROM askmsg WHERE state=' '";
                                $(document).ready(function(){
                                    $.ajax({
                                        url:"http://localhost/online_disk/conndbconfig/getUser.php",
                                        type:"GET",
                                        data:{
                                            msg:sql1
                                        },
                                        dataType:"json",
                                        success:function(res){
                                            if(res.length!==0){
                                                document.getElementById("am_tip1").innerHTML=res.length;
                                                document.getElementById("am_tip1").style.display="block";
                                            }else{
                                                document.getElementById("am_tip1").style.display="none";
                                            }
                                        }
                                    })
                                })
                            }
                            document.getElementById("xg_tx").src=res[i][0];
                            document.getElementById("img22").src=res[i][0];
                            document.getElementById("img2_txt").innerHTML=res[i][1];
                            document.getElementById("img3").src=res[i][0];
                            document.getElementById("txt5").innerHTML=res[i][1];
                            break;
                        }
                    }
                },
                error:function(){
                    console.log("connection database error")
                }
            });
        });
        var sql2="SELECT * FROM emails WHERE state='/image/msg1.png' AND receiver='"+localStorage.getItem("acc")+"';";
        $(document).ready(function(){
            $.ajax({
                url:"http://localhost/online_disk/conndbconfig/getUser.php",
                type:"GET",
                data:{
                    msg:sql2
                },
                dataType:"json",
                success:function(res){
                    if(res.length!==0)
                    document.getElementById("msg_tip").innerHTML=res.length;
                    else 
                    document.getElementById("msg_tip").style.display="none";
                }
            })
        })
        if(localStorage.getItem("rg_set")){
            document.getElementById("txt1").innerHTML="Set My Information"
            document.getElementsByClassName("body")[0].style.display="none";
            document.getElementsByClassName("body2")[0].style.display="block";
        }
    }else{
        window.location.href="http://localhost/online_disk/search_resource.html";
    }
}
function a_m1(){
    document.getElementById("a_m").src="/image/ask1.png";
}
function a_m2(){
    document.getElementById("a_m").src="/image/ask2.png";
}
function show_am(){
    event.preventDefault();
    document.getElementById("am_g").style.display="block";
    var sql="SELECT * FROM askmsg;"
    $(document).ready(function(){
        $.ajax({
            url:"http://localhost/online_disk/conndbconfig/getUser.php",
            type:"GET",
            data:{
                msg:sql
            },
            dataType:"json",
            success:function(res){
                var ul=document.getElementById("am_list");
                var d=new Date();
                var arr=d.toLocaleTimeString().split(":");
                d.setHours(d.getHours()-24);
                var dtime=d.toLocaleDateString()+" "+arr[0]+":"+arr[1];
                for(let i=0;i<res.length;i++){
                    if(dtime>res[i][4]){
                        sql="DELETE FROM askmsg WHERE asktext='"+res[i][3]+"';";
                        $(document).ready(function(){
                            $.ajax({
                                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                type:"POST",
                                data:{
                                    msg:sql
                                },
                                dataType:"html"
                            })
                        })
                    }else{
                        var li=document.createElement('li');
                    li.style.width="530px";
                    li.style.marginLeft="-25px";
                    li.setAttribute('data-time',res[i][4]);
                    var a=document.createElement('a');
                    a.style.display="block";
                    a.style.height="30px";
                    a.href="";
                    a.setAttribute('draggable',false);
                    (function(type,id,phone,time,txt){
                        a.addEventListener('click',function(){
                            event.preventDefault();
                            var sql="UPDATE askmsg SET state='read' WHERE asktext='"+txt+"';"
                            $(document).ready(function(){
                                $.ajax({
                                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                type:"POST",
                                data:{
                                    msg:sql
                                },
                                dataType:"html",
                                success:function(res){
                                    document.getElementById("am_click_af").style.display="block";
                                    document.getElementById("show_am").innerHTML="ask_type: "+type;
                                    document.getElementById("show_am1").innerHTML="ask_id: "+id;
                                    document.getElementById("show_am2").innerHTML="phone: "+phone;
                                    document.getElementById("show_am3").innerHTML="Time: "+time
                                    document.getElementById("show_am4").innerHTML=txt;
                                }
                            })
                        })})
                    })(res[i][0],res[i][1],res[i][2],res[i][4],res[i][3])
                    var span=document.createElement('span');
                    span.id="s_0";
                    span.style.height="20px";
                    span.style.marginTop="5px";
                    span.style.fontSize="10px";
                    span.style.position="absolute";
                    span.innerHTML=res[i][5];
                    var span1=document.createElement('span');
                    span1.id="s_1";
                    span1.style.height="20px";
                    span1.style.marginTop="5px";
                    span1.style.marginLeft="35px";
                    span1.style.fontSize="10px";
                    span1.style.position="absolute";
                    span1.innerHTML=res[i][1];
                    var span2=document.createElement('span');
                    span2.id="s_2";
                    span2.style.height="20px";
                    span2.style.marginTop="5px";
                    span2.style.marginLeft="125px";
                    span2.style.fontSize="10px";
                    span2.style.position="absolute";
                    span2.innerHTML=res[i][3].substring(0,25);
                    var span3=document.createElement('span');
                    span3.id="s_3";
                    span3.style.height="20px";
                    span3.style.marginTop="5px";
                    span3.style.marginLeft="430px";
                    span3.style.fontSize="10px";
                    span3.style.position="absolute";
                    span3.innerHTML=res[i][4];
                    a.appendChild(span);a.appendChild(span1);a.appendChild(span2);a.appendChild(span3);
                    li.appendChild(a);
                    ul.appendChild(li);
                    }
                }
                const list=document.querySelector("#am_list");
                const items=Array.from(list.querySelectorAll("li"));
                function compare(a,b){
                    const timeA=new Date(a.dataset.time);
                    const timeB=new Date(b.dataset.time);
                    if(timeA>timeB){
                        return -1;
                    }else if(timeA<timeB){
                        return 1;
                    }else{
                        return 0;
                    }
                }
                items.sort(compare);
                items.forEach(item=>list.appendChild(item));
            }
        })
    })
}
function cha_cha_am(){
    event.preventDefault();
    document.getElementById("am_g").style.display="none";
    while(document.getElementById("am_list").firstChild){
        document.getElementById("am_list").removeChild(document.getElementById("am_list").firstChild);
    }
}
function back_last3(){
    event.preventDefault();
    document.getElementById("am_click_af").style.display="none";
}
function msg1(){
    document.getElementById("msg").src="/image/msg1.png";
}
function msg2(){
    document.getElementById("msg").src="/image/msg2.png";
}
function show_msg(){
    event.preventDefault();
    document.getElementById("msg_backg").style.display="block";
    document.getElementById("fanhui_").style.display="none";
    document.getElementById("mail_title").innerHTML="My Email";
    document.getElementById("w_mail_").style.display="block";
    document.getElementById("s_mail_").style.display="block";
    document.getElementById("r_mail_").style.display="block";
    document.getElementById("w_block").style.display="none";
    document.getElementById("send_af").style.display="none";
    document.getElementById("asend_block").style.display="none";
    document.getElementById("s_click_af").style.display="none";
    document.getElementById("r_block").style.display="none";
    document.getElementById("r_click_af").style.display="none";
}
function go_w(){
    event.preventDefault();
    document.getElementById("fanhui_").style.display="block";
    document.getElementById("mail_title").innerHTML="Write Email";
    document.getElementById("w_mail_").style.display="none";
    document.getElementById("s_mail_").style.display="none";
    document.getElementById("r_mail_").style.display="none";
    document.getElementById("w_block").style.display="block";
    if(localStorage.getItem("acc"))
    document.getElementById("post_u_id").innerHTML=localStorage.getItem("acc");
    else document.getElementById("post_u_id").innerHTML="";
    if(localStorage.getItem("save_id"))
    document.getElementById("get_u_id").value=localStorage.getItem("save_id");
    else document.getElementById("get_u_id").value="";
    if(localStorage.getItem("save_txt"))
    document.getElementById("post_context").value=localStorage.getItem("save_txt");
    else document.getElementById("post_context").value="";
}
function go_s(){
    event.preventDefault();
    document.getElementById("fanhui_").style.display="block";
    document.getElementById("mail_title").innerHTML="Aready Sent";
    document.getElementById("w_mail_").style.display="none";
    document.getElementById("s_mail_").style.display="none";
    document.getElementById("r_mail_").style.display="none";
    document.getElementById("asend_block").style.display="block";
    document.getElementById("post_u_id").innerHTML=localStorage.getItem("acc");
    while(document.getElementById("asend_list").firstChild){
        document.getElementById("asend_list").removeChild(document.getElementById("asend_list").firstChild);
    }
    var sql="SELECT * FROM emails WHERE sender='"+localStorage.getItem("acc")+"';"
    $(document).ready(function(){
        $.ajax({
            url:"http://localhost/online_disk/conndbconfig/getUser.php",
            type:"GET",
            data:{
                msg:sql
            },
            dataType:"json",
            success:function(res){
                var ul=document.getElementById("asend_list");
                for(let i=0;i<res.length;i++){
                    var li=document.createElement('li');
                    li.style.width="530px";
                    li.style.marginLeft="-25px";
                    li.setAttribute('data-time',res[i][3]);
                    var a=document.createElement('a');
                    a.style.display="block";
                    a.style.height="30px";
                    a.href="";
                    a.setAttribute('draggable',false);
                    (function(sr,rr,time,txt){
                        a.addEventListener('click',function(){
                            event.preventDefault();
                            document.getElementById("s_click_af").style.display="block";
                            document.getElementById("show_s1").innerHTML="sender: "+sr;
                            document.getElementById("show_r1").innerHTML="receiver: "+rr;
                            document.getElementById("show_t1").innerHTML="Time: "+time
                            document.getElementById("show_c1").innerHTML=txt;
                        })
                    })(res[i][0],res[i][1],res[i][3],res[i][2])
                    var img=document.createElement('img');
                    img.style.width="20px";
                    img.style.height="20px";
                    img.style.marginTop="5px";
                    img.style.marginLeft="5px";
                    img.style.position="absolute";
                    img.src="/image/fsyj.png";
                    var span1=document.createElement('span');
                    span1.id="s_1";
                    span1.style.height="20px";
                    span1.style.marginTop="5px";
                    span1.style.marginLeft="35px";
                    span1.style.fontSize="10px";
                    span1.style.position="absolute";
                    span1.innerHTML=res[i][1];
                    var span2=document.createElement('span');
                    span2.id="s_2";
                    span2.style.height="20px";
                    span2.style.marginTop="5px";
                    span2.style.marginLeft="125px";
                    span2.style.fontSize="10px";
                    span2.style.position="absolute";
                    span2.innerHTML=res[i][2].substring(0,25);
                    var span3=document.createElement('span');
                    span3.id="s_3";
                    span3.style.height="20px";
                    span3.style.marginTop="5px";
                    span3.style.marginLeft="430px";
                    span3.style.fontSize="10px";
                    span3.style.position="absolute";
                    span3.innerHTML=res[i][3];
                    a.appendChild(img);a.appendChild(span1);a.appendChild(span2);a.appendChild(span3);
                    li.appendChild(a);
                    ul.appendChild(li);
                }
                const list=document.querySelector("#asend_list");
                const items=Array.from(list.querySelectorAll("li"));
                function compare(a,b){
                    const timeA=new Date(a.dataset.time);
                    const timeB=new Date(b.dataset.time);
                    if(timeA>timeB){
                        return -1;
                    }else if(timeA<timeB){
                        return 1;
                    }else{
                        return 0;
                    }
                }
                items.sort(compare);
                items.forEach(item=>list.appendChild(item));
            }
        })
    })
}
function go_r(){
    event.preventDefault();
    document.getElementById("fanhui_").style.display="block";
    document.getElementById("mail_title").innerHTML="Receive Email";
    document.getElementById("w_mail_").style.display="none";
    document.getElementById("s_mail_").style.display="none";
    document.getElementById("r_mail_").style.display="none";
    document.getElementById("r_block").style.display="block";
    while(document.getElementById("rec_list").firstChild){
        document.getElementById("rec_list").removeChild(document.getElementById("rec_list").firstChild);
    }
    var sql="SELECT * FROM emails WHERE receiver='"+localStorage.getItem("acc")+"';"
    $(document).ready(function(){
        $.ajax({
            url:"http://localhost/online_disk/conndbconfig/getUser.php",
            type:"GET",
            data:{
                msg:sql
            },
            dataType:"json",
            success:function(res){
                var ul=document.getElementById("rec_list");
                for(let i=0;i<res.length;i++){
                    var li=document.createElement('li');
                    li.style.width="530px";
                    li.style.marginLeft="-25px";
                    li.setAttribute('data-time',res[i][3]);
                    var a=document.createElement('a');
                    a.style.display="block";
                    a.style.height="30px";
                    a.href="";
                    a.setAttribute('draggable',false);
                    (function(sr,rr,time,txt){
                        a.addEventListener('click',function(){
                            event.preventDefault();
                            document.getElementById("r_click_af").style.display="block";
                            document.getElementById("show_s2").innerHTML="sender: "+sr;
                            document.getElementById("show_r2").innerHTML="receiver: "+rr;
                            document.getElementById("show_t2").innerHTML="Time: "+time
                            document.getElementById("show_c2").innerHTML=txt;
                            let sql1="UPDATE emails SET state='/image/ckyj.png' WHERE backmsg='"+txt+"';"
                            $(document).ready(function(){
                                $.ajax({
                                    url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                    type:"POST",
                                    data:{
                                        msg:sql1
                                    },
                                    dataType:"html"
                                })
                            })
                        })
                    })(res[i][0],res[i][1],res[i][3],res[i][2])
                    var img=document.createElement('img');
                    img.style.width="20px";
                    img.style.height="20px";
                    img.style.marginTop="5px";
                    img.style.marginLeft="5px";
                    img.style.position="absolute";
                    img.src=res[i][4];
                    var span1=document.createElement('span');
                    span1.id="s_1";
                    span1.style.height="20px";
                    span1.style.marginTop="5px";
                    span1.style.marginLeft="35px";
                    span1.style.fontSize="10px";
                    span1.style.position="absolute";
                    span1.innerHTML=res[i][0];
                    var span2=document.createElement('span');
                    span2.id="s_2";
                    span2.style.height="20px";
                    span2.style.marginTop="5px";
                    span2.style.marginLeft="125px";
                    span2.style.fontSize="10px";
                    span2.style.position="absolute";
                    span2.innerHTML=res[i][2].substring(0,25);
                    var span3=document.createElement('span');
                    span3.id="s_3";
                    span3.style.height="20px";
                    span3.style.marginTop="5px";
                    span3.style.marginLeft="430px";
                    span3.style.fontSize="10px";
                    span3.style.position="absolute";
                    span3.innerHTML=res[i][3];
                    a.appendChild(img);a.appendChild(span1);a.appendChild(span2);a.appendChild(span3);
                    li.appendChild(a);
                    ul.appendChild(li);
                }
                const list=document.querySelector("#rec_list");
                const items=Array.from(list.querySelectorAll("li"));
                function compare(a,b){
                    const timeA=new Date(a.dataset.time);
                    const timeB=new Date(b.dataset.time);
                    if(timeA>timeB){
                        return -1;
                    }else if(timeA<timeB){
                        return 1;
                    }else{
                        return 0;
                    }
                }
                items.sort(compare);
                items.forEach(item=>list.appendChild(item));
            }
        })
    })
}
function go_fh(){
    event.preventDefault();
    if((document.getElementById("get_u_id").value!==""||document.getElementById("post_context").value!=="")){
        if(localStorage.getItem("save_id")!==document.getElementById("get_u_id").value||localStorage.getItem("save_txt")!==document.getElementById("post_context").value){
            document.getElementById("back_tip_g").style.display="block";
            document.getElementById("back_tip_y").addEventListener('click',function(){
                localStorage.setItem("save_id",document.getElementById("get_u_id").value);
                localStorage.setItem("save_txt",document.getElementById("post_context").value);
                document.getElementById("fanhui_").style.display="none";
                document.getElementById("mail_title").innerHTML="My Email";
                document.getElementById("w_mail_").style.display="block";
                document.getElementById("s_mail_").style.display="block";
                document.getElementById("r_mail_").style.display="block";
                document.getElementById("w_block").style.display="none";
                document.getElementById("asend_block").style.display="none";
                document.getElementById("r_block").style.display="none"
                document.getElementById("back_tip_g").style.display="none";
            })
            document.getElementById("back_tip_n").addEventListener('click',function(){
                document.getElementById("fanhui_").style.display="none";
                document.getElementById("mail_title").innerHTML="My Email";
                document.getElementById("w_mail_").style.display="block";
                document.getElementById("s_mail_").style.display="block";
                document.getElementById("r_mail_").style.display="block";
                document.getElementById("w_block").style.display="none";
                document.getElementById("asend_block").style.display="none";
                document.getElementById("r_block").style.display="none";
                document.getElementById("get_u_id").value="";
                document.getElementById("post_context").value="";
                document.getElementById("back_tip_g").style.display="none";
            })
        }else{
            document.getElementById("fanhui_").style.display="none";
        document.getElementById("mail_title").innerHTML="My Email";
        document.getElementById("w_mail_").style.display="block";
        document.getElementById("s_mail_").style.display="block";
        document.getElementById("r_mail_").style.display="block";
        document.getElementById("w_block").style.display="none";
        document.getElementById("asend_block").style.display="none";
        document.getElementById("r_block").style.display="none";
        document.getElementById("back_tip_g").style.display="none";
        }
        
    }else{
        document.getElementById("fanhui_").style.display="none";
        document.getElementById("mail_title").innerHTML="My Email";
        document.getElementById("w_mail_").style.display="block";
        document.getElementById("s_mail_").style.display="block";
        document.getElementById("r_mail_").style.display="block";
        document.getElementById("w_block").style.display="none";
        document.getElementById("asend_block").style.display="none";
        document.getElementById("r_block").style.display="none";
        document.getElementById("back_tip_g").style.display="none";
    }
}
function get_len(){
    if(document.getElementById("post_context").value.replace(/\s/g,'').length<=200&&document.getElementById("post_context").value.replace(/\s/g,'').length>0){
        document.getElementById("len_tip").style.display="block";
        document.getElementById("len_tip").style.color="grey";
        document.getElementById("len_tip").innerHTML=document.getElementById("post_context").value.replace(/\s/g,'').length+"/200";
    }
    else if(document.getElementById("post_context").value.replace(/\s/g,'').length>200){
        document.getElementById("len_tip").style.display="block";
        document.getElementById("len_tip").style.color="red";
        document.getElementById("len_tip").innerHTML=document.getElementById("post_context").value.replace(/\s/g,'').length+"/200";
    }else{
        document.getElementById("len_tip").style.display="none";
    }
}
function post_text(){
    if(document.getElementById("post_context").value.replace(/\s/g,'').length>0){
        if(document.getElementById("get_u_id").value.length>0){
            console.log(document.getElementById("get_u_id").value+document.getElementById("post_u_id").value)
            if(document.getElementById("get_u_id").value!==document.getElementById("post_u_id").innerHTML){
                var receiver=document.getElementById("get_u_id").value;
                var postContext=document.getElementById("post_context").value.replace(/\s/g,'');
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
                            var flag=0;
                            for(let i=0;i<res.length;i++){
                                if(res[i][1]===receiver){
                                    flag=1;
                                    var d=new Date();
                                    var arr=d.toLocaleTimeString().split(":");
                                    var dtime=d.toLocaleDateString()+" "+arr[0]+":"+arr[1];
                                    sql="INSERT INTO emails VALUES('"+document.getElementById("post_u_id").innerHTML+"','"+receiver+"','"+postContext+"','"+dtime+"','/image/msg1.png');";
                                    $(document).ready(function(){
                                        $.ajax({
                                            url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                            type:"POST",
                                            data:{
                                                msg:sql
                                            },
                                            dataType:"html",
                                            success:function(){
                                                document.getElementById("send_af").style.display="block";
                                                localStorage.removeItem("save_id");
                                                localStorage.removeItem("save_txt");
                                            }
                                        })
                                    })
                                    break;
                                }
                            }
                            if(flag===0){
                                alert("your email send failly,beacese receiver is not exist")
                            }
                        }
                    })
                })
            }else{
                alert("you can`t send email to yourself !")
            }
            
        }else{
            alert("receiver is null")
        }
    }else{
        alert("your input is null")
    }
}
function w_again(){
    document.getElementById("send_af").style.display="none";
    document.getElementById("get_u_id").value="";
    document.getElementById("post_context").value="";
    document.getElementById("len_tip").style.display="none";
}
function back_o(){
    document.getElementById("send_af").style.display="none";
    document.getElementById("fanhui_").style.display="none";
    document.getElementById("mail_title").innerHTML="My Email";
    document.getElementById("w_mail_").style.display="block";
    document.getElementById("s_mail_").style.display="block";
    document.getElementById("r_mail_").style.display="block";
    document.getElementById("w_block").style.display="none";
    document.getElementById("r_block").style.display="none";
    document.getElementById("get_u_id").value="";
    document.getElementById("post_context").value="";
    document.getElementById("len_tip").style.display="none";
}
function back_last1(){
    event.preventDefault();
    document.getElementById("r_click_af").style.display="none";
    document.getElementById("s_click_af").style.display="none";
    while(document.getElementById("asend_list").firstChild){
        document.getElementById("asend_list").removeChild(document.getElementById("asend_list").firstChild);
    }
    go_s();
}
function back_last2(){
    event.preventDefault();
    document.getElementById("r_click_af").style.display="none";
    document.getElementById("s_click_af").style.display="none";
    while(document.getElementById("rec_list").firstChild){
        document.getElementById("rec_list").removeChild(document.getElementById("rec_list").firstChild);
    }
    go_r();
}
function go_write1(){
    document.getElementById("asend_block").style.display="none";
    document.getElementById("s_click_af").style.display="none";
    document.getElementById("r_block").style.display="none";
    document.getElementById("r_click_af").style.display="none";
    document.getElementById("w_block").style.display="block";
    localStorage.setItem('save_id',document.getElementById("show_r1").innerHTML.replace('receiver: ',''));
    localStorage.setItem('save_txt','');
    go_w()
}
function de_email1(){
    document.getElementById("s_g").style.display="block";
    document.getElementById("de_y1").addEventListener('click',function(){
        var sql="DELETE FROM emails WHERE backmsg='"+document.getElementById("show_c1").innerHTML+"'";
        $(document).ready(function(){
            $.ajax({
                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                type:"POST",
                data:{
                    msg:sql
                },
                dataType:"html",
                success:function(){
                    document.getElementById("s_g").style.display="none";
                    alert("Deleted")
                    back_last1();
                }
            })
        })
    })
    document.getElementById("de_n1").addEventListener('click',function(){
        document.getElementById("s_g").style.display="none";
    })
}
function go_write2(){
    document.getElementById("asend_block").style.display="none";
    document.getElementById("s_click_af").style.display="none";
    document.getElementById("r_block").style.display="none";
    document.getElementById("r_click_af").style.display="none";
    document.getElementById("w_block").style.display="block";
    localStorage.setItem('save_id',document.getElementById("show_s2").innerHTML.replace('sender: ',''));
    localStorage.setItem('save_txt','');
    go_w()
}
function de_email2(){
    document.getElementById("r_g").style.display="block";
    document.getElementById("de_y2").addEventListener('click',function(){
        var sql="DELETE FROM emails WHERE backmsg='"+document.getElementById("show_c2").innerHTML+"'";
        $(document).ready(function(){
            $.ajax({
                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                type:"POST",
                data:{
                    msg:sql
                },
                dataType:"html",
                success:function(){
                    document.getElementById("r_g").style.display="none";
                    alert("Deleted")
                    back_last2();
                }
            })
        })
    })
    document.getElementById("de_n2").addEventListener('click',function(){
        document.getElementById("r_g").style.display="none";
    })
}
function cha_cha_m(){
    event.preventDefault();
    document.getElementById("msg_backg").style.display="none";
}
var hideTimer=null;
function show_block(){
    document.getElementById("img2_txt").style.color="blue";
    clearTimeout(hideTimer)
    document.getElementById("set_block").style.display="block";
}
function hidden_block(){
    document.getElementById("img2_txt").style.color="black";
    hideTimer=setTimeout(function(){
        document.getElementById("set_block").style.display="none";
    },500);
}
function go_block1(){
    event.preventDefault();
    document.getElementById("txt1").innerHTML="Set My Information"
    document.getElementsByClassName("body")[0].style.display="none";
    document.getElementsByClassName("body2")[0].style.display="block";
}
function go_block2(){
    event.preventDefault();
    document.getElementById("under_face").style.display="block";
    document.getElementById("resigter_login").style.display="block";
}
function go_block3(){
    event.preventDefault();
    document.getElementById("back_page").style.display="block";
}
function pp(){
    event.preventDefault();
}
function clear_color(){
    document.getElementById("img2_txt").style.color="black";
}
function set_info(){
    event.preventDefault();
    document.getElementById("txt1").innerHTML="Set My Information"
    document.getElementsByClassName("body")[0].style.display="none";
    document.getElementsByClassName("body2")[0].style.display="block";
}
var p=0;
var originalItems1=[],originalItems2=[],originalItems3=[];
function show_color1(){
    if(p!=1){
        document.getElementById("module1_img").src="http://localhost/image/sc2.png";
        document.getElementById("module1").style.color="rgb(0, 162, 255)";
        document.getElementById("module1").style.backgroundColor="rgb(243, 248, 252)";
    }
}
function hidden_color1(){
    if(p!=1){
        document.getElementById("module1_img").src="http://localhost/image/sc1.png";
        document.getElementById("module1").style.color="darkgrey";
        document.getElementById("module1").style.backgroundColor="#fff";
    }
}
function go_sc(){
    event.preventDefault();
    p=1;
    document.getElementById("module2").style.color="darkgrey";
    document.getElementById("module2").style.backgroundColor="#fff";
    document.getElementById("module2_img").src="http://localhost/image/jl1.png";
    document.getElementById("module3").style.color="darkgrey";
    document.getElementById("module3").style.backgroundColor="#fff";
    document.getElementById("module3_img").src="http://localhost/image/yhgl1.png";
    document.getElementById("module1").style.color="rgb(0, 162, 255)";
    document.getElementById("module1").style.backgroundColor="rgb(243, 248, 252)";
    document.getElementById("module1_img").src="http://localhost/image/sc2.png";
    document.getElementById("d_search_af").style.display="none";
    document.getElementById("download_search").style.display="none";
    document.getElementById("d_bf").style.display="none";
    document.getElementById("u_search_af").style.display="none";
    document.getElementById("user_search").style.display="none";
    document.getElementById("u_bf").style.display="none";
    document.getElementById("txt6").innerHTML="My Collection";
    document.getElementById("c_bf").style.display="block";
    while(document.getElementById("download_list").firstChild){
        document.getElementById("download_list").removeChild(document.getElementById("download_list").firstChild);
    }
    while(document.getElementById("user_list").firstChild){
        document.getElementById("user_list").removeChild(document.getElementById("user_list").firstChild);
    }
    document.getElementById("manageuser_item").style.display="none";
    document.getElementById("download_item").style.display="none";
    document.getElementById("collection_item").style.display="block";
    var acc=localStorage.getItem("acc");
    var sql="SELECT * FROM userlike WHERE UserName='"+acc+"';";
    $(document).ready(function(){
        $.ajax({
            url:"http://localhost/online_disk/conndbconfig/getUser.php",
            type:"GET",
            data:{
                msg:sql
            },
            dataType:"json",
            success:function(res){
                for(var i=0;i<res.length;i++){
                    if(res[i][0]===acc){
                        const li=document.createElement("li");
                        const a=document.createElement("a");
                        a.href=`http://localhost/online_disk/My_DownLoad.html`;
                        a.target="_blank";
                        a.textContent=res[i][2];
                        a.style.display="block";
                        a.style.padding="5px";
                        a.style.textDecoration="none";
                        a.style.color="black";
                        (function(i,name,size,url) {
                            a.addEventListener('click', function() {
                                localStorage.setItem("file_name",name);
                                localStorage.setItem("file_size",size);
                                localStorage.setItem("download_url",url);
                            });
                        })(i,res[i][2],res[i][3],res[i][1]);
                        li.appendChild(a);
                        document.getElementById("collection_list").appendChild(li);
                    }
                }
                const list=document.querySelector("#collection_list");
                const items=list.querySelectorAll("li");
                originalItems1=Array.from(items);
            },
            error:function(){
                console.log("connection database error")
            }
        });
    });
}
function show_cinput(){
    event.preventDefault();
    document.getElementById("c_bf").style.display="none";
    document.getElementById("c_search_af").style.display="block";
    document.getElementById("collection_search").style.display="block";
}
function c_in(){
    const list=document.querySelector("#collection_list");
    const items=list.querySelectorAll("li");
    const key=document.getElementById("collection_search").value.trim().toLowerCase();
    if(key){
            items.forEach((item)=>{
                const a=item.querySelector('a');
                if(a.textContent.toLowerCase().indexOf(key)!==-1){
                    list.insertBefore(item,list.firstChild);
                    a.innerHTML=a.textContent.replace(new RegExp('('+key+')','ig'),'<span class="highlight">$1</span>');
                }else{
                    a.innerHTML=a.textContent;
                }
            })
    }else{
        originalItems1.forEach((item,index)=>{
            const a=item.querySelector('a');
            if(index!==0)
            list.appendChild(item);
            a.innerHTML=a.textContent;
        })
    }
}
function h_c(){
    document.getElementById("c_search_af").style.display="none";
    document.getElementById("collection_search").style.display="none";
    document.getElementById("c_bf").style.display="block";
}
function show_color2(){
    if(p!=2){
        document.getElementById("module2_img").src="http://localhost/image/jl2.png";
        document.getElementById("module2").style.color="rgb(0, 162, 255)";
        document.getElementById("module2").style.backgroundColor="rgb(243, 248, 252)";
    }
}
function hidden_color2(){
    if(p!=2){
        document.getElementById("module2_img").src="http://localhost/image/jl1.png";
        document.getElementById("module2").style.color="darkgrey";
        document.getElementById("module2").style.backgroundColor="#fff";
    }
}
function go_jl(){
    event.preventDefault();
    p=2;
    document.getElementById("module1").style.color="darkgrey";
    document.getElementById("module1").style.backgroundColor="#fff";
    document.getElementById("module1_img").src="http://localhost/image/sc1.png";
    document.getElementById("module3").style.color="darkgrey";
    document.getElementById("module3").style.backgroundColor="#fff";
    document.getElementById("module3_img").src="http://localhost/image/yhgl1.png";
    document.getElementById("module2").style.color="rgb(0, 162, 255)";
    document.getElementById("module2").style.backgroundColor="rgb(243, 248, 252)";
    document.getElementById("module2_img").src="http://localhost/image/jl2.png";
    document.getElementById("c_search_af").style.display="none";
    document.getElementById("collection_search").style.display="none";
    document.getElementById("c_bf").style.display="none";
    document.getElementById("u_search_af").style.display="none";
    document.getElementById("user_search").style.display="none";
    document.getElementById("u_bf").style.display="none";
    document.getElementById("txt6").innerHTML="My Download";
    document.getElementById("d_bf").style.display="block";
    while(document.getElementById("collection_list").firstChild){
        document.getElementById("collection_list").removeChild(document.getElementById("collection_list").firstChild);
    }
    while(document.getElementById("user_list").firstChild){
        document.getElementById("user_list").removeChild(document.getElementById("user_list").firstChild);
    }
    document.getElementById("manageuser_item").style.display="none";
    document.getElementById("collection_item").style.display="none";
    document.getElementById("download_item").style.display="block";
    var acc=localStorage.getItem("acc");
    var sql="SELECT * FROM userhistory WHERE UserName='"+acc+"';";
    $(document).ready(function(){
        $.ajax({
            url:"http://localhost/online_disk/conndbconfig/getUser.php",
            type:"GET",
            data:{
                msg:sql
            },
            dataType:"json",
            success:function(res){
                for(var i=0;i<res.length;i++){
                    if(res[i][0]===acc){
                        const li=document.createElement("li");
                        const a=document.createElement("a");
                        const span=document.createElement("span");
                        const img=document.createElement("img");
                        a.href=`http://localhost/online_disk/My_DownLoad.html`;
                        a.target="_blank";
                        a.textContent=res[i][2];
                        a.style.display="block";
                        a.style.padding="5px";
                        a.style.textDecoration="none";
                        a.style.color="black";
                        (function(i,name,size,url) {
                            a.addEventListener('click', function(){
                                localStorage.setItem("file_name",name);
                                localStorage.setItem("file_size",size);
                                localStorage.setItem("download_url",url);
                            });
                        })(i,res[i][2],res[i][3],res[i][1]);
                        span.textContent=res[i][4];
                        span.style.marginTop="5px";
                        span.style.marginLeft="390px";
                        span.style.position="absolute";
                        img.src="http://localhost/image/xx.png";
                        img.style.width="20px";
                        img.style.height="20px";
                        img.style.marginTop="7px";
                        img.style.marginLeft="525px";
                        img.style.borderRadius="10px";
                        img.style.position="absolute";
                        (function(ii,url){
                            img.addEventListener('click',function(){
                                document.getElementById("download_list").removeChild(document.getElementById("download_list").childNodes[ii]);
                                var sql="DELETE FROM userhistory WHERE UserName='"+acc+"' AND furl='"+url+"';";
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
                            })
                        })(i,res[i][1])
                        li.setAttribute('data-time',res[i][4]);
                        li.appendChild(img)
                        li.appendChild(span);
                        li.appendChild(a);
                        document.getElementById("download_list").appendChild(li);
                    }
                }
                const list=document.querySelector("#download_list");
                const items=Array.from(list.querySelectorAll("li"));
                function compare(a,b){
                    const timeA=new Date(a.dataset.time);
                    const timeB=new Date(b.dataset.time);
                    if(timeA>timeB){
                        return -1;
                    }else if(timeA<timeB){
                        return 1;
                    }else{
                        return 0;
                    }
                }
                items.sort(compare);
                items.forEach(item=>list.appendChild(item));
                const list1=document.querySelector("#download_list");
                const items1=list1.querySelectorAll("li");
                originalItems2=Array.from(items1);
            },
            error:function(){
                console.log("connection database error")
            }
        });
    });
}
function show_color3(){
    if(p!=3){
        document.getElementById("module3_img").src="http://localhost/image/yhgl2.png";
        document.getElementById("module3").style.color="rgb(0, 162, 255)";
        document.getElementById("module3").style.backgroundColor="rgb(243, 248, 252)";
    }
}
function hidden_color3(){
    if(p!=3){
        document.getElementById("module3_img").src="http://localhost/image/yhgl1.png";
        document.getElementById("module3").style.color="darkgrey";
        document.getElementById("module3").style.backgroundColor="#fff";
    }
}
function show_dinput(){
    event.preventDefault();
    document.getElementById("d_bf").style.display="none";
    document.getElementById("d_search_af").style.display="block";
    document.getElementById("download_search").style.display="block";
}
function d_in(){
    const searchInput=document.querySelector("#download_search");
    const list=document.querySelector("#download_list");
    const items=list.querySelectorAll("li");
    const originalItems=Array.from(items);
    const key=document.getElementById("download_search").value.trim().toLowerCase();
    if(key){
        items.forEach((item)=>{
            const a=item.querySelector('a');
            if(a.textContent.toLowerCase().indexOf(key)!==-1){
                list.insertBefore(item,list.firstChild);
                a.innerHTML=a.textContent.replace(new RegExp('('+key+')','ig'),'<span class="highlight">$1</span>');
            }else{
                a.innerHTML=a.textContent;
            }
        })
    }else{
        originalItems2.forEach((item,index)=>{
            const a=item.querySelector('a');
            if(index!==0)
            list.appendChild(item);
            a.innerHTML=a.textContent;
        })
    }
}
function h_d(){
    document.getElementById("d_search_af").style.display="none";
    document.getElementById("download_search").style.display="none";
    document.getElementById("d_bf").style.display="block";
}
function go_gl(){
    event.preventDefault();
    p=3;
    document.getElementById("module1").style.color="darkgrey";
    document.getElementById("module1").style.backgroundColor="#fff";
    document.getElementById("module1_img").src="http://localhost/image/sc1.png";
    document.getElementById("module2").style.color="darkgrey";
    document.getElementById("module2").style.backgroundColor="#fff";
    document.getElementById("module2_img").src="http://localhost/image/jl1.png";
    document.getElementById("module3").style.color="rgb(0, 162, 255)";
    document.getElementById("module3").style.backgroundColor="rgb(243, 248, 252)";
    document.getElementById("module3_img").src="http://localhost/image/yhgl2.png";
    document.getElementById("c_search_af").style.display="none";
    document.getElementById("collection_search").style.display="none";
    document.getElementById("c_bf").style.display="none";
    document.getElementById("d_search_af").style.display="none";
    document.getElementById("download_search").style.display="none";
    document.getElementById("d_bf").style.display="none";
    document.getElementById("txt6").innerHTML="Manage User";
    document.getElementById("u_bf").style.display="block";
    while(document.getElementById("collection_list").firstChild){
        document.getElementById("collection_list").removeChild(document.getElementById("collection_list").firstChild);
    }
    while(document.getElementById("download_list").firstChild){
        document.getElementById("download_list").removeChild(document.getElementById("download_list").firstChild);
    }
    document.getElementById("download_item").style.display="none";
    document.getElementById("collection_item").style.display="none";
    document.getElementById("manageuser_item").style.display="block";
    var sql="SELECT * FROM user WHERE root=0;";
    $(document).ready(function(){
        $.ajax({
            url:"http://localhost/online_disk/conndbconfig/getUser.php",
            type:"GET",
            data:{
                msg:sql
            },
            dataType:"json",
            success:function(res){
                for(var i=0;i<res.length;i++){
                    const li=document.createElement("li");
                    li.style.width="520px";
                    li.style.height="27px";
                    const img=document.createElement("img");
                    img.setAttribute('draggable',false);
                    img.src=res[i][0];
                    img.style.width="20px";
                    img.style.height="20px";
                    img.style.marginTop="3px";
                    img.style.borderRadius="20px";
                    img.style.position="absolute";
                    const span1=document.createElement("span");
                    span1.id="span1";
                    span1.textContent=res[i][1];
                    span1.style.marginTop="-2px";
                    span1.style.marginLeft="30px";
                    span1.style.padding="5px";
                    span1.style.position="absolute";
                    const span2=document.createElement("span");
                    span2.id="span2";
                    span2.textContent=res[i][5];
                    span2.style.marginTop="-2px";
                    span2.style.marginLeft="200px";
                    span2.style.padding="5px";
                    span2.style.position="absolute";
                    const btn1=document.createElement('button');
                    btn1.textContent="LOCK";
                    btn1.style.width="60px";
                    btn1.style.height="20px";
                    btn1.style.marginTop="3px";
                    btn1.style.marginLeft="350px";
                    btn1.style.fontSize="5px";
                    btn1.style.border="1px";
                    btn1.style.borderRadius="20px";
                    btn1.style.backgroundColor="rgb(255, 255, 7)";
                    btn1.style.position="absolute";
                    (function(acc){
                        btn1.addEventListener('click',function(){
                            let sql1="UPDATE User SET state='lock' WHERE UserName='"+acc+"';";
                            $(document).ready(function(){
                                $.ajax({
                                    url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                    type:"POST",
                                    data:{
                                        msg:sql1
                                    },
                                    dataType:"html",
                                    success:function(res){
                                        alert("The account already locked successfully")
                                    }
                                })
                            })
                        })
                    })(res[i][1])
                    btn1.addEventListener('mouseover',function(){
                        btn1.style.backgroundColor="rgb(175, 175, 6)";
                    })
                    btn1.addEventListener('mouseout',function(){
                        btn1.style.backgroundColor="rgb(255, 255, 7)";
                    })
                    const btn2=document.createElement('button');
                    btn2.textContent="UNLOCK";
                    btn2.style.width="60px";
                    btn2.style.height="20px";
                    btn2.style.marginTop="3px";
                    btn2.style.marginLeft="420px";
                    btn2.style.fontSize="5px";
                    btn2.style.border="1px";
                    btn2.style.borderRadius="20px";
                    btn2.style.backgroundColor="rgb(6, 161, 244)";
                    btn2.style.position="absolute";
                    (function(acc){
                        btn2.addEventListener('click',function(){
                            let sql1="UPDATE User SET state='none' WHERE UserName='"+acc+"';";
                            $(document).ready(function(){
                                $.ajax({
                                    url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                    type:"POST",
                                    data:{
                                        msg:sql1
                                    },
                                    dataType:"html",
                                    success:function(res){
                                        alert("The account already unlocked successfully")
                                    }
                                })
                            })
                        })
                    })(res[i][1])
                    btn2.addEventListener('mouseover',function(){
                        btn2.style.backgroundColor="rgb(5, 114, 173)";
                    })
                    btn2.addEventListener('mouseout',function(){
                        btn2.style.backgroundColor="rgb(6, 161, 244)";
                    })
                    const btn3=document.createElement('button');
                    btn3.textContent="CANCEL";
                    btn3.style.width="60px";
                    btn3.style.height="20px";
                    btn3.style.marginTop="3px";
                    btn3.style.marginLeft="490px";
                    btn3.style.fontSize="5px";
                    btn3.style.border="1px";
                    btn3.style.borderRadius="20px";
                    btn3.style.backgroundColor="rgb(244, 6, 6)";
                    btn3.style.position="absolute";
                    (function(acc){
                        btn3.addEventListener('click',function(){
                            let sql1="DELETE FROM user WHERE UserName='"+acc+"';";
                            $(document).ready(function(){
                                $.ajax({
                                    url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                    type:"POST",
                                    data:{
                                        msg:sql1
                                    },
                                    dataType:"html",
                                    success:function(){
                                        sql1="DELETE FROM userhistory WHERE UserName='"+acc+"';";
                                        $(document).ready(function(){
                                            $.ajax({
                                                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                                type:"POST",
                                                data:{
                                                    msg:sql1
                                                },
                                                dataType:"html",
                                                success:function(){
                                                    sql1="DELETE FROM userlike WHERE UserName='"+acc+"';";
                                                    $(document).ready(function(){
                                                        $.ajax({
                                                            url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                                            type:"POST",
                                                            data:{
                                                                msg:sql1
                                                            },
                                                            dataType:"html",
                                                            success:function(){
                                                                alert("The account already canceled successfully");
                                                                while(document.getElementById("user_list").firstChild){
                                                                    document.getElementById("user_list").removeChild(document.getElementById("user_list").firstChild);
                                                                }
                                                                go_gl();
                                                            }
                                                        })
                                                    })
                                                }
                                            })
                                        })
                                    }
                                })
                            })
                        })
                    })(res[i][1])
                    btn3.addEventListener('mouseover',function(){
                        btn3.style.backgroundColor="rgb(182, 5, 5)";
                    })
                    btn3.addEventListener('mouseout',function(){
                        btn3.style.backgroundColor="rgb(244, 6, 6)";
                    })
                    li.appendChild(img);
                    li.appendChild(span1);
                    li.appendChild(span2);
                    li.appendChild(btn1);
                    li.appendChild(btn2);
                    li.appendChild(btn3);
                    document.getElementById("user_list").appendChild(li);
                }
                const list1=document.querySelector("#user_list");
                const items1=list1.querySelectorAll("li");
                originalItems3=Array.from(items1);
            },
            error:function(){
                console.log("connection database error")
            }
        });
    });
}
function show_uinput(){
    event.preventDefault();
    document.getElementById("u_bf").style.display="none";
    document.getElementById("u_search_af").style.display="block";
    document.getElementById("user_search").style.display="block";
}
function u_in(){
    const searchInput=document.querySelector("#user_search");
    const list=document.querySelector("#user_list");
    const items=list.querySelectorAll("li");
    const key=document.getElementById("user_search").value.trim().toLowerCase();
    if(key){
        items.forEach((item)=>{
            const span=item.querySelector("#span1");
            if(span.textContent.toLowerCase().indexOf(key)!==-1){
                list.insertBefore(item,list.firstChild);
                span.innerHTML=span.textContent.replace(new RegExp('('+key+')','ig'),'<span class="highlight">$1</span>');
            }else{
                span.innerHTML=span.textContent;
            }
        })
    }else{
        originalItems3.forEach((item,index)=>{
            const span1=item.querySelector("#span1");
            const span11=originalItems3[index].querySelector("#span1");
            if(index!==0)
            list.appendChild(item);
            span1.innerHTML=span11.textContent;
        })
    }
}
function h_u(){
    document.getElementById("u_search_af").style.display="none";
    document.getElementById("user_search").style.display="none";
    document.getElementById("u_bf").style.display="block";
}
function _color11(){
    if(document.getElementById("xg_yhm").value.length==0){
        document.getElementById("input_error_tip1").style.display="none";
    }
}
var is_not_change_image=0;
function change_image(){
    event.preventDefault();
    document.getElementById("open_file").click();
    document.getElementById("open_file").addEventListener("change",(event)=>{
        const file=event.target.files[0];
        const formData=new FormData();
        formData.append('avatar',file);
        formData.append('msg',localStorage.getItem("acc"));
        const xhr=new XMLHttpRequest();
        xhr.open('POST','http://localhost/online_disk/conndbconfig/upload_image.php');
        xhr.send(formData);
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>{
            is_not_change_image=1;
            alert("Modify Profile Picture Successfully");
            document.getElementById("xg_tx").src=reader.result;
            window.location.href="http://localhost/online_disk/My_Home.html";
        }
    });
}
function del_acc(){
    event.preventDefault();
    document.getElementById("off_background").style.display="block";
    document.getElementById("off_confirm").disabled=true;
    document.getElementById("djs").style.display="block";
    document.getElementById("djs").innerHTML="(10)";
    var tm=10;
    var t=setInterval(function(){
        tm--;
        document.getElementById("djs").innerHTML="("+tm+")";
        if(tm==0){
            clearInterval(t);
            document.getElementById("off_confirm").disabled=false;
            document.getElementById("djs").style.display="none";
        }
    },1000)
}
function cha_cha_off(){
    event.preventDefault();
    document.getElementById("off_background").style.display="none";
}
function off_no(){
    event.preventDefault();
    document.getElementById("off_background").style.display="none";
}
function off_ok(){
    event.preventDefault();
    var acc=localStorage.getItem("acc");
    var sql="DELETE FROM userhistory WHERE UserName='"+acc+"';";
    $(document).ready(function(){
        $.ajax({
            url:"http://localhost/online_disk/conndbconfig/postUser.php",
            type:"POST",
            data:{
                msg:sql
            },
            dataType:"html",
            success:function(){
                sql="DELETE FROM userlike WHERE UserName='"+acc+"';";
                $(document).ready(function(){
                    $.ajax({
                        url:"http://localhost/online_disk/conndbconfig/postUser.php",
                        type:"POST",
                        data:{
                            msg:sql
                        },
                        dataType:"html",
                        success:function(){
                            sql="DELETE FROM user WHERE UserName='"+acc+"';";
                            $(document).ready(function(){
                                $.ajax({
                                    url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                    type:"POST",
                                    data:{
                                        msg:sql
                                    },
                                    dataType:"html",
                                    success:function(){
                                        alert("Log Out successfully");
                                        localStorage.removeItem("login_state");
                                        window.location.href="http://localhost/online_disk/search_resource.html";
                                    }
                                })
                            })
                        }
                    })
                })
            },
            error:function(){
                console.log("connection database error")
            }
        });
    });
}
function _color22(){
    if(document.getElementById("xg_mm").value.length==0){
        document.getElementById("input_error_tip2").style.display="none";
    }
}
function _color33(){
    if(document.getElementById("qr_mm").value.length==0){
        document.getElementById("input_error_tip3").style.display="none";
    }
}
function _color44(){
    if(document.getElementById("xg_dh").value.length==0){
        document.getElementById("input_error_tip4").style.display="none";
    }
}
function _color1(){
    document.getElementById("xg_yhm").style.borderColor="rgb(13, 174, 255)";
}
function check_yhm(){
    if(document.getElementById("xg_yhm").value.length>0){
        if(document.getElementById("xg_yhm").value.match(/[\s\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\:\;\"\'\<\>\?\,\.\|\\\/]/g)){
            document.getElementById("input_error_tip1").style.display="block";
            document.getElementById("input_error_tip1").style.color="red";
            document.getElementById("input_error_tip1").innerHTML="Only support number/letter/underline/chinese";
            document.getElementById("xg_yhm").style.borderColor="red";
        }else{
            document.getElementById("xg_yhm").style.borderColor="rgb(18, 254, 41)";
            document.getElementById("input_error_tip1").style.display="none";
        }
    }else{
        document.getElementById("input_error_tip1").style.display="none";
        document.getElementById("xg_yhm").style.borderColor="darkgray";
    }
}
function _color2(){
    document.getElementById("xg_mm").style.borderColor="rgb(13, 174, 255)";
}
function check_mm(){
    if(document.getElementById("xg_mm").value.length>0){
        if(document.getElementById("xg_mm").value.match(/[\u4e00-\u9fff\u3400-\u4dff\s]+/g)){
            document.getElementById("input_error_tip2").style.display="block";
            document.getElementById("input_error_tip2").style.color="red";
            document.getElementById("input_error_tip2").innerHTML="Don`t allow chinese/space";
            document.getElementById("xg_mm").style.borderColor="red";
        }else{
            document.getElementById("xg_mm").style.borderColor="rgb(18, 254, 41)";
            document.getElementById("input_error_tip2").style.display="none";
        }
    }else{
        document.getElementById("input_error_tip2").style.display="none";
        document.getElementById("xg_mm").style.borderColor="darkgray";
    }
}
function _color3(){
    document.getElementById("qr_mm").style.borderColor="rgb(13, 174, 255)";
}
function check_mm2(){
    if(document.getElementById("qr_mm").value.length>0){
        if(document.getElementById("qr_mm").value!==document.getElementById("xg_mm").value){
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
    document.getElementById("xg_dh").style.borderColor="rgb(13, 174, 255)";
}
function check_phone(){
    if(document.getElementById("xg_dh").value.length>0){
        if(document.getElementById("xg_dh").value.match(/[^0-9]/g)||document.getElementById("xg_dh").value.length<11){
            document.getElementById("input_error_tip4").style.display="block";
            document.getElementById("input_error_tip4").style.color="red";
            document.getElementById("input_error_tip4").innerHTML="Wrong phone number format";
            document.getElementById("xg_dh").style.borderColor="red";
        }else{
            document.getElementById("xg_dh").style.borderColor="rgb(18, 254, 41)";
            document.getElementById("input_error_tip4").style.display="none";
        }
    }else{
        document.getElementById("input_error_tip4").style.display="none";
        document.getElementById("xg_dh").style.borderColor="darkgray";
    }
}
function go_save(){
    if(document.getElementById("input_error_tip1").style.display==="block"||document.getElementById("input_error_tip2").style.display==="block"||document.getElementById("input_error_tip3").style.display==="block"||document.getElementById("input_error_tip4").style.display==="block"){
        alert("Error");
        event.preventDefault();
    }else{
    var acc=document.getElementById("xg_yhm").value;
    var psw=document.getElementById("xg_mm").value;
    var dh=document.getElementById("xg_dh").value;
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
                        flag=0;
                        break;
                    }else if(res[i][3]===dh){
                        alert("The phonenumber has been registered !");
                        flag=0;
                        break;
                    }else if(res[i][2]===SHA256(psw)){
                        alert("The new password cannot be the same as the old password !");
                        flag=0;
                        break;
                    }
                }
                if(flag===1){
                    if(acc!=""){                 
                        sql="UPDATE User SET UserName='"+acc+"' WHERE UserName='"+localStorage.getItem("acc")+"';";
                        $(document).ready(function(){
                            $.ajax({
                                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                type:"POST",
                                data:{
                                msg:sql
                                },
                                dataType:"html",
                                success:function(){
                                    localStorage.setItem("acc",acc);
                        if(psw!=""){
                            sql="UPDATE User SET PassWord='"+SHA256(psw)+"' WHERE UserName='"+localStorage.getItem("acc")+"';";
                            $(document).ready(function(){
                                $.ajax({
                                    url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                    type:"POST",
                                    data:{
                                    msg:sql
                                    },
                                    dataType:"html",
                                    success:function(){
                                        localStorage.setItem("psw",SHA256(psw));
                                        localStorage.removeItem("login_state");
                            if(dh!=""){
                                sql="UPDATE User SET Phone='"+dh+"' WHERE UserName='"+localStorage.getItem("acc")+"';";
                                $(document).ready(function(){
                                    $.ajax({
                                        url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                        type:"POST",
                                        data:{
                                        msg:sql
                                        },
                                        dataType:"html",
                                        success:function(){
                                            alert("Modify SuccessFully");
                                            localStorage.removeItem("rg_set");
                                            window.location.href="http://localhost/online_disk/My_Home.html";
                                        }
                                    });
                                });
                            }else{
                                alert("Modify SuccessFully");
                                localStorage.removeItem("rg_set");
                                window.location.href="http://localhost/online_disk/My_Home.html";
                            }
                                    }
                                });
                            });
                            
                        }else{
                            alert("Modify SuccessFully");
                            localStorage.removeItem("rg_set");
                            window.location.href="http://localhost/online_disk/My_Home.html";
                        }
                                },error:function(jqXHR, textStatus, errorThrown){
                                    console.log(errorThrown)
                                }
                            });
                        });   
                    }else{
                        var p1=0,p2=0;
                        if(psw!=""){
                            sql="UPDATE User SET PassWord='"+SHA256(psw)+"' WHERE UserName='"+localStorage.getItem("acc")+"';";
                            console.log(sql);
                            $(document).ready(function(){
                                $.ajax({
                                    url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                    type:"POST",
                                    data:{
                                    msg:sql
                                    },
                                    dataType:"html",
                                    success:function(){
                                        localStorage.setItem("psw",SHA256(psw));
                                        p1=1;
                                        localStorage.removeItem("login_state");
                                    }
                                })
                            })
                        }else{p1=1;}
                        if(dh!=""){
                            sql="UPDATE User SET Phone='"+dh+"' WHERE UserName='"+localStorage.getItem("acc")+"';";
                            $(document).ready(function(){
                                $.ajax({
                                    url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                    type:"POST",
                                    data:{
                                    msg:sql
                                    },
                                    dataType:"html",
                                    success:function(){
                                        p2=1;
                                    }
                                })
                            })
                        }else{p2=1;}
                        while(p1!=1&&p2!=1){
                            
                        }
                        alert("Modify SuccessFully");
                        localStorage.removeItem("rg_set");
                        window.location.href="http://localhost/online_disk/My_Home.html";
                    }
                }
            }
        });
    });}
}
function go_back(){
    localStorage.removeItem("rg_set");
    document.getElementById("xg_yhm").value="";
    document.getElementById("xg_mm").value="";
    document.getElementById("qr_mm").value="";
    document.getElementById("xg_dh").value="";
    check_yhm();check_mm();check_mm2();check_phone();
    document.getElementById("txt1").innerHTML="My Home";
    document.getElementsByClassName("body")[0].style.display="block";
    document.getElementsByClassName("body2")[0].style.display="none";
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
                                var d=new Date();
                                var arr=d.toLocaleTimeString().split(":");
                                var dtime=d.toLocaleDateString()+" "+arr[0]+":"+arr[1];
                                d.setFullYear(d.getFullYear()-1);
                                var ydtime=d.toLocaleDateString()+" "+arr[0]+":"+arr[1];
                                d.setFullYear(d.getFullYear()+1);
                                d.setMonth(d.getMonth()-1);
                                var mdtime=d.toLocaleDateString()+" "+arr[0]+":"+arr[1];
                                d.setMonth(d.getMonth()+1);
                                if(res[i][5]<ydtime){
                                    let sql1="DELETE FROM user WHERE UserName='"+acc+"';";
                                    $(document).ready(function(){
                                    $.ajax({
                                        url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                        type:"POST",
                                        data:{
                                            msg:sql1
                                        },
                                        dataType:"html",
                                        success:function(){
                                            sql1="DELETE FROM userhistory WHERE UserName='"+acc+"';";
                                            $(document).ready(function(){
                                                $.ajax({
                                                    url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                                    type:"POST",
                                                    data:{
                                                        msg:sql1
                                                    },
                                                    dataType:"html",
                                                    success:function(){
                                                        sql1="DELETE FROM userlike WHERE UserName='"+acc+"';";
                                                        $(document).ready(function(){
                                                            $.ajax({
                                                                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                                                type:"POST",
                                                                data:{
                                                                    msg:sql1
                                                                },
                                                                dataType:"html",
                                                                success:function(){
                                                                    alert("The UserName not exist or already logged out");
                                                                }
                                                            })
                                                        })
                                                    }
                                                })
                                            })
                                        }
                                    })
                                })
                                }else if(res[i][5]<mdtime){
                                    sql="UPDATE User SET state='lock' WHERE UserName='"+acc+"';";
                                        $(document).ready(function(){
                                            $.ajax({
                                                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                                type:"POST",
                                                data:{
                                                    msg:sql
                                                },
                                                dataType:"html",
                                                success:function(){
                                                    alert("The account already lockded,Please ask manager to unlock")
                                                }
                                            })
                                        })
                                }else{
                                    if(res[i][6]==="none"){
                                        alert("Login Successfully");
                                        sql="UPDATE User SET lasttime='"+dtime+"' WHERE UserName='"+acc+"';";
                                        $(document).ready(function(){
                                            $.ajax({
                                                url:"http://localhost/online_disk/conndbconfig/postUser.php",
                                                type:"POST",
                                                data:{
                                                    msg:sql
                                                },
                                                dataType:"html",
                                                success:function(){
                                                    localStorage.setItem("login_state",res[i][6]);
                                                    localStorage.setItem("acc",acc);
                                                    localStorage.setItem("psw",SHA256(psw));
                                                    window.location.href="http://localhost/online_disk/search_resource.html";
                                                }
                                            })
                                        })
                                    }else if(res[i][6]==="lock"){
                                        alert("The account already lockded,Please ask manager to unlock")
                                    }
                                }
                                break;
                            }else{
                                alert("PassWord Error");
                                break;
                            }
                        }
                    }
                    if(flag===0){
                        alert("The UserName not exist");
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
function cha_cha2(){
    event.preventDefault();
    document.getElementById("back_page").style.display="none";
}
function exit_no(){
    event.preventDefault();
    document.getElementById("back_page").style.display="none";
}
function exit_yes(){
    event.preventDefault();
    localStorage.removeItem("rg_set");
    localStorage.removeItem("login_state");
    localStorage.removeItem("acc");
    localStorage.removeItem("psw");
    window.location.href="http://localhost/online_disk/search_resource.html";
}