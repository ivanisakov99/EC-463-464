import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.File;
import java.io.FileWriter;

/**
 * GUI
 */
public class GUI implements ActionListener{
    private int count = 0;
    private JFrame frame;
    private JPanel panel;
    private JButton button, reset;
    private JLabel label;
    
    public GUI() {
        frame = new JFrame();
        panel = new JPanel();
        button = new JButton("Click me");
        reset = new JButton("reset");
        label = new JLabel("Number of clicks: " + count);
        button.addActionListener(this);
        reset.addActionListener(this);
        int top = 30, left = 30, bottom = 30, right = 30;

        panel.setBorder(BorderFactory.createEmptyBorder(top, left, bottom, right));
        panel.setLayout(new GridLayout(0, 1));
        panel.add(button);
        panel.add(label);
        panel.add(reset);

        frame.add(panel, BorderLayout.CENTER);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setTitle("Bee Sense");
        frame.pack();
        frame.setVisible(true);
    }
    
    public void createFile(String filename) {
        try {
            File myFile = new File(filename);
            if (myFile.createNewFile()) {
                System.out.println(filename + " created");
            } else {
                System.out.println(filename + " already exists");
            }
        } catch (Exception e) {
            //TODO: handle exception
            System.err.println("error");
            e.printStackTrace();
        }
    }
    
    public void writeFile(String filename) {
        try {
            FileWriter myWriter = new FileWriter(filename);
            myWriter.write("Hi");
        } catch (Exception e) {
            //TODO: handle exception
            System.err.println(e);
            e.printStackTrace();
        }

    }
    public static void main(String[] args) {
        GUI myGUI = new GUI();
    }
    @Override
    public void actionPerformed(ActionEvent e) {
        // TODO Auto-generated method stub
        if (e.getActionCommand() == "reset") {
            createFile("file.txt");
        }
        else {
            count++;
        }
        label.setText("Number of clicks: " + count);
    }
}