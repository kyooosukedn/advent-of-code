import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Day01 {
    // Day 1: Part 1 Calorie Counting
    static void mostCalories(BufferedReader reader) throws IOException {
        List<Integer> caloriesFromElfs = new ArrayList<>();
        int elfNum = 0;
        String line;
        while((line = reader.readLine()) != null) {
            if (!line.equals("")) {
                int cal = Integer.parseInt(line);
                elfNum += cal;
            } else {
                caloriesFromElfs.add(elfNum);
                elfNum = 0;
            }
        }

        System.out.println(Collections.max(caloriesFromElfs));
        // Part 2
        System.out.println("Top 3 Elves that carrying the most Calories: ");
        caloriesFromElfs.sort((a,b) -> b - a);
        System.out.println(caloriesFromElfs.get(0) + caloriesFromElfs.get(1) + caloriesFromElfs.get(2));
    }

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader("AdventOfCode2022/src/input/day01.txt"));
        mostCalories(reader);
    }
}