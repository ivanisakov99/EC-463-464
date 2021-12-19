

import javax.swing.JFrame;
import javax.swing.JLabel;

public class hello {
    public static void main(String[] args) {
        JFrame frame = new JFrame();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JLabel label = new JLabel("Hello");
        frame.add(label);
        frame.pack();
        frame.setVisible(true);
    }
}
