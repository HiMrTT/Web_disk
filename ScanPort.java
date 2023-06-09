package OnlineDisk_Search;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
//import java.io.PrintStream;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Queue;
//import java.util.Scanner;
import java.util.concurrent.ConcurrentLinkedQueue;

import java.awt.Dimension;
import java.awt.Font;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

class MThread implements Runnable{
    public void run(){
        ScanPort.check_open(ScanPort.q);  
    }
}
class PThread implements Runnable{
    ByteArrayOutputStream bs=new ByteArrayOutputStream();
    static String vk;
    public void run(){
        while(!ScanPort.q.isEmpty()){
            double i=(ScanPort.qsize-ScanPort.q.size())/(double)ScanPort.qsize*100;
            System.out.printf("\rScan progress: %-50s %5.1f%% | 100.0%%", new String(new char[(int)i/2]).replace('\0', '▋'), i);
            System.out.flush();
        }
        try{
            Thread.sleep(1000);
        }catch(Exception e){
            e.printStackTrace();
        }
        System.out.printf("\rScan progress: %-50s 100.0%% | 100.0%%", new String(new char[50]).replace('\0', '▋'));
        PrintStream ps = new PrintStream(bs);
        PrintStream old = System.out;
        System.setOut(ps);
        System.out.flush();
        System.setOut(old);
        vk = bs.toString();
        System.out.println();
    }
}
class ScanPort{
    static Queue<String>q=new ConcurrentLinkedQueue<>();
    static ArrayList<String>iplist=new ArrayList<>();
    static int qsize;
    static int threadNum=500;
    static int port=65432;
    static void get_ip_status(String ip,int port){
        Socket socket=new Socket();
        try{
            socket.connect(new InetSocketAddress(ip,port), 1000);
            iplist.add(ip+":"+String.valueOf(port)+"\n");
        }catch(IOException e){
            return;
        }finally{
            try{
                socket.close();
            }catch(IOException e){
                e.printStackTrace();
            }
        }
    }
    static void check_open(Queue<String> q){
        try{
            while(true){
                String ip=q.remove();
                get_ip_status(ip, port);
            }
        }catch(Exception e){
            return;
        }
    }
    static ArrayList<String> ips(String start,String end) throws UnknownHostException{
        InetAddress start1=InetAddress.getByName(start);
        InetAddress end1=InetAddress.getByName(end);
        long satrtLong=ipToLong(start1);
        long endLong=ipToLong(end1);
        ArrayList<String> list=new ArrayList<>();
        for(long i=satrtLong;i<=endLong;i++){
            InetAddress addr=longToIp(i);
            list.add(addr.getHostAddress());
        }
        return list;
    }
    private static long ipToLong(InetAddress ip1){
        byte[] octets=ip1.getAddress();
        long result=0;
        for(byte i:octets){
            result<<=8;
            result|=i&0xff;
        }
        return result;
    }
    private static InetAddress longToIp(long ip1){
        byte[] octets=new byte[4];
        for(int i=3;i>=0;i--){
            octets[i]=(byte)(ip1&0xff);
            ip1>>=8;
        }
        try{
            return InetAddress.getByAddress(octets);
        }catch(UnknownHostException e){
            e.printStackTrace();
            return null;
        }
    }
    static String helpStr(){
        String msg="命令解释：-h 显示此帮助,-i IP地址范围_0.0.0.0-255.255.255.255,-p 端口_可省略_默认65432,-t s线程数_可省略_默认500线程";
        return msg;
    }
    static String handle_ask(String ask) throws Exception{
        Map<String,String> parms=new HashMap<>();
        String strs[]=ask.split(",");
        String[] ip=new String[2];
        for(String str:strs){
            String[] key_value=str.split("\\s+",2);
            if(key_value.length==1){
                parms.put(key_value[0],"");
            }else{
                parms.put(key_value[0],key_value[1]);
            }
        }
        if(parms.size()>0){
            for(String i:parms.keySet()){
                switch(i){
                    case "-h":
                    System.out.println(helpStr());
                    break;
                    case "-i":
                    ip=parms.get(i).split("-");
                    iplist.addAll(ips(ip[0],ip[1]));
                    break;
                    case "-p":
                    port=Integer.parseInt(parms.get(i));
                    break;
                    case "-t":
                    threadNum=Integer.parseInt(parms.get(i));
                    break;
                    default:
                    break;
                }
            }
        }
        if(parms.containsKey("-h")){
            return "命令解释：-h 显示此帮助,-i IP地址范围_0.0.0.0-255.255.255.255,-p 端口_可省略_默认65432,-t s线程数_可省略_默认500线程";
        }else if(parms.containsKey("-i")){
            return "Scan completly";
        }else{
            return "Error";
        }
    }
    public static void main(String[] args) throws IOException, InterruptedException{
        // Scanner sc=new Scanner(System.in);
        // int cos;
        JFrame frame=new JFrame("Port Scanner");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JPanel panel=new JPanel();
        JLabel label=new JLabel("please input your command:");
        label.setFont(new Font("微软硬黑",Font.PLAIN,20));
        JTextField inputField=new JTextField(20);
        inputField.setFont(new Font("黑体",Font.PLAIN,20));
        inputField.setPreferredSize(new Dimension(50,30));
        JButton btn=new JButton("ok");
        btn.setFont(new Font("黑体",Font.PLAIN,20));
        btn.setMargin(new Insets(0,20,-1,20));
        JLabel result=new JLabel();
       
        GroupLayout layout=new GroupLayout(panel);
        panel.setLayout(layout);
        layout.setAutoCreateGaps(true);
        layout.setAutoCreateContainerGaps(true);
        layout.setHorizontalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
        .addGroup(layout.createSequentialGroup()
        .addComponent(label)
        .addComponent(inputField)
        .addComponent(btn)
        )
        .addComponent(result)       
        );
        layout.setVerticalGroup(layout.createSequentialGroup()
        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
        .addComponent(label)
        .addComponent(inputField)
        .addComponent(btn)
        )
        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
        .addComponent(result)
        );

        int width=1265;
        int height=150;
        Dimension screenSize=java.awt.Toolkit.getDefaultToolkit().getScreenSize();
        int x=(screenSize.width-width)/2;
        int y=(screenSize.height-height)/2;
        frame.setSize(width,height);
        frame.setMinimumSize(new Dimension(800,150));
        frame.setLocation(x,y);
        frame.getContentPane().add(panel);
        //frame.pack();
        frame.setVisible(true);
        btn.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                String input=inputField.getText();
                result.setFont(new Font("黑体",Font.PLAIN,20));
                try{
                    result.setText("Result: Scanning...");
                    result.setText("Result:"+handle_ask(input));
                }catch(Exception e1){
                    return;
                }
                for(String i:iplist){
                    q.add(i);
                }
                iplist.clear();
                qsize=q.size();
                PThread pThread=new PThread();
                Thread process=new Thread(pThread);
                long totalMilliSeconds=System.currentTimeMillis()/1000;
                long start_time=totalMilliSeconds;
                process.start();
                ArrayList<Thread>threads=new ArrayList<>();
                MThread mThread=new MThread();
                for(int i=0;i<threadNum;i++){
                    Thread r=new Thread(mThread);
                    r.start();
                    threads.add(r);
                }
                for(Thread t:threads){
                    try {
                        t.join();
                    } catch (InterruptedException e1) {
                        // TODO Auto-generated catch block
                        e1.printStackTrace();
                    }
                }
                try {
                    process.join();
                } catch (InterruptedException e1) {
                    // TODO Auto-generated catch block
                    e1.printStackTrace();
                }
                File file1=new File("C:/Users/windows10/Desktop/vnc嵌入式/wqe/vscodeproject/OnlineDisk_Search/iplist.txt");
                try (InputStreamReader reader2 = new InputStreamReader(new FileInputStream(file1))) {
                    BufferedReader br2=new BufferedReader(reader2);
                    ArrayList<String>list1=new ArrayList<>();
                    String s2;
                    try {
                        while((s2=br2.readLine())!=null){
                            list1.add(s2+"\n");
                        }
                    } catch (IOException e1) {
                        // TODO Auto-generated catch block
                        e1.printStackTrace();
                    }
                    try {
                        br2.close();
                    } catch (IOException e1) {
                        // TODO Auto-generated catch block
                        e1.printStackTrace();
                    }
                    list1.addAll(iplist);
                    HashSet<String>list_help=new HashSet<>();
                    for(String i:list1){
                        list_help.add(i);
                    }
                    list1.clear();
                    list1.addAll(list_help);
                    Collections.sort(list1);
                    try (PrintWriter pw = new PrintWriter(file1)) {
                        for(String i:list1){
                            pw.write(i);
                        }
                        pw.flush();
                        pw.close();
                    } catch (FileNotFoundException e1) {
                        // TODO Auto-generated catch block
                        e1.printStackTrace();
                    }
                } catch (IOException e1) {
                    // TODO Auto-generated catch block
                    e1.printStackTrace();
                }
                System.out.println("This scan to open "+port+" The IP number of the port is "+iplist.size()+" 个");
                long totalMilliSeconds1=System.currentTimeMillis()/1000;
                long end_time=totalMilliSeconds1;
                System.out.print("Scan process running time: ");
                System.out.print(end_time-start_time);
                System.out.println(" Seconds");
            }
        });
        // System.out.println("please input you want to choose number to next...");
        // System.out.println("Do you want to input parameter ?");
        // System.out.println("  ***  1.YES  2.NO  ***");
        // cos=sc.nextInt();
        // while(cos>2||cos<1){
        //     System.out.println("your input error! please input again :");
        //     cos=sc.nextInt();
        // }
        // if(cos==1){
        //     String[] ip=new String[2];
        //     System.out.println("please input your parameter(when you input 0 0,end input) :");
        //     Map<String,String> parms=new HashMap<>();
        //     String key,value;
        //     key=sc.next();
        //     value=sc.next();
        //     while(!key.equals("0")||!value.equals("0")){
        //         parms.put(key, value);
        //         key=sc.next();
        //         value=sc.next();
        //     }
        //     if(parms.size()>0){
        //         for(String i:parms.keySet()){
        //             switch(i){
        //                 case "-h":
        //                 System.out.print(123);
        //                 System.out.println(helpStr());
        //                 System.exit(0);
        //                 break;
        //                 case "-i":
        //                 ip=parms.get(i).split("-");
        //                 iplist.addAll(ips(ip[0],ip[1]));
        //                 break;
        //                 case "-p":
        //                 port=Integer.parseInt(parms.get(i));
        //                 break;
        //                 case "-t":
        //                 threadNum=Integer.parseInt(parms.get(i));
        //                 break;
        //                 default:
        //                 break;
        //             }
        //         }
        //     }
        // }
        // sc.close();
        // for(String i:iplist){
        //     q.add(i);
        // }
        // iplist.clear();
        // qsize=q.size();
        // PThread pThread=new PThread();
        // Thread process=new Thread(pThread);
        // long totalMilliSeconds=System.currentTimeMillis()/1000;
        // long start_time=totalMilliSeconds;
        // process.start();
        // ArrayList<Thread>threads=new ArrayList<>();
        // MThread mThread=new MThread();
        // for(int i=0;i<threadNum;i++){
        //     Thread r=new Thread(mThread);
        //     r.start();
        //     threads.add(r);
        // }
        // for(Thread t:threads){
        //     t.join();
        // }
        // process.join();
        // File file1=new File("C:/Users/windows10/Desktop/vnc嵌入式/wqe/vscodeproject/OnlineDisk_Search/iplist.txt");
        // InputStreamReader reader2=new InputStreamReader(new FileInputStream(file1));
        // BufferedReader br2=new BufferedReader(reader2);
        // ArrayList<String>list1=new ArrayList<>();
        // String s2;
        // while((s2=br2.readLine())!=null){
        //     list1.add(s2+"\n");
        // }
        // br2.close();
        // list1.addAll(iplist);
        // HashSet<String>list_help=new HashSet<>();
        // for(String i:list1){
        //     list_help.add(i);
        // }
        // list1.clear();
        // list1.addAll(list_help);
        // Collections.sort(list1);
        // PrintWriter pw=new PrintWriter(file1);
        // for(String i:list1){
        //     pw.write(i);
        // }
        // pw.flush();
        // pw.close();
        // System.out.println("This scan to open "+port+" The IP number of the port is "+iplist.size()+" 个");
        // long totalMilliSeconds1=System.currentTimeMillis()/1000;
        // long end_time=totalMilliSeconds1;
        // System.out.print("Scan process running time: ");
        // System.out.print(end_time-start_time);
        // System.out.println(" Seconds");
    }
}