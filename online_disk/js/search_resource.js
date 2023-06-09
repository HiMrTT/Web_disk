let choose_city_time=null;
function get_login_state(){
    var data=localStorage.getItem("login_state");
    if(data==="none"){
        document.getElementsByClassName("weather")[0].style.display="block";
        document.getElementById("state").style.display="block";
        document.getElementById("login_btn").style.display=data;
        document.getElementById("login_after").style.display="block";
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
                            document.getElementById("user_img").src=res[i][0];
                            document.getElementById("user_name").innerHTML=res[i][1];
                            break;
                        }
                    }
                },
                error:function(){
                    console.log("connection database error")
                }
            });
        });
    }
}
function getLoaction(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(load_page,show_error)
    }else{
        alert("Failed to get address")
    }
    var date=new Date();
    const options={
        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric'
    };
    document.getElementById("yl_date").innerHTML=date.toLocaleString('en-US',options).replaceAll(","," ");
    document.getElementById("set_weather").addEventListener('mouseover',function(){
        document.getElementById("choose_city").style.display="none";
        document.getElementById("later_weather_head").style.display="block";
        document.getElementById("later_weather_body").style.display="block";
    })
    get_login_state();
}
function load_page(position){
    if(navigator.geolocation){
        const latitude=position.coords.latitude;
        const longitude=position.coords.longitude;
        var ask_city=longitude+","+latitude;
        var city_id;
        var city_url=`https://geoapi.qweather.com/v2/city/lookup?location=${ask_city}&key=74c2c62478c443e485c4757608f0334c`;
        fetch(city_url)
        .then(response=>response.json())
        .then(data=>{
            city_id=data.location[0].id;
            document.getElementById("set_weather").href=data.location[0].fxLink;
            document.getElementById("w_forcast").href=data.location[0].fxLink;
            document.getElementById("city").innerHTML=data.location[0].name;
            document.getElementById("wl_1").href=data.location[0].fxLink;
            document.getElementById("wl_2").href=data.location[0].fxLink;
            document.getElementById("wl_3").href=data.location[0].fxLink;
            document.getElementById("wl_4").href=data.location[0].fxLink;
            document.getElementById("wl_5").href=data.location[0].fxLink;
            var wearther_url=`https://devapi.qweather.com/v7/weather/now?location=${city_id}&key=74c2c62478c443e485c4757608f0334c`;
            fetch(wearther_url)
            .then(response=>response.json())
            .then(data=>{
                document.getElementById("weather_img").src=`http://localhost/online_disk/images/icons/${data.now.icon}.png`;
                document.getElementById("temp").innerHTML=data.now.temp+"℃";
            }).catch(error=>console.error(error))
            var air_url=`https://devapi.qweather.com/v7/air/now?location=${city_id}&key=74c2c62478c443e485c4757608f0334c`;
            fetch(air_url)
            .then(response=>response.json())
            .then(data=>{
                if(data.now.category=="优"){
                    document.getElementById("state").innerHTML="A+";
                    document.getElementById("state").style.backgroundColor="rgb(71, 237, 71)";
                }else if(data.now.category=="良"){
                    document.getElementById("state").innerHTML="A";
                    document.getElementById("state").style.backgroundColor="rgb(251, 255, 6)";
                }else if(data.now.category=="轻度污染"){
                    document.getElementById("state").innerHTML="B";
                    document.getElementById("state").style.backgroundColor="rgb(239, 109, 16)";
                }else if(data.now.category=="中度污染"){
                    document.getElementById("state").innerHTML="B+";
                    document.getElementById("state").style.backgroundColor="rgb(205, 29, 29)";
                }else if(data.now.category=="重度污染"){
                    document.getElementById("state").innerHTML="C";
                    document.getElementById("state").style.backgroundColor="rgb(132, 11, 169)";
                }else if(data.now.category=="严重污染"){
                    document.getElementById("state").innerHTML="D";
                    document.getElementById("state").style.backgroundColor="rgb(116, 41, 41)";
                }
                //document.getElementById("weather_img").src="";
                //document.getElementById("temp").innerHTML=data.now.temp+"℃";
            }).catch(error=>console.error(error))
            var wl_weather_condition=`https://devapi.qweather.com/v7/weather/7d?location=${city_id}&key=74c2c62478c443e485c4757608f0334c`
            fetch(wl_weather_condition)
            .then(response=>response.json())
            .then(data=>{
                var d=new Date();
                options={
                    weekday:'long'
                }
                d.setDate(d.getDate());
                document.getElementById("wl_date1").innerHTML=d.toLocaleString('en-US',options)+"(Today)";
                document.getElementById("wl_icon1").src=`http://localhost/online_disk/images/icons/${data.daily[0].iconDay}.png`;
                document.getElementById("wl_temp1").innerHTML=data.daily[0].tempMin+"℃~"+data.daily[0].tempMax+"℃";
                document.getElementById("wl_condition1").innerHTML=data.daily[0].textDay;
                document.getElementById("wl_wind1").innerHTML=data.daily[0].windDirDay+" "+data.daily[0].windScaleDay+"级";
                d.setDate(d.getDate()+1);
                document.getElementById("wl_date2").innerHTML=d.toLocaleString('en-US',options);
                document.getElementById("wl_icon2").src=`http://localhost/online_disk/images/icons/${data.daily[1].iconDay}.png`;
                document.getElementById("wl_temp2").innerHTML=data.daily[1].tempMin+"℃~"+data.daily[1].tempMax+"℃";
                document.getElementById("wl_condition2").innerHTML=data.daily[1].textDay;
                document.getElementById("wl_wind2").innerHTML=data.daily[1].windDirDay+" "+data.daily[1].windScaleDay+"级";
                d.setDate(d.getDate()+1);
                document.getElementById("wl_date3").innerHTML=d.toLocaleString('en-US',options);
                document.getElementById("wl_icon3").src=`http://localhost/online_disk/images/icons/${data.daily[2].iconDay}.png`;
                document.getElementById("wl_temp3").innerHTML=data.daily[2].tempMin+"℃~"+data.daily[2].tempMax+"℃";
                document.getElementById("wl_condition3").innerHTML=data.daily[2].textDay;
                document.getElementById("wl_wind3").innerHTML=data.daily[2].windDirDay+" "+data.daily[2].windScaleDay+"级";
                d.setDate(d.getDate()+1);
                document.getElementById("wl_date4").innerHTML=d.toLocaleString('en-US',options);
                document.getElementById("wl_icon4").src=`http://localhost/online_disk/images/icons/${data.daily[3].iconDay}.png`;
                document.getElementById("wl_temp4").innerHTML=data.daily[3].tempMin+"℃~"+data.daily[3].tempMax+"℃";
                document.getElementById("wl_condition4").innerHTML=data.daily[3].textDay;
                document.getElementById("wl_wind4").innerHTML=data.daily[3].windDirDay+" "+data.daily[3].windScaleDay+"级";
                d.setDate(d.getDate()+1);
                document.getElementById("wl_date5").innerHTML=d.toLocaleString('en-US',options);
                document.getElementById("wl_icon5").src=`http://localhost/online_disk/images/icons/${data.daily[4].iconDay}.png`;
                document.getElementById("wl_temp5").innerHTML=data.daily[4].tempMin+"℃~"+data.daily[4].tempMax+"℃";
                document.getElementById("wl_condition5").innerHTML=data.daily[4].textDay;
                document.getElementById("wl_wind5").innerHTML=data.daily[4].windDirDay+" "+data.daily[4].windScaleDay+"级";
            }).catch(error=>console.error(error))
        }).catch(error=>console.error(error)) 
    }
}
function searchFiles(searchText){
    return fetch("http://localhost/online_disk/conndbconfig/searchFiles.php?search="+searchText)
    .then(response=>response.json())
    .then(files=>files.map(file=>({name:file.name,size:file.size})))
    .catch(error=>console.error(error));
}
function check_result(){
    if(localStorage.getItem("login_state"))
    if(document.getElementById("input_search").value.length<1){
        document.getElementById("searchResult").style.display="none";
        document.getElementById("input_search").style.borderBottomLeftRadius="20px";
        document.getElementById("input_search").style.borderBottom="2px solid";
        document.getElementById("input_search").style.borderBottomColor="rgb(66, 166, 177)";
    }else{
        document.getElementById("input_search").style.borderBottom="1px solid";
        document.getElementById("input_search").style.borderBottomColor="rgb(175, 183, 184)";
        document.getElementById("searchResult").style.display="block";
        document.getElementById("input_search").style.borderBottomLeftRadius=0;
        const searchText=document.getElementById("input_search").value;
        const searchResult=document.getElementById("searchResult");
        searchResult.innerHTML="";
        if(searchText.length<=0){
            return;
        }
        searchFiles(searchText)
        .then(matches=>{
            if(matches.length===0){
                searchResult.innerHTML="Don`t find any files";
            }else{
                const ul=document.createElement("ul");
                let count=0;
                matches.forEach(match=>{
                    if (count<10){
                        const li=document.createElement("li");
                        const a=document.createElement("a");
                        var download_url="http://localhost/online_disk/conndbconfig/download.php?file=E:/download_files/"+match.name;
                        a.href=`http://localhost/online_disk/My_DownLoad.html`;
                        a.target="_blank";
                        a.textContent=match.name;
                        a.style.display="block";
                        a.style.marginLeft="-20px";
                        a.style.textDecoration="none";
                        a.style.marginBottom="10px";
                        a.style.color="black";
                        a.addEventListener('click',function(){
                            localStorage.setItem("file_name",match.name);
                            localStorage.setItem("file_size",match.size);
                            localStorage.setItem("download_url",download_url);
                        })
                        li.appendChild(a);
                        ul.appendChild(li);
                        count++;
                    }else{
                        return;
                    }    
                });
                searchResult.appendChild(ul);
            }
        }).catch(error=>console.error(error))
    }
}
function search_back(){
    if(localStorage.getItem("login_state"))
    if(document.getElementById("input_search").value.length<1){
        document.getElementById("searchResult").style.display="none";
        document.getElementById("input_search").style.borderBottomLeftRadius="20px";
        document.getElementById("input_search").style.borderBottom="2px solid";
        document.getElementById("input_search").style.borderBottomColor="rgb(66, 166, 177)"
    }else{
        document.getElementById("input_search").style.borderBottom="1px solid";
        document.getElementById("input_search").style.borderBottomColor="rgb(175, 183, 184)";
        document.getElementById("searchResult").style.display="block";
        document.getElementById("input_search").style.borderBottomLeftRadius=0;
        const searchText=document.getElementById("input_search").value;
        const searchResult=document.getElementById("searchResult");
        searchResult.innerHTML="";
        if(searchText.length<=0){
            return;
        }
        searchFiles(searchText)
        .then(matches=>{
            if(matches.length===0){
                searchResult.innerHTML="Don`t find any files";
            }else{
                const ul=document.createElement("ul");
                let count=0;
                matches.forEach(match=>{
                    if (count<10){
                        const li=document.createElement("li");
                        const a=document.createElement("a");
                        var download_url="http://localhost/online_disk/conndbconfig/download.php?file=E:/download_files/"+match.name;
                        a.href=`http://localhost/online_disk/My_DownLoad.html`;
                        a.target="_blank";
                        a.textContent=match.name;
                        a.style.display="block";
                        a.style.marginLeft="-20px";
                        a.style.textDecoration="none";
                        a.style.marginBottom="10px";
                        a.style.color="black";
                        a.addEventListener('click',function(){
                            localStorage.setItem("file_name",match.name);
                            localStorage.setItem("file_size",match.size);
                            localStorage.setItem("download_url",download_url);
                        })
                        li.appendChild(a);
                        ul.appendChild(li);
                        count++;
                    }else{
                        return;
                    }    
                });
                searchResult.appendChild(ul);
            }
        }).catch(error=>console.error(error))
    }
}
function hidden_result(){
    if(localStorage.getItem("login_state")){
        document.getElementById("input_search").style.borderBottom="2px solid";
        document.getElementById("input_search").style.borderBottomColor="rgb(175, 183, 184)";
        setTimeout(function(){
            document.getElementById("searchResult").style.display="none";
            document.getElementById("input_search").style.borderBottomLeftRadius="20px";
        },150);
    }
}
function show_error(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            console.error("User refuse to ask with location");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Don`t gain now location");
            break;
        case error.TIMEOUT:
            console.error("Gaining location is timeout");
            break;
        case error.UNKNOWN_ERROR:
            console.error("Happen unknown error");
            break;
    }
}
let hideTimer=null;
function show_block(){
    clearTimeout(hideTimer);
    document.getElementById("check_weather").style.display="block";
}
function hidden_block(){
    hideTimer=setTimeout(function(){
       document.getElementById("check_weather").style.display="none";
    }, 500);
}
function change_city(){
    event.preventDefault();
    document.getElementById("later_weather_head").style.display="none";
    document.getElementById("later_weather_body").style.display="none";
    let flag1=true;
    let flag2=true;
    function handleSetWeatherMousemove(){
        flag1=true;
    }
    function handleCheckWeatherMousemove(){
        flag2=true;
    }
    function handleSetWeatherMouseleave(){
        flag1=false;
        checkFlag();
    }
    function handleCheckWeatherMouseleave(){
        flag2=false;
        checkFlag();
    }
    function checkFlag(){
        if (!flag1&&!flag2){
        setTimeout(function(){
            document.getElementById("later_weather_head").style.display="block";
            document.getElementById("later_weather_body").style.display="block";
            document.getElementById("choose_city").style.display="none";
        },500)
        }
    }
    document.getElementById("check_weather").addEventListener('mouseleave',handleCheckWeatherMouseleave);
    document.getElementById("set_weather").addEventListener('mouseleave',handleSetWeatherMouseleave);
    document.getElementById("set_weather").addEventListener('mousemove',handleSetWeatherMousemove);
    document.getElementById("check_weather").addEventListener('mousemove',handleCheckWeatherMousemove);
    document.getElementById("choose_city").style.display="block";
}
function get_province(){
    document.getElementById("province_selector").style.display="block";
}
function load_city(){
    document.getElementById("province_selector").addEventListener('click',function(){
        document.getElementById("province_selector").style.display="none";
    })
    clearTimeout(choose_city_time);
    document.getElementById("choose_city").style.display="block";
    var p_s=document.getElementById("province_selector");
    var p_v=p_s.options[p_s.selectedIndex].value;
    document.getElementById("province_context").value=p_s.options[p_s.selectedIndex].text;
    var c_s=document.getElementById("city_selector");
    c_s.length=1;
    if(p_v==="")return;
    setTimeout(function(){
        var cities=get_citys(p_v);
        for(var i=0;i<cities.length;i++){
            var option=document.createElement("option");
            option.text=cities[i];
            option.value=cities[i];
            c_s.add(option);
        }
        c_s.remove(0);
    },1000);
}
function get_city(){
    document.getElementById("city_selector").style.display="block";
}
function keep_choose(){
    document.getElementById("city_context").value=document.getElementById("city_selector").value;
    document.getElementById("city_selector").addEventListener('click',function(){
        document.getElementById("city_selector").style.display="none";
    })
}
function get_citys(province){
    switch (province) {
        case "beijing":
            return ["北京", "通州", "朝阳", "昌平", "顺义", "怀柔", "海淀", "石景山", "密云", "房山", "丰台", "平谷", "大兴", "门头沟", "延庆", "东城", "西城"];
        case "shanghai":
            return ["上海", "崇明", "宝山", "闵行", "嘉定", "奉贤", "松江", "青浦", "徐汇", "金山", "浦东新区", "长宁", "黄浦", "普陀", "虹口", "静安", "杨浦"];
        case "guangdong":
            return ["广州","廉江","紫金","南沙","信宜","清远","翁源","四会","东莞","斗门","梅县","普宁","顺德","恩平","汕尾","茂名","和平","韶关","怀集","连山","乐昌","博罗","饶平","澄海","五华","郁南","新会","徐闻","河源","花都","化州","阳春","仁化","高要","连州","珠海","梅州","惠来","南海","鹤山","兴宁","吴川","连平","从化","广宁","阳山","新丰","惠阳","潮州","潮阳","丰顺","新兴","江门","遂溪","陆丰","番禺","高州","阳江","始兴","德庆","英德","深圳","龙门","揭西","佛山","开平","蕉岭","雷州","龙川","增城","肇庆","佛冈","乳源","惠州","中山","汕头","大埔","云浮","三水","湛江","海丰","电白","东源","曲江","封开","连南","南雄","惠东","揭阳","南澳","平远","罗定","台山","金湾","揭东","潮安","麻章","清新","云安","坡头","高明","茂港","霞山","蓬江","阳西","浈江","荔城","武江","陆河","阳东","赤坎","荔湾","香洲","梅江","宝安","清城","禅城","濠江","潮南","惠城","榕城","金平","鼎湖","南山","白云","越秀","端州","龙湖","湘桥","龙岗","茂南","江城","黄埔","云城","福田","源城","海珠","江海","盐田","罗湖","天河"];
        case "zhejiang":
            return ["杭州","桐庐","平湖","云和","鄞州","新昌","兰溪","龙游","洞头","台州","嘉兴","丽水","富阳","德清","嵊州","余姚","永康","定海","文成","天台","萧山","海宁","遂昌","北仑","绍兴","浦江","温州","开化","嵊泗","乐清","临海","建德","湖州","上虞","龙泉","宁海","东阳","舟山","平阳","三门","海盐","缙云","宁波","安吉","武义","奉化","常山","岱山","瑞安","温岭","淳安","桐乡","庆元","象山","诸暨","义乌","江山","永嘉","玉环","嘉善","青田","临安","长兴","金华","慈溪","衢州","普陀","泰顺","磐安","苍南","椒江","镇海","景宁","余杭","黄岩","衢江","松阳","路桥","吴兴","越城","南浔","鹿城","婺城","柯城","江干","南湖","下城","莲都","龙湾","金东","西湖","海曙","江北","滨江","秀洲","仙居","柯桥","拱墅","上城"];
        case "tianjing":
            return ["天津", "西青", "武清", "东丽", "北辰", "蓟县", "宁河", "津南", "宝坻", "静海", "河东", "蓟州", "红桥", "河北", "河西", "南开", "和平", "滨海新区"];
        case "hebei":
            return ["石家庄","平山","邱县","望都","宽城","景县","唐山","邢台","涿州","肃宁","玉田","宁晋","康保","黄骅","抚宁","临西","怀来","文安","高邑","涉县","唐县","平泉","武强","辛集","馆陶","曲阳","青县","深州","滦县","柏乡","高碑店","献县","迁安","广宗","蔚县","固安","正定","峰峰","保定","崇礼","三河","无极","永年","涞源","丰宁","故城","新乐","武安","盐山","迁西","南和","张北","任丘","昌黎","清河","万全","大城","灵寿","大名","徐水","兴隆","武邑","赵县","广平","易县","沧州","冀州","丰润","内丘","安国","吴桥","遵化","新河","尚义","廊坊","井陉","邯郸","沙河","赤城","霸州","赞皇","肥乡","隆化","安平","晋州","曲周","顺平","海兴","曹妃甸","乐亭","任县","宣化","泊头","青龙","威县","怀安","香河","行唐","成安","阜平","承德","枣强","元氏","鸡泽","围场","阜城","丰南","临城","定州","南皮","曹妃甸区","巨鹿","沽源","河间","卢龙","涿鹿","大厂","深泽","磁县","高阳","滦平","饶阳","藁城","魏县","蠡县","东光","滦南","隆尧","张家口","孟村","秦皇岛","平乡","阳原","永清","栾城","临漳","满城","衡水","定兴","北戴河","鹿泉","清苑","承德县","博野","涞水","沧县","路南","路北","桥西","裕华","开平","古冶","下花园","双桥","井陉矿区","运河","安次","海港","广阳","新华","邯山","山海关","竞秀","莲池","复兴","桥东","长安","桃城","鹰手营子矿","南宫","丛台","双滦"];
        case "shanxi":
            return ["太原", "潞城", "垣曲", "永和", "清徐", "平鲁", "定襄", "文水", "广灵", "榆社", "五寨", "方山", "盂县", "平遥", "曲沃", "长子", "闻喜", "吉县", "阳城", "芮城", "侯马", "古交", "右玉", "繁峙", "临县", "左云", "昔阳", "保德", "孝义", "屯留", "运城", "洪洞", "沁源", "绛县", "隰县", "朔州", "忻州", "离石", "天镇", "榆次", "神池", "岚县", "平定", "祁县", "临汾", "壶关", "万荣", "浮山", "沁水", "平陆", "汾西", "娄烦", "应县", "代县", "兴县", "浑源", "和顺", "河曲", "交口", "襄垣", "介休", "襄汾", "沁县", "新绛", "大宁", "高平", "河津", "吕梁", "阳高", "晋中", "静乐", "石楼", "阳泉", "太谷", "原平", "黎城", "临猗", "安泽", "晋城", "夏县", "蒲县", "阳曲", "山阴", "交城", "灵丘", "左权", "岢岚", "中阳", "长治", "灵石", "翼城", "武乡", "稷山", "乡宁", "陵川", "永济", "霍州", "大同", "怀仁", "宁武", "柳林", "大同县", "寿阳", "偏关", "汾阳", "平顺", "古县", "小店区", "泽州", "尖草坪区", "五台县", "盐湖", "晋源", "万柏林", "矿区", "郊区", "忻府", "南郊", "尧都", "迎泽", "朔城", "杏花岭", "新荣"];
        case "liaoning":
            return ['沈阳', '金州', '盘锦', '岫岩', '桓仁', '兴城', '义县', '法库', '彰武', '普兰店', '西丰', '新宾', '凌源', '东港', '营口', '灯塔', '台安', '本溪县', '建昌', '黑山', '康平', '阜新', '瓦房店', '铁岭', '抚顺', '北票', '宽甸', '北镇', '大连', '辽阳', '鞍山', '开原', '本溪', '绥中', '锦州', '辽中', '大石桥', '长海', '大洼', '海城', '喀左', '丹东', '凌海', '新民', '庄河', '昌图', '清原', '葫芦岛', '凤城', '盖州', '朝阳市', '旅顺', '调兵山', '建平县', '弓长岭', '细河', '西市', '顺城', '龙港', '海州', '朝阳', '平山', '沙河口', '于洪', '中山', '新抚', '立山', '太和', '沈河', '白塔', '铁东', '南芬', '龙城', '清河', '兴隆台', '宏伟', '双台子', '清河门', '老边', '盘山', '凌河', '铁西', '辽阳县', '浑南', '溪湖', '鲅鱼圈', '皇姑', '明山', '大东', '西岗', '双塔', '振安', '连山', '和平', '太平', '振兴', '沈北新区', '甘井子', '望花', '银州', '古塔', '新邱', '元宝', '苏家屯', '文圣', '千山', '南票', '太子河', '东洲', '站前'];
        case "jilin":
            return ["长春", "吉林", "双辽", "梅河口", "德惠", "洮南", "四平", "龙井", "通化", "靖宇", "双阳", "扶余", "蛟河", "延吉", "公主岭", "安图", "柳河", "松原", "榆树", "通榆", "磐石", "珲春", "东丰", "白山", "乾安", "永吉", "延边", "伊通", "汪清", "辉南", "临江", "九台", "镇赉", "舒兰", "敦化", "辽源", "集安", "长岭", "大安", "梨树", "和龙", "长白", "农安", "白城", "桦甸", "图们", "前郭", "江源", "通化县", "抚松", "朝阳", "铁西", "绿园", "宽城", "龙潭", "东昌", "龙山", "丰满", "南关", "船营", "宁江", "西安", "东辽", "二道江", "浑江", "铁东", "洮北", "二道", "昌邑"];
        case "heilongjiang":
            return ["哈尔滨","宝清","北安","木兰","伊春","明水","龙江","桦川","塔河","拜泉","牡丹江","萝北","黑河","依兰","肇州","望奎","双城","嘉荫","肇东","甘南","同江","鸡东","绥芬河","集贤","孙吴","巴彦","杜尔伯特","庆安","齐齐哈尔","桦南","呼玛","克东","勃利","鹤岗","穆棱","阿城","大庆","绥化","延寿","乌伊岭","安达","泰来","抚远","鸡西","林口","双鸭山","逊克","宾县","林甸","青冈","五常","佳木斯","大兴安岭","克山","七台河","密山","宁安","呼兰","饶河","五大连池","通河","五营","绥棱","依安","汤原","漠河","讷河","东宁","绥滨","嫩江","方正","肇源","兰西","尚志","铁力","海伦","富裕","富锦","虎林","海林","友谊","麻山","红岗","昂昂溪","东山","恒山","南山","梨树","城子河","碾子山","平房","翠峦","四方台","东安","龙凤","西林","梅里斯","大同","桃山","工农","向阳","带岭","龙沙","兴安","富拉尔基","新青","铁锋","新兴","爱辉","宝山","郊区","茄子河","道里","让胡路","友好","西安","南岔","前进","香坊","阳明","东风","岭东","汤旺河","道外","上甘岭","美溪","鸡冠","红星","金山屯","乌马河","南岗","爱民","萨尔图","建华","兴山","北林","尖山","滴道","松北"];
        case "jiangsu":
            return ["南京","无锡","涟水","新沂","阜宁","张家港","仪征","如东","泰州","江宁","灌云","泗阳","徐州","金湖","溧阳","东台","太仓","镇江","海门","泰兴","高淳","睢宁","滨海","常熟","宝应","海安","句容","浦口","东海","沭阳","宜兴","盱眙","常州","建湖","吴江","江都","如皋","靖江","溧水","淮安","沛县","响水","苏州","扬州","扬中","赣榆","宿迁","江阴","洪泽","邳州","射阳","昆山","高邮","启东","兴化","六合","灌南","泗洪","丰县","盐城","金坛","大丰","南通","丹阳","连云港","姜堰","宿豫","丹徒","锡山","淮阴区","盐都","吴中","武进","铜山","邗江","淮安区","鼓楼","港闸","新北","广陵","清河","京口","钟楼","姑苏","建邺","新吴","海州","惠山","滨湖","海陵","相城","通州","雨花台","宿城","栖霞","泉山","崇川","天宁","亭湖","贾汪","高港","梁溪","润州","玄武","虎丘","秦淮","云龙"];
        case "anhui":
            return ["合肥", "潜山", "无为", "黄山", "金寨", "芜湖", "全椒", "东至", "固镇", "太和", "绩溪", "铜陵", "灵璧", "望江", "六安", "黟县", "涡阳", "南陵", "天长", "宣城", "马鞍山", "界首", "枞阳", "庐江", "舒城", "肥西", "来安", "池州", "五河", "临泉", "泾县", "濉溪", "萧县", "宿松", "和县", "休宁", "亳州", "繁昌", "凤阳", "青阳", "凤台", "颍上", "宁国", "怀宁", "巢湖", "桐城", "霍邱", "肥东", "滁州", "利辛", "怀远", "阜阳", "广德", "淮北", "砀山", "太湖", "含山", "歙县", "霍山", "定远", "石台", "淮南", "阜南", "旌德", "安庆", "泗县", "岳西", "寿县", "长丰", "祁门", "蒙城", "蚌埠", "明光", "郎溪", "当涂", "宿州", "潘集", "屯溪", "芜湖县", "黄山风景区", "鸠江", "叶集", "田家庵", "庐阳", "瑶海", "埇桥", "裕安", "淮上", "贵池", "相山", "弋江", "谯城", "颍州", "迎江", "禹会", "颍泉", "三山", "镜湖", "八公山", "蚌山", "九华山", "郊区", "义安", "宣州", "黄山区", "谢家集", "雨山", "颍东", "琅琊", "金安", "博望", "南谯", "杜集", "大观", "铜官", "蜀山", "包河", "花山", "徽州", "烈山", "大通", "龙子湖", "宜秀"];
        case "fujian":
            return ['长乐', '龙海', '明溪', '邵武', '上杭', '晋江', '屏南', '闽清', '东山', '莆田', '浦城', '大田', '建阳', '泉州', '漳平', '云霄', '柘荣', '福清', '华安', '三明', '政和', '将乐', '永定', '德化', '古田', '罗源', '长泰', '同安', '顺昌', '宁化', '建瓯', '永安', '连城', '漳州', '周宁', '平潭', '平和', '仙游', '松溪', '沙县', '长汀', '永春', '霞浦', '连江', '诏安', '福鼎', '厦门', '南平', '清流', '武夷山', '建宁', '武平', '南安', '寿宁', '永泰', '南靖', '秀屿', '光泽', '尤溪', '龙岩', '安溪', '宁德', '闽侯', '漳浦', '福安', '秀屿港', '惠安', '涵江', '石狮', '翔安', '泰宁', '洛江', '龙文', '梅列', '思明', '钓鱼岛', '泉港', '城厢', '台江', '集美', '鲤城', '蕉城', '马尾', '仓山', '荔城', '丰泽', '新罗', '晋安', '鼓楼', '三元', '金门', '海沧', '芗城', '延平', '湖里'];
        case "jiangxi":
            return ['南昌', '乐平', '寻乌', '金溪', '永修', '新干', '玉山', '新余', '井冈山', '婺源', '大余', '铜鼓', '新建', '宁都', '南丰', '九江', '南康', '广昌', '都昌', '遂川', '弋阳', '余江', '万载', '安远', '高安', '景德镇', '会昌', '宜黄', '修水', '峡江', '广丰', '瑞昌', '永新', '万年','上犹', '丰城', '安义', '于都', '崇仁', '庐山', '吉安', '上饶', '湖口', '万安', '余干', '贵溪', '上高', '龙南', '抚州', '安源', '上栗', '浮梁', '芦溪', '湘东', '南昌县', '赣县', '吉州', '湾里', '章贡', '月湖', '信州', '吉安县', '东湖', '浔阳', '西湖', '渝水', '珠山', '昌江', '共青城', '临川', '青山湖', '青原', '青云谱', '袁州'];
        case "shandong":
            return ["济南", "惠民", "临淄", "海阳", "莒县", "曹县", "峄城", "安丘", "费县", "东明", "广饶", "嘉祥", "宁津", "乐陵", "章丘", "莱州", "泰安", "冠县", "莱西", "荣成", "沾化", "高青", "昌乐", "沂南", "巨野", "东营", "济宁", "蒙阴", "齐河", "长清", "牟平", "梁山", "阳谷", "胶州", "新泰", "滨州", "博山", "栖霞", "五莲", "菏泽", "薛城", "寿光", "兰陵县", "定陶", "利津", "金乡", "武城", "商河", "莱阳", "邹城", "东阿", "黄岛区", "文登", "无棣", "桓台", "临朐", "临沂", "成武", "滕州", "昌邑", "莒南", "福山", "泗水", "临邑", "聊城", "招远", "东平", "临清", "淄川", "日照", "邹平", "枣庄", "诸城", "沂水", "鄄城", "垦利", "鱼台", "德州", "夏津", "济阳", "龙口", "兖州", "茌平", "平度", "威海", "阳信", "周村", "潍坊", "莱芜", "单县", "台儿庄", "高密", "平邑", "烟台", "汶上", "庆云", "禹城", "青岛", "蓬莱", "宁阳", "高唐", "淄博", "乳山", "博兴", "沂源", "青州", "郯城", "郓城", "微山", "临沭", "平原", "平阴", "长岛", "曲阜", "莘县", "即墨", "肥城", "历城", "市北", "寒亭", "城阳", "坊子", "芝罘", "罗庄", "莱城", "天桥", "历下", "牡丹", "河东", "槐荫", "兰山", "岚山", "潍城", "李沧", "山亭", "张店", "岱岳", "莱山", "黄岛", "钢城", "市中", "滨城", "兰陵", "泰山", "环翠", "陵城", "市南", "奎文", "东昌府", "河口", "东港", "任城", "德城", "崂山"];
        case "henan":
            return ["郑州","汝阳","温县","邓州","正阳","叶县","台前","夏邑","滑县","漯河","固始","登封","获嘉","南阳","商水","孟津","焦作","社旗","驻马店","伊川","濮阳","睢县","汝南","舞钢","鄢陵","罗山","巩义","鹤壁","三门峡","息县","通许","封丘","西峡","淮阳","嵩县","武陟","桐柏","平舆","宝丰","范县","虞城","济源","汤阴","长葛","商城","新郑","新乡","灵宝","西华","洛阳","辉县","淅川","项城","洛宁","孟州","民权","泌阳","郏县","许昌","信阳","中牟","林州","临颍","淮滨","杞县","延津","方城","郸城","栾川","博爱","新野","上蔡","平顶山","南乐","柘城","新蔡","安阳","禹州","新县","新密","淇县","卢氏","扶沟","兰考","卫辉","内乡","鹿邑","宜阳","沁阳","商丘","确山","鲁山","永城","内黄","舞阳","潢川","开封","原阳","南召","沈丘","新安","修武","唐河","西平","偃师","清丰","宁陵","遂平","汝州","襄城","光山","荥阳","浚县","渑池","周口","尉氏","长垣","镇平","太康","吉利","上街","义马","殷都","祥符","金水","顺河","涧西","湛河","解放","凤泉","北关","陕州","淇滨","梁园","惠济","卫东","文峰","鼓楼","马村","宛城","浉河","华龙","中原","鹤山","瀍河","新华","红旗","卧龙","平桥","禹王台","牧野","郾城","卫滨","龙亭","洛龙","川汇","龙安","山阳","中站","管城","湖滨","驿城","二七","石龙","老城","山城","魏都","召陵","源汇","西工","睢阳"];
        case "hubei":
            return ["武汉","襄阳","咸宁","鄂州","广水","大冶","应城","咸丰","丹江口","洪湖","五峰","蕲春","保康","崇阳","黄陂","钟祥","利川","郧西","荆州","仙桃","远安","红安","枝江","武穴","宜城","随州","阳新","云梦","宣恩","房县","石首","神农架","长阳","浠水","谷城","通城","江夏","京山","恩施","郧阳区","汉川","鹤峰","夷陵","黄冈","当阳","麻城","枣阳","赤壁","黄石","大悟","巴东","竹溪","监利","天门","秭归","英山","南漳","嘉鱼","蔡甸","荆门","十堰","安陆","来凤","宜昌","松滋","宜都","黄梅","老河口","通山","新洲","孝感","建始","竹山","公安","潜江","兴山","罗田","梁子湖","孝昌","铁山","江陵","西塞山","团风","沙洋","沙市","东西湖","掇刀","下陆","襄州","东宝","随县","孝南","茅箭","江岸","黄州","硚口","伍家岗","咸安","曾都","猇亭","樊城","郧阳","鄂城","汉南","青山","黄石港","江汉","西陵","武昌","襄城","汉阳","点军","张湾","洪山","华容"];
        case "hunan":
            return ["长沙","衡阳","张家界","宁远","耒阳","溆浦","洞口","沅江","洪江","湘阴","汝城","吉首","醴陵","澧县","东安","龙山","衡南","江华","邵东","益阳","新晃","城步","宜章","新化","株洲","临湘","资兴","花垣","韶山","石门","江永","祁东","辰溪","隆回","安化","通道","华容","临武","湘西","炎陵","汉寿","祁阳","永顺","新田","邵阳","桑植","麻阳","新宁","桂阳","双峰","浏阳","汨罗","安仁","凤凰","湘乡","桃源","道县","衡东","沅陵","桃江","靖州","岳阳","嘉禾","涟源","茶陵","安乡","冷水滩","古丈","南岳","慈利","蓝山","常宁","会同","绥宁","郴州","娄底","宁乡","平江","桂东","泸溪","湘潭","临澧","双牌","衡山","怀化","新邵","南县","芷江","武冈","永兴","冷水江","攸县","常德","永州","保靖","苏仙","望城","中方","衡阳县","邵阳县","赫山区","湘江新区","津市","鹤城","长沙县","岳塘","雨湖","大祥","岳麓","芦淞","云溪","北塔","鼎城","天元","双清","君山","娄星","石鼓","天心","荷塘","永定","雨花","岳阳楼区","蒸湘","北湖","芙蓉","开福","资阳","雁峰","武陵","珠晖","武陵源","石峰","零陵"];
        case "hainan":
            return ["海口","乐东","琼海","西沙","澄迈","琼中","万宁","昌江","五指山","屯昌","保亭","文昌","白沙","三亚","定安","陵水","儋州","临高","东方","琼山","海棠","吉阳","秀英","美兰","崖州","天涯","三沙","龙华"];
        case "chongqing":
            return ['重庆', '奉节', '江津', '大足', '武隆', '石柱', '渝北', '南川', '梁平', '云阳', '涪陵', '彭水', '长寿', '铜梁', '垫江', '巫溪', '永川', '璧山', '万州', '酉阳', '黔江', '潼南', '丰都', '巫山', '北碚', '合川', '荣昌', '忠县', '秀山', '巴南', '綦江', '城口', '开州', '江北', '九龙坡', '渝中', '南岸', '沙坪坝', '大渡口'];
        case "sichuan":
            return ["成都", "叙永", "威远", "兴文", "松潘", "德昌", "昭觉", "绵竹", "沐川", "宣汉", "若尔盖", "大邑", "蓬安", "荥经", "雅江", "自贡", "平武", "洪雅", "通江", "石渠", "泸州", "遂宁", "长宁", "阿坝", "凉山", "宁南", "中江", "乐山", "岳池", "黑水", "越西", "温江", "盐亭", "渠县", "康定", "阆中", "天全", "攀枝花", "旺苍", "宜宾", "资阳", "巴塘", "合江", "内江", "筠连", "茂县", "盐源", "金阳", "什邡", "夹江", "达州", "雷波", "郫县", "营山", "名山", "九龙", "崇州", "北川", "彭山", "巴中", "白玉", "盐边", "苍溪", "江安", "简阳", "得荣", "会东", "德阳", "隆昌", "广安", "小金", "冕宁", "新都", "三台", "马边", "大竹", "甘孜", "新津", "西充", "石棉", "炉霍", "富顺", "广元", "青神", "平昌", "理塘", "泸县", "射洪", "珙县", "理县", "木里", "布拖", "广汉", "井研", "邻水", "壤塘", "美姑", "双流", "南部", "雅安", "丹巴", "邛崃", "梓潼", "仁寿", "宝兴", "德格", "米易", "剑阁", "南溪", "乐至", "稻城", "古蔺", "资中", "屏山", "金川", "会理", "喜德", "龙泉驿", "绵阳", "峨边", "开江", "红原", "蒲江", "仪陇", "汉源", "道孚", "荣县", "江油", "丹棱", "南江", "色达", "纳溪", "蓬溪", "高县", "汶川", "西昌", "普格", "罗江", "犍为", "峨眉山", "武胜", "马尔康", "甘洛", "金堂", "南充", "万源", "泸定", "彭州", "眉山", "芦山", "新龙", "仁和", "青川", "安岳", "乡城", "华蓥", "城厢", "峨眉", "通川", "朝天", "高坪", "旌阳", "安州", "市中", "雁江", "武侯", "东区", "大英", "锦江", "恩阳", "郫都", "昭化", "自流井", "沿滩", "宜宾县", "贡井", "东坡", "青白江", "西区", "顺庆", "安居", "翠屏", "达川", "金牛", "九寨沟", "江阳", "青羊", "船山", "巴州", "五通桥", "利州", "雨城", "沙湾", "东兴", "嘉陵", "前锋", "都江堰", "涪城", "龙马潭", "游仙", "金口河", "大安", "成华"];
        case "guizhou":
            return ['贵阳', '道真', '册亨', '贵定', '仁怀', '织金', '惠水', '铜仁', '施秉', '清镇', '德江', '台江', '遵义', '普安', '黔南', '湄潭', '平塘', '普定', '赫章', '白云', '玉屏', '岑巩', '水城', '万山', '从江', '正安', '望谟', '荔波', '赤水', '金沙', '龙里', '紫云', '黄平', '修文', '印江...六盘水', '沿河', '黎平', '桐梓', '晴隆', '都匀', '余庆', '大方', '罗甸', '镇宁', '黔东南', '开阳', '石阡', '天柱', '盘县', '黔西南', '雷山', '云岩', '红花岗', '南明', '钟山', '观山湖', '西秀', '碧江', '播州', '七星关'];
        case "yunnan":
            return ["昆明", "通海", "江城", "元阳", "巍山", "施甸", "永德", "砚山", "瑞丽", "宜良", "盐津", "双柏", "西双版纳", "福贡", "马龙", "丽江", "武定", "祥云", "宣威", "墨江", "建水", "峨山", "西盟", "绿春", "洱源", "东川", "昌宁", "耿马", "马关", "盈江", "禄劝", "绥江", "姚安", "勐腊", "迪庆", "罗平", "宁蒗", "个旧", "澄江", "镇沅", "泸西", "南涧", "保山", "云县", "德宏", "富民", "巧家", "富宁", "泸水", "曲靖", "威信", "元谋", "漾濞", "维西", "沾益", "宁洱", "屏边", "易门", "澜沧", "金平", "云龙", "龙陵", "双江", "麻栗坡", "梁河", "嵩明", "永善", "南华", "勐海", "兰坪", "师宗", "华坪", "红河", "江川", "景谷", "弥勒", "弥渡", "元江", "凤庆", "文山", "鹤庆", "晋宁", "鲁甸", "楚雄", "广南", "怒江", "安宁", "彝良", "永仁", "大理", "德钦", "会泽", "蒙自", "华宁", "孟连", "永平", "腾冲", "镇康", "西畴", "芒市", "石林", "大关", "牟定", "景洪", "贡山", "陆良", "永胜", "禄丰", "玉溪", "景东", "石屏", "宾川", "新平", "临沧", "剑川", "呈贡", "昭通", "沧源", "丘北", "陇川", "寻甸", "镇雄", "大姚", "香格里拉", "富源", "普洱", "开远", "水富", "中甸", "昭阳", "西山", "麒麟", "红塔", "盘龙", "玉龙", "临翔", "古城", "思茅", "官渡", "五华", "隆阳", "河口"];
        case "shanxii":
            return ['西安', '铜川', '澄城', '府谷', '扶风', '延长', '吴堡', '紫阳', '咸阳', '富县', '洛南', '彬县', '城固', '蓝田', '留坝', '宝鸡', '富平', '定边', '安康', '千阳', '安塞', '镇坪', '泾阳', '黄龙', '山阳', '淳化', '勉县', '高陵', '合阳', '神木', '岐山', '延安', '佳县', '宁陕', '太白', '甘泉', '商洛', '永寿', '南郑', '长安', '渭南', '镇巴', '宜君', '白水', '靖边', '陇县', '子长', '子洲', '平利', '三原', '宜川', '商南', '旬邑', '西乡', '户县', '大荔', '榆林', '凤翔', '华阴', '米脂', '石泉', '凤县', '吴起', '白河', '礼泉', '汉中', '柞水', '临潼', '兴平', '略阳', '耀州', '蒲城', '横山', '眉县', '延川', '清涧', '岚皋', '洛川', '丹凤', '长武', '洋县', '周至', '潼关', '佛坪', '陈仓', '韩城', '绥德', '汉阴', '麟游', '志丹', '旬阳', '乾县', '黄陵', '镇安', '武功', '宁强', '榆阳', '商州', '耀县', '杨凌', '雁塔', '碑林', '渭滨', '汉台', '王益', '印台', '临渭', '秦都', '宝塔', '金台', '杨陵', '新城', '阎良', '汉滨', '渭城', '灞桥', '莲湖', '华州', '未央'];
        case "gansu":
            return ["兰州","金昌","金塔","临夏","麦积","庆城","民勤","定西","玛曲","高台","岷县","永登","华亭","西和","靖远","玉门","康乐","甘谷","合水","临潭","张掖","陇西","崆峒","成县","嘉峪关","酒泉","两当","天水","和政","武威","镇原","迭部","临泽","漳县","崇信","康县","白银","肃北","秦安","华池","合作","天祝","通渭","夏河","平凉","武都","榆中","静宁","徽县","景泰","庆阳","广河","张家川","宁县","舟曲","民乐","临洮","灵台","宕昌","永昌","瓜州","清水","环县","古浪","安定","碌曲","山丹","陇南","皋兰","庄浪","礼县","会宁","敦煌","永靖","武山","正宁","卓尼","肃南","渭源","泾川","文县","积石山","阿克塞","平川","凉州","城关","甘州","西固","金川","安宁","西峰","东乡","红古","肃州","七里河","甘南","秦州"];
        case "qinghai":
            return ['西宁', '刚察', '共和', '班玛', '海东', '杂多', '海北', '德令哈', '冷湖', '尖扎', '兴海', '久治', '乐都', '囊谦', '海晏', '天峻', '青海海南', '玛沁', '湟源', '循化', '格尔木', '同仁', '贵德', '达日', '民和', '治多', '茫崖', '祁连', '都兰', '果洛', '湟中', '玉树', '化隆', '海西', '黄南', '同德', '甘德', '平安', '称多', '门源', '乌兰', '泽库', '贵南', '大通', '玛多', '互助', '曲麻莱', '大柴旦', '城东', '城西', '城北', '城中', '河南', '海南'];
        case "neimenggu":
            return ["呼和浩特", "察右后旗", "宁城", "根河", "阿荣旗", "兴和", "固阳", "满洲里", "林西", "二连浩特", "科左中旗", "五原", "鄂尔多斯", "集宁", "武川", "乌审旗", "鄂温克旗", "察右中旗", "赤峰", "科右中旗", "额尔古纳", "多伦", "土左旗", "商都", "土右旗", "新右旗", "丰镇", "巴林右旗", "锡林郭勒", "通辽", "临河", "西乌旗", "霍林郭勒", "乌兰察布", "清水河", "杭锦旗", "鄂伦春旗", "察右前旗", "乌海", "阿尔山", "扎兰屯", "开鲁", "正镶白旗", "化德", "白云鄂博", "新左旗", "四子王旗", "巴林左旗", "突泉", "东乌旗", "图里河", "杭锦后旗", "凉城", "达茂旗", "乌兰浩特", "牙克石", "锡林浩特", "科左后旗", "磴口", "镶黄旗", "东胜", "卓资", "包头", "托县", "鄂前旗", "克什克腾", "和林", "敖汉", "伊金霍洛", "乌前旗", "喀喇沁", "翁牛特", "阿鲁旗", "阿左旗", "达拉特", "乌后旗", "莫力达瓦", "扎鲁特", "额济纳", "乌中旗", "太仆寺", "苏左旗", "准格尔", "正蓝旗", "巴彦淖尔", "兴安盟", "赛罕区", "阿右旗", "科右前旗", "奈曼", "扎赉特", "锡林高勒", "鄂托克", "苏右旗", "阿巴嘎", "阿拉善盟", "昆都仑", "新城", "元宝山", "海拉尔", "赛罕", "青山", "库伦", "石拐", "海勃湾", "呼伦贝尔", "玉泉", "回民", "红山", "乌达", "扎赉诺尔", "东河", "松山", "九原", "海南", "陈旗", "科尔沁"];
        case "xizang":
            return ['拉萨', '隆子', '定日', '申扎', '芒康', '日喀则', '那曲', '阿里', '昌都', '察隅', '加查', '狮泉河', '江孜', '安多', '林芝', '左贡', '浪卡子', '聂拉木', '班戈', '尼木', '波密', '山南', '南木林', '嘉黎', '改则', '丁青', '错那', '拉孜', '索县', '当雄', '米林', '洛隆', '普兰', '扎囊', '措勤', '八宿', '墨竹工卡', '洛扎', '聂荣', '康马', '仁布', '仲巴', '比如', '江达', '亚东', '乃东', '昂仁', '萨嘎', '措美', '林周', '边坝', '噶尔', '类乌齐', '琼结', '曲水', '双湖', '白朗', '岗巴', '堆龙德庆', '定结', '革吉', '贡嘎', '墨脱', '札达', '萨迦', '日土', '谢通门', '达孜', '朗县', '曲松', '贡觉', '工布江达', '巴青', '尼玛', '察雅', '吉隆', '桑珠孜', '桑日', '城关', '卡若', '巴宜'];
        case "guangxi":
            return ["南宁","宾阳","东兴","东兰","融水","玉林","忻城","兴安","田东","龙州","恭城","田林","武鸣","合浦","河池","柳江","浦北","巴马","阳朔","博白","金秀","龙胜","靖西","凭祥","藤县","贺州","上林","上思","凤山","融安","桂平","来宾","全州","田阳","宁明","乐业","邕宁","北海","富川","柳州","灵山","环江","桂林","陆川","武宣","灌阳","德保","天等","苍梧","隆林","马山","防城","天峨","鹿寨","平南","宜州","灵川","百色","扶绥","平乐","凌云","岑溪","钟山","横县","钦州","罗城","三江","容县","象州","永福","平果","大新","梧州","西林","隆安","防城港","南丹","柳城","贵港","都安","临桂","北流","崇左","资源","那坡","蒙山","昭平","荔浦","大化","兴业","合山","钦南","铁山港","钦北","柳北","万秀","西乡塘","秀峰","金城江","港口","象山","平桂","雁山","八步","江州","龙圩","港南","青秀","港北","鱼峰","福绵","叠彩","右江","银海","覃塘","江南","良庆","兴宁","海城","柳南","七星","长洲","玉州","城中","兴宾"];
        case "ningxia":
            return ["银川", "平罗", "隆德", "灵武", "同心", "中卫", "惠农", "西吉", "贺兰", "盐池", "彭阳", "固原", "海原", "永宁", "吴忠", "泾源", "石嘴山", "中宁", "金凤", "西夏", "青铜峡", "红寺堡", "原州", "沙坡头", "大武口", "利通", "兴庆"];
        case "xinjiang":
            return ["乌鲁木齐","沙雅","阿图什","尼勒克","霍尔果斯","泽普","裕民","达坂城","尉犁","塔什库尔干","哈巴河","阿克苏","于田","乌什","巩留","玛纳斯","乌恰","乌苏","米泉","温泉","麦盖提","焉耆","墨玉","石河子","昌吉","库车","伊宁","克州","特克斯","木垒","英吉沙","托里","轮台","巴楚","福海","哈密","博湖","策勒","拜城","霍城","呼图壁","阿合奇","精河","叶城","阿勒泰","吐鲁番","且末","吉木乃","伊吾","温宿","伊犁","柯坪","昭苏","吉木萨尔","沙湾","库尔勒","伽师","富蕴","托克逊","和硕","洛浦","新和","察布查尔","阜康","阿克陶","塔城","博乐","莎车","和布克赛尔","克拉玛依","若羌","和田","青河","巴里坤","民丰","阿瓦提","新源","奇台","喀什","额敏","岳普湖","布尔津","鄯善","和静","皮山","阿拉尔","奎屯","伊宁县","疏勒","疏附","乌尔禾","白碱滩","阿拉山口","图木舒克","高昌","伊州","沙依巴克","水磨沟","米东","天山","新市","五家渠","独山子","巴音郭楞","乌鲁木齐县","博尔塔拉","铁门关","头屯河"];
        case "taiwan":
            return ["台北", "高雄", "台中", "云林", "苗栗", "台南", "新竹", "台东", "屏东", "彰化", "宜兰", "桃园", "花莲", "嘉义", "南投"];
        case "xianggang":
            return ['香港', '新界', '九龙'];
        case "aomen":
            return ["澳门","路环岛","氹仔岛"]
        default:
            return [];
    }
}
function hidden_s(){
    document.getElementById("province_selector").style.display="none";
    document.getElementById("city_selector").style.display="none";
}
function go_back(){
    event.preventDefault();
    document.getElementById("later_weather_head").style.display="block";
    document.getElementById("later_weather_body").style.display="block";
    document.getElementById("choose_city").style.display="none";
}
function go_confirm(){
    event.preventDefault();
    var ask_city=document.getElementById("city_context").value;
    var city_id;
    var city_url=`https://geoapi.qweather.com/v2/city/lookup?location=${ask_city}&key=74c2c62478c443e485c4757608f0334c`;
    fetch(city_url)
    .then(response=>response.json())
    .then(data=>{
    city_id=data.location[0].id;
    document.getElementById("set_weather").href=data.location[0].fxLink;
    document.getElementById("w_forcast").href=data.location[0].fxLink;
    document.getElementById("city").innerHTML=data.location[0].name;
    document.getElementById("wl_1").href=data.location[0].fxLink;
    document.getElementById("wl_2").href=data.location[0].fxLink;
    document.getElementById("wl_3").href=data.location[0].fxLink;
    document.getElementById("wl_4").href=data.location[0].fxLink;
    document.getElementById("wl_5").href=data.location[0].fxLink;
    var wearther_url=`https://devapi.qweather.com/v7/weather/now?location=${city_id}&key=74c2c62478c443e485c4757608f0334c`;
    fetch(wearther_url)
    .then(response=>response.json())
    .then(data=>{
        document.getElementById("weather_img").src=`http://localhost/online_disk/images/icons/${data.now.icon}.png`;
        document.getElementById("temp").innerHTML=data.now.temp+"℃";
    }).catch(error=>console.error(error))
    var air_url=`https://devapi.qweather.com/v7/air/now?location=${city_id}&key=74c2c62478c443e485c4757608f0334c`;
    fetch(air_url)
    .then(response=>response.json())
    .then(data=>{
        if(data.now.category=="优"){
            document.getElementById("state").innerHTML="A+";
            document.getElementById("state").style.backgroundColor="rgb(71, 237, 71)";
        }else if(data.now.category=="良"){
            document.getElementById("state").innerHTML="A";
            document.getElementById("state").style.backgroundColor="rgb(251, 255, 6)";
        }else if(data.now.category=="轻度污染"){
            document.getElementById("state").innerHTML="B";
            document.getElementById("state").style.backgroundColor="rgb(239, 109, 16)";
        }else if(data.now.category=="中度污染"){
            document.getElementById("state").innerHTML="B+";
            document.getElementById("state").style.backgroundColor="rgb(205, 29, 29)";
        }else if(data.now.category=="重度污染"){
            document.getElementById("state").innerHTML="C";
            document.getElementById("state").style.backgroundColor="rgb(132, 11, 169)";
        }else if(data.now.category=="严重污染"){
            document.getElementById("state").innerHTML="D";
            document.getElementById("state").style.backgroundColor="rgb(116, 41, 41)";
        }
        //document.getElementById("weather_img").src="";
        //document.getElementById("temp").innerHTML=data.now.temp+"℃";
    }).catch(error=>console.error(error))
    var wl_weather_condition=`https://devapi.qweather.com/v7/weather/7d?location=${city_id}&key=74c2c62478c443e485c4757608f0334c`
    fetch(wl_weather_condition)
    .then(response=>response.json())
    .then(data=>{
        var d=new Date();
        options={
            weekday:'long'
        }
        d.setDate(d.getDate());
        document.getElementById("wl_date1").innerHTML=d.toLocaleString('en-US',options)+"(Today)";
        document.getElementById("wl_icon1").src=`http://localhost/online_disk/images/icons/${data.daily[0].iconDay}.png`;
        document.getElementById("wl_temp1").innerHTML=data.daily[0].tempMin+"℃~"+data.daily[0].tempMax+"℃";
        document.getElementById("wl_condition1").innerHTML=data.daily[0].textDay;
        document.getElementById("wl_wind1").innerHTML=data.daily[0].windDirDay+" "+data.daily[0].windScaleDay+"级";
        d.setDate(d.getDate()+1);
        document.getElementById("wl_date2").innerHTML=d.toLocaleString('en-US',options);
        document.getElementById("wl_icon2").src=`http://localhost/online_disk/images/icons/${data.daily[1].iconDay}.png`;
        document.getElementById("wl_temp2").innerHTML=data.daily[1].tempMin+"℃~"+data.daily[1].tempMax+"℃";
        document.getElementById("wl_condition2").innerHTML=data.daily[1].textDay;
        document.getElementById("wl_wind2").innerHTML=data.daily[1].windDirDay+" "+data.daily[1].windScaleDay+"级";
        d.setDate(d.getDate()+1);
        document.getElementById("wl_date3").innerHTML=d.toLocaleString('en-US',options);
        document.getElementById("wl_icon3").src=`http://localhost/online_disk/images/icons/${data.daily[2].iconDay}.png`;
        document.getElementById("wl_temp3").innerHTML=data.daily[2].tempMin+"℃~"+data.daily[2].tempMax+"℃";
        document.getElementById("wl_condition3").innerHTML=data.daily[2].textDay;
        document.getElementById("wl_wind3").innerHTML=data.daily[2].windDirDay+" "+data.daily[2].windScaleDay+"级";
        d.setDate(d.getDate()+1);
        document.getElementById("wl_date4").innerHTML=d.toLocaleString('en-US',options);
        document.getElementById("wl_icon4").src=`http://localhost/online_disk/images/icons/${data.daily[3].iconDay}.png`;
        document.getElementById("wl_temp4").innerHTML=data.daily[3].tempMin+"℃~"+data.daily[3].tempMax+"℃";
        document.getElementById("wl_condition4").innerHTML=data.daily[3].textDay;
        document.getElementById("wl_wind4").innerHTML=data.daily[3].windDirDay+" "+data.daily[3].windScaleDay+"级";
        d.setDate(d.getDate()+1);
        document.getElementById("wl_date5").innerHTML=d.toLocaleString('en-US',options);
        document.getElementById("wl_icon5").src=`http://localhost/online_disk/images/icons/${data.daily[4].iconDay}.png`;
        document.getElementById("wl_temp5").innerHTML=data.daily[4].tempMin+"℃~"+data.daily[4].tempMax+"℃";
        document.getElementById("wl_condition5").innerHTML=data.daily[4].textDay;
        document.getElementById("wl_wind5").innerHTML=data.daily[4].windDirDay+" "+data.daily[4].windScaleDay+"级";
        }).catch(error=>console.error(error))
    }).catch(error=>console.error(error))
    document.getElementById("later_weather_head").style.display="block";
    document.getElementById("later_weather_body").style.display="block";
    document.getElementById("choose_city").style.display="none"; 
}
function set_ad1(){
    document.getElementById("later_weather_head").style.display="block";
    document.getElementById("later_weather_body").style.display="block";
    document.getElementById("choose_city").style.display="none";
}
function set_ad2(){
    document.getElementById("choose_city").style.display="block";
    document.getElementById("later_weather_head").style.display="none";
    document.getElementById("later_weather_body").style.display="none";
}
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
    localStorage.removeItem("rg_set");
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
                                alert(res[i][5]>mdtime)
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
var hideTimer2=null;
function show_op(){
    document.getElementById("user_name").style.color="blue";
    clearTimeout(hideTimer2)
    document.getElementById("_op").style.display="block";
}
function hidden_op(){
    document.getElementById("user_name").style.color="black";
    hideTimer2=setTimeout(function(){
        document.getElementById("_op").style.display="none";
    },500);
}
function clear_color(){
    document.getElementById("user_name").style.color="black";
}
function stop_go1(){
    event.preventDefault();
    localStorage.removeItem("rg_set");
    window.open("http://localhost/online_disk/My_Home.html");
}
function stop_go2(){
    event.preventDefault();
    localStorage.setItem("rg_set","yes");
    window.open("http://localhost/online_disk/My_Home.html");
}
function stop_go3(){
    event.preventDefault();
    document.getElementById("under_face").style.display="block";
    document.getElementById("resigter_login").style.display="block";
}
function stop_go4(){
    event.preventDefault();
    document.getElementById("back_page").style.display="block";
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
    var data=localStorage.removeItem("login_state");
    var data=localStorage.removeItem("acc");
    var data=localStorage.removeItem("psw");
    document.getElementById("login_btn").style.display="block";
    document.getElementById("login_after").style.display="none";
    window.location.href="http://localhost/online_disk/search_resource.html";
}
function help1(){
    document.getElementById("help_img").src="/image/helper2.png";
}
function help2(){
    document.getElementById("help_img").src="/image/helper1.png";
}
function ask_help(){
    event.preventDefault();
    document.getElementById("help_g").style.display="block";
}
function hd_x(){
    event.preventDefault();
    document.getElementById("help_g").style.display="none";
}
function type_c(type){
    var d=new Date();
    var arr=d.toLocaleTimeString().split(":");
    var dtime=d.toLocaleDateString()+" "+arr[0]+":"+arr[1];
    let sql1="INSERT INTO askmsg VALUES('"+type+"','"+document.getElementById("ask_id").value+"','"+document.getElementById("ask_phone").value+"','"+document.getElementById("ask_c").value+"','"+dtime+"',' ');";
    $(document).ready(function(){
        $.ajax({
            url:"http://localhost/online_disk/conndbconfig/postUser.php",
            type:"POST",
            data:{
                msg:sql1
            },
            dataType:"html",
            success:function(res){
                alert("We have received your request. Please try to login again after 24 hours. If your request is not fulfilled, it may be due to incorrect information. Please reapply");
                window.location.href="http://localhost/online_disk/search_resource.html";
            }
        })
    })
}
var type;
function cf_type(type1){
    type=type1;
}
function send_ask(){
    event.preventDefault();
    switch(type){
        case "unlock":type_c(type);break;
        case "lock":type_c(type);break;
        case "cancel":type_c(type);break;
    }
}