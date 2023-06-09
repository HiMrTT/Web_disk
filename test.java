package OnlineDisk_Search;

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

public class test {
    public static void main(String[] args) throws Exception {
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

       btn.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent e){
            String input=inputField.getText();
            result.setFont(new Font("黑体",Font.PLAIN,20));
            result.setText("Result:"+input);
        }
       });

       int width=800;
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
    }
}