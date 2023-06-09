package OnlineDisk_Search;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class Home_page {
    public static void main(String[] args) throws Exception {
        String savePath="E:/download_files/";
        ArrayList<ArrayList<String>>kk=new ArrayList<>();
        ArrayList<String>v=new ArrayList<>();
        v.add("周杰伦\u0026Lara梁心颐 - 珊瑚海.flac");
        v.add("123");
        kk.add(v);
        savePath+=kk.get(0).get(0).replaceAll("\u0026","&");
        System.out.println(savePath);
    }
}