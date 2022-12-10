import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;


public class Day03 {
    public static void main(String[] args) throws IOException {
        int total = 0;
        int sumOfPrio = 0;
        BufferedReader reader = new BufferedReader(new FileReader("AdventOfCode2022/src/input/day03.txt"));
        String line;
        List<Set<Integer>> lists = new ArrayList<>();
        lists.add(new HashSet<>());
        lists.add(new HashSet<>());
        lists.add(new HashSet<>());
        int listIdx = 0;
        String alphabet = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        while((line = reader.readLine()) != null) {
            // Part 1

            String leftPart = line.substring(0, line.length() / 2);
            String rightPart = line.substring(line.length() / 2);
            for (int i = 0; i < line.length() / 2; i++) {
                char c = line.charAt(i);
                if (rightPart.contains(String.valueOf(c))) {
                    if (c <= 'Z') {
                        total += (c - 'A') + 27;
                    } else  {
                        total += (c - 'a') + 1;
                    }
                    break;
                }
            }

            // Part 2
            for (String e : line.split("")) {
                lists.get(listIdx).add(alphabet.indexOf(e));
            }
            listIdx++;
            if (listIdx < 3) {
                continue;
            }

            lists.get(0).retainAll(lists.get(1));
            lists.get(0).retainAll(lists.get(2));

            sumOfPrio += lists.get(0).stream().reduce((a, b) -> a + b).get();

            lists = new ArrayList<>();
            lists.add(new HashSet<>());
            lists.add(new HashSet<>());
            lists.add(new HashSet<>());
            listIdx = 0;


        }
        System.out.println(total);
        System.out.println(sumOfPrio);

    }
}
