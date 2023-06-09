package OnlineDisk_Search;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


class R3Thread implements Runnable{
    public void run(){
        download_file_alist3.check_open(download_file_alist3.q);
    }
}
class download_file_alist3{
    static Queue<String>q=new ConcurrentLinkedQueue<>();
    static ArrayList<String>okiplist=new ArrayList<>();
    static ArrayList<ArrayList<String>>files_msg=new ArrayList<>();
    static String add_Str;
    static void test_Sign_in(String ip){
        HttpURLConnection con=null;
        String msg_url="http://"+ip+"/api/fs/list";
        // String msg_url="http://"+ip+"/api/public/path";
        String savePath= "";
        //int flag=0;
        try{
            URL url=new URL(msg_url);
            con=(HttpURLConnection)url.openConnection();
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setRequestMethod("POST");
            con.setUseCaches(false);
            con.setConnectTimeout(60*1000);
            con.setReadTimeout(60*1000);
            con.setRequestProperty("Connection", "keep-alive");
            con.setRequestProperty("Pragma", "no-cache");
            con.setRequestProperty("Cache-Control", "no-cache");
            con.setRequestProperty("Accept", "application/json,text/plain,*/*");
            con.setRequestProperty("Origin", "http://"+ip);
            con.setRequestProperty("X-Requested-With", "XMLHttpRequest");
            con.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/80.0.3904.108 Safari/537.36");
            con.setRequestProperty("DNT", "1");
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            con.setRequestProperty("Referer", "http://"+ip);
            con.setRequestProperty("Accept-Encoding", "gzip,deflate");
            con.setRequestProperty("Accept-Language", "zh-CN,zh;q=0.9");
            con.connect();
            //String acm="",psw="";
            // File file=new File("C:/Users/windows10/Desktop/vnc嵌入式/wqe/vscodeproject/OnlineDisk_Search/okiplist.txt");
            // InputStreamReader reader=new InputStreamReader(new FileInputStream(file));
            // BufferedReader br=new BufferedReader(reader);
            // String temp;
            // while((temp=br.readLine())!=null){
            //     if(temp.contains(ip)){
            //         Pattern pattern = Pattern.compile("'username':\\s*'([^']*)',\\s*'?password'?\\s*:\\s*'([^']*)'");
            //         Matcher matcher = pattern.matcher(temp);
            //         while(matcher.find()){
            //             acm=matcher.group(1);
            //             psw=matcher.group(2);
            //         }
            //         break;
            //     }
            // }
            // System.out.println(ip+"---"+psw);
            // String parms="username="+acm+"&password="+psw;
            // OutputStream out=con.getOutputStream();
            // out.write(parms.getBytes());
            // out.flush();
            // out.close();
            //br.close();
            int responseCode = con.getResponseCode();
        if (responseCode == 200) {
            InputStream inputStream = con.getInputStream();
            //FileOutputStream fileOutputStream = new FileOutputStream(savePath);
            ByteArrayOutputStream bs=new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int length;
            while ((length = inputStream.read(buffer)) > 0) {
                bs.write(buffer, 0, length);
                //fileOutputStream.write(buffer, 0, length);
            }
            String return_code=new String(bs.toByteArray(),StandardCharsets.UTF_8);
            Pattern pattern1=Pattern.compile("\"name\":\\s*\"([^\"]+)\"");
            Pattern pattern2=Pattern.compile("\"size\":\\s*(\\d+)");
            Pattern pattern3=Pattern.compile("\"is_dir\":\\s*(true|false)");
            Pattern pattern4=Pattern.compile("\"sign\":\"(.*?)\"");
            Matcher matcher1=pattern1.matcher(return_code);
            Matcher matcher2=pattern2.matcher(return_code);
            Matcher matcher3=pattern3.matcher(return_code);
            Matcher matcher4=pattern4.matcher(return_code);
            while(matcher1.find()&&matcher3.find()) {
                matcher2.find();matcher4.find();
                String name=matcher1.group(1);
                String size=matcher2.group(1);
                String is_dir=matcher3.group(1);
                String sign=matcher4.group(1);
                //System.out.println(name+"---"+size+"---"+is_dir+"---"+sign);
                if(Integer.parseInt(size)>0&&is_dir.equals("false")){
                    ArrayList<String>file_msg=new ArrayList<>();
                    file_msg.add(name);
                    file_msg.add(sign);
                    files_msg.add(file_msg);
                }else{
                    if(is_dir.equals("true")){
                        add_Str="";
                        search_file(msg_url,name);
                        //System.out.println(add_Str);
                        //System.out.println(files_msg);
                        while(files_msg.size()>0){
                            if(files_msg.get(0).size()>2){
                                savePath="E:/download_files/";
                                savePath+=files_msg.get(0).get(1).replaceAll("\\\\u0026","&");
                                //System.out.println(savePath);
                                String file_url="http://"+ip+"/d/"+URLEncoder.encode(files_msg.get(0).get(0),"UTF-8").replaceAll("\\+","%20").replaceAll("%2F", "/").replaceAll("%28", "(").replaceAll("%29", ")").replaceAll("5Cu00", "")+URLEncoder.encode(files_msg.get(0).get(1),"UTF-8").replaceAll("\\+","%20").replaceAll("%28", "(").replaceAll("%29", ")").replaceAll("5Cu00", "")+"?sign="+files_msg.get(0).get(2);
                                System.out.println(file_url);
                                //if(files_msg.get(0).get(1).replaceAll("\\\\u0026","&").equals("周杰伦&Lara梁心颐 - 珊瑚海.flac"))
                                //flag=1;
                                //if(flag==1)
                                download_files(file_url,savePath);
                                files_msg.remove(0);
                            }else{
                                savePath="E:/download_files/";
                                savePath+=files_msg.get(0).get(0).replaceAll("\\\\u0026","&");
                                //System.out.println(savePath);
                                String file_url="http://"+ip+"/d/"+URLEncoder.encode(files_msg.get(0).get(0),"UTF-8").replaceAll("\\+","%20").replaceAll("%28", "(").replaceAll("%29", ")").replaceAll("5Cu00", "")+"?sign="+files_msg.get(0).get(1);
                                System.out.println(file_url);
                                //if(files_msg.get(0).get(0).replaceAll("\\\\u0026","&").equals("周杰伦&Lara梁心颐 - 珊瑚海.flac"))
                                //flag=1;
                                //if(flag==1)
                                download_files(file_url,savePath);
                                files_msg.remove(0);
                            }
                        }
                    }          
                }
            }
            while(files_msg.size()>0){
                if(files_msg.get(0).size()>2){
                    savePath="E:/download_files/";
                    savePath+=files_msg.get(0).get(1).replaceAll("\\\\u0026","&");
                    //System.out.println(savePath);
                    String file_url="http://"+ip+"/d/"+URLEncoder.encode(files_msg.get(0).get(0),"UTF-8").replaceAll("\\+","%20").replaceAll("%2F", "/").replaceAll("%28", "(").replaceAll("%29", ")").replaceAll("5Cu00", "")+URLEncoder.encode(files_msg.get(0).get(1),"UTF-8").replaceAll("\\+","%20").replaceAll("%28", "(").replaceAll("%29", ")").replaceAll("5Cu00", "")+"?sign="+files_msg.get(0).get(2);
                    System.out.println(file_url);
                    //if(files_msg.get(0).get(1).replaceAll("\\\\u0026","&").equals("周杰伦&Lara梁心颐 - 珊瑚海.flac"))
                    //flag=1;
                    //if(flag==1)
                    download_files(file_url,savePath);
                    files_msg.remove(0);
                }else{
                    savePath="E:/download_files/";
                    savePath+=files_msg.get(0).get(0).replaceAll("\\\\u0026","&");
                    //System.out.println(savePath);
                    String file_url="http://"+ip+"/d/"+URLEncoder.encode(files_msg.get(0).get(0),"UTF-8").replaceAll("\\+","%20").replaceAll("%28", "(").replaceAll("%29", ")").replaceAll("5Cu00", "")+"?sign="+files_msg.get(0).get(1);
                    System.out.println(file_url);
                    //if(files_msg.get(0).get(0).replaceAll("\\\\u0026","&").equals("周杰伦&Lara梁心颐 - 珊瑚海.flac"))
                    //flag=1;
                    //if(flag==1)
                    download_files(file_url,savePath);
                    files_msg.remove(0);
                }
            }
            // System.out.println(files_msg);
            //fileOutputStream.close();
            inputStream.close();
            System.out.println("File download successed");
            }else{
                System.out.println("File download failed");
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            if(con!=null)
            con.disconnect();
        }
    }
    static void search_file(String msg_url,String _name) throws Exception{
        add_Str+=_name+"/";
        //System.out.println(add_Str);
        URL url=new URL(msg_url);
        HttpURLConnection conn=(HttpURLConnection)url.openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setUseCaches(false);
        conn.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
        String payloadString = "{\"path\":\""+add_Str+"\"}";
        conn.getOutputStream().write(payloadString.getBytes("UTF-8"));
        int responseCode=conn.getResponseCode();
        if (responseCode==200) {
            InputStream inputStream = conn.getInputStream();
            ByteArrayOutputStream bs=new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int length;
            while ((length = inputStream.read(buffer)) > 0) {
                bs.write(buffer, 0, length);
            }
            String return_code=new String(bs.toByteArray(),StandardCharsets.UTF_8);
            Pattern pattern1=Pattern.compile("\"name\":\\s*\"([^\"]+)\"");
            Pattern pattern2=Pattern.compile("\"size\":\\s*(\\d+)");
            Pattern pattern3=Pattern.compile("\"is_dir\":\\s*(true|false)");
            Pattern pattern4=Pattern.compile("\"sign\":\"(.*?)\"");
            Matcher matcher1=pattern1.matcher(return_code);
            Matcher matcher2=pattern2.matcher(return_code);
            Matcher matcher3=pattern3.matcher(return_code);
            Matcher matcher4=pattern4.matcher(return_code);
            while(matcher1.find()&&matcher3.find()) {
                matcher2.find();matcher4.find();
                String name=matcher1.group(1);
                String size=matcher2.group(1);
                String is_dir=matcher3.group(1);
                String sign=matcher4.group(1);
                // System.out.println(name+"---"+size+"---"+is_dir+"---"+sign);
                if(Long.parseLong(size)>0&&is_dir.equals("false")){
                    ArrayList<String>file_msg=new ArrayList<>();
                    file_msg.add(add_Str);
                    file_msg.add(name);
                    file_msg.add(sign);
                    files_msg.add(file_msg);
                }else{
                    if(is_dir.equals("true")){
                        search_file(msg_url,name);
                    }  
                }
            }
        }
        add_Str=add_Str.replace(_name+"/","");
        conn.disconnect();
    }
    static void download_files(String file_url,String save_url) throws Exception{
        URL url=new URL(file_url);
        HttpURLConnection con=(HttpURLConnection)url.openConnection();
        con.setRequestMethod("GET");
        int responseCode=con.getResponseCode();
        if(responseCode==200){
            InputStream inputStream=con.getInputStream();
            FileOutputStream fops=new FileOutputStream(save_url);
            byte[] buffer=new byte[4096];
            int len;
            while((len=inputStream.read(buffer))!=-1){
                fops.write(buffer,0,len);
            }
            fops.flush();
            fops.close();
        }else if(responseCode==302){
            InputStream inputStream=con.getInputStream();
            ByteArrayOutputStream bs=new ByteArrayOutputStream();
            byte[] buffer=new byte[4096];
            int len;
            while((len=inputStream.read(buffer))!=-1){
                bs.write(buffer,0,len);
            }
            String re_file_url;
            Pattern pattern=Pattern.compile("href=\"([^\"]+)\"");
            Matcher matcher=pattern.matcher(bs.toString());
            matcher.find();
            re_file_url=matcher.group(1);
            re_file_url=re_file_url.replaceAll("&amp;","&").replaceAll("%20"," ").replaceAll("%2A","*").replaceAll("%27","'");
            URL re_url=new URL(re_file_url);
            HttpURLConnection conn=(HttpURLConnection)re_url.openConnection();
            conn.setRequestMethod("GET");
            InputStream re_inputStream=conn.getInputStream();
            FileOutputStream fops=new FileOutputStream(save_url);
            byte[] re_buffer=new byte[4096];
            int re_len;
            while((re_len=re_inputStream.read(re_buffer))!=-1){
                fops.write(re_buffer,0,re_len);
            }
            fops.flush();
            fops.close();
        }
        else{
            System.out.println("File download happen error");
        }
        con.disconnect();
    }
    static void check_open(Queue<String> q){
        try{
            while(true){
                String ip=q.remove();
                test_Sign_in(ip);
            }
        }catch(Exception e){
            return;
        }
    }
    public static void main(String[] args) throws IOException, InterruptedException{
        long totalMilliSeconds=System.currentTimeMillis()/1000;
        long start_time=totalMilliSeconds;
        File file=new File("C:/Users/windows10/Desktop/vnc嵌入式/wqe/vscodeproject/OnlineDisk_Search/iplist_test.txt");
        if(!file.exists()) file.createNewFile();
        InputStreamReader reader=new InputStreamReader(new FileInputStream(file));
        BufferedReader br=new BufferedReader(reader);
        String ip;
        while((ip=br.readLine())!=null){
            q.add(ip.trim());
        }
        br.close();
        ArrayList<Thread>threads=new ArrayList<>();
        R3Thread rThread=new R3Thread();
        for(int i=0;i<10;i++){
            Thread r1=new Thread(rThread);
            r1.start();
            threads.add(r1);
        }
        for(Thread t:threads){
            t.join();
        }
        File file1=new File("C:/Users/windows10/Desktop/vnc嵌入式/wqe/vscodeproject/OnlineDisk_Search/okiplist3.txt");
        if(!file1.exists()) file1.createNewFile();
        InputStreamReader reader2=new InputStreamReader(new FileInputStream(file1));
        BufferedReader br2=new BufferedReader(reader2);
        ArrayList<String>list1=new ArrayList<>();
        String s2;
        while((s2=br2.readLine())!=null){
            list1.add(s2);
        }
        br2.close();
        list1.addAll(okiplist);
        HashSet<String>list_help=new HashSet<>();
        for(String i:list1){
            list_help.add(i);
        }
        list1.clear();
        list1.addAll(list_help);
        Collections.sort(list1);
        PrintWriter pw=new PrintWriter(file1);
        for(String i:list1){
            pw.write(i+"\n");
        }
        pw.flush();
        pw.close();
        long totalMilliSeconds1=System.currentTimeMillis()/1000;
        long end_time=totalMilliSeconds1;
        System.out.print("Test process running time: ");
        System.out.print(end_time-start_time);
        System.out.println(" Seconds");
    }
    
}