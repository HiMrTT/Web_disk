package OnlineDisk_Search;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;

class oklist{
    public static void main(String[] args) throws IOException{
        ArrayList<String> okiplist=new ArrayList<>(Arrays.asList("http://8.210.126.115:4321{'username': 'admin', 'password': 'admin123'}\n", "http://45.129.8.158:7777{'username': 'admin', 'password': 'admin'}\n", "http://165.154.74.137:8080{'username': 'admin', 'password': 'admin'}\n", "http://165.154.69.252:8080{'username': 'admin', 'password': 'admin'}\n", "http://47.243.122.14:80{'username': 'admin', 'password': 'as123456'}\n", "http://128.1.136.169:8080{'username': 'admin', 'password': 'qwer1234'}\n", "http://8.218.80.65:81{'username': 'admin', 'password': '11111111'}\n", "http://45.128.210.24:1024{'username': 'admin', 'password': '123456'}\n", "http://45.128.210.24:1024{'username': 'admin', 'password': '123456'}\n", "http://16.162.100.9:8080{'username': 'admin', 'password': 'admin'}\n", "http://8.210.142.253:8080{'username': 'admin', 'password': 'admin'}\n", "http://43.154.34.49:5601{'username': 'admin', 'password': 'admin'}\n", "http://43.154.132.135:8888{'username': 'admin', 'password': '123456'}\n", "http://43.154.132.135:8888{'username': 'admin', 'password': '123456'}\n", "http://154.3.34.86:5432{'username': 'admin', 'password': 'asd123'}\n", "http://154.3.34.86:5432{'username': 'admin', 'password': 'asd123'}\n", "http://43.155.111.203:801{'username': 'admin', 'password': 'admin'}\n", "http://23.91.100.243:8080{'username': 'admin', 'password': 'admin'}\n", "http://152.69.195.168:5555{'username': 'admin', 'password': 'admin'}\n", "http://108.160.135.141:8080{'username': 'admin', 'password': '123456'}\n", "http://108.160.135.141:8080{'username': 'admin', 'password': '123456'}\n", "http://137.220.181.177:4782{'username': 'admin', 'password': '123456..'}\n", "http://138.3.211.140:5000{'username': 'admin', 'password': 'admin123'}\n", "http://15.152.99.71:80{'username': 'admin', 'password': 'root'}\n", "http://146.56.167.249:5555{'username': 'admin', 'password': 'admin'}\n", "http://138.2.8.227:8443{'username': 'admin', 'password': 'admin'}\n", "http://35.77.14.109:8080{'username': 'admin', 'password': 'admin'}\n", "http://43.230.163.242:5901{'username': 'admin', 'password': 'admin'}\n", "http://146.56.119.242:2222{'username': 'admin', 'password': 'admin123'}\n", "http://152.67.207.174:2222{'username': 'admin', 'password': '123456789'}\n", "http://152.67.207.174:2222{'username': 'admin', 'password': '123456789'}\n", "http://146.56.133.109:2222{'username': 'admin', 'password': 'admin'}\n", "http://152.67.207.69:88{'username': 'admin', 'password': 'admin'}\n", "http://146.56.167.119:7777{'username': 'admin', 'password': 'admin'}\n"));
        ArrayList<String> list1=new ArrayList<>();
        try{
            File file=new File("C:/Users/windows10/Desktop/vnc嵌入式/wqe/vscodeproject/OnlineDisk_Search/okiplist.txt");
            if(!file.exists()) file.createNewFile();
            InputStreamReader reader=new InputStreamReader(new FileInputStream(file));
            BufferedReader br=new BufferedReader(reader);
            //br.reset();
            String s;
            while((s=br.readLine())!=null){
                s+="\n";
                list1.add(s);
            }
            br.close();
            list1.addAll(okiplist);
            HashSet<String>list_help=new HashSet<>();
            for(String i:list1){
                list_help.add(i);
            }
            list1.clear();
            list1.addAll(list_help);
            Collections.sort(list1);
            FileOutputStream fos=new FileOutputStream(file,false);
            fos.getChannel().truncate(0);
            for(String i:list1){
                fos.write(i.getBytes());
            }
            fos.flush();
            fos.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}