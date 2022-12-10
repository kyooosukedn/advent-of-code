import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Day04 {
    public static void main(String[] args) throws IOException {
        int total = 0;
        int sumOfPrio = 0;
        int pairs = 0;
        int overlap = 0;
        BufferedReader reader = new BufferedReader(new FileReader("AdventOfCode2022/src/input/day04.txt"));
        String line;

        while((line = reader.readLine()) != null) {
            // Part 1
            String[] parts = line.split(",");
            String[] leftPart = parts[0].split("-");
            String[] rightPart = parts[1].split("-");
            int leftPartMin = Integer.parseInt(leftPart[0]);
            int leftPartMax = Integer.parseInt(leftPart[1]);
            int rightPartMin = Integer.parseInt(rightPart[0]);
            int rightPartMax = Integer.parseInt(rightPart[1]);
            if (leftPartMin <= rightPartMin && leftPartMax >= rightPartMax) {
                pairs++;
            } else if (leftPartMin >= rightPartMin && leftPartMax <= rightPartMax) {
                pairs++;
            }
            // Part 2
            if ((leftPartMin <= rightPartMin && leftPartMax >= rightPartMin) || (leftPartMin <= rightPartMax && leftPartMax >= rightPartMax)) {
                overlap++;
            } else if ((leftPartMax >= rightPartMin && leftPartMax <= rightPartMax) || (rightPartMin <= leftPartMax && rightPartMax >= leftPartMax)) {
                overlap++;
            }


        }
        System.out.println(overlap);
        System.out.println(pairs);

    }
}
