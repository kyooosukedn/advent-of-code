import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Day02 {
    public static void main(String[] args) throws IOException {
        int total = 0;
        List<Integer> scores = new ArrayList<>();
        BufferedReader reader = new BufferedReader(new FileReader("AdventOfCode2022/src/input/day02.txt"));
        String line;
        while((line = reader.readLine()) != null) {
            String[] parts = line.split(" ");
            /*
            scores.add(scores(parts[0], parts[1]));
            total = scores.stream().reduce(0, (a,b) -> a + b);

             */
            scores.add(secondColumnStrategy(parts[0],parts[1]));
            total = scores.stream().reduce(0, (a,b) -> a + b);


        }
        System.out.println(total);
    }

    public static int scores(String opponent, String you) {
        /*
        A for rock, B for Paper, C for Scissors (opponent)
        X for Rock, Y for Paper, Z for Scissors (you)
        0 if lost, 3 if draw, 6 if won
        Win possibilities: A Y, B Z, C X
        Draw possibilities: A X, B Y, C Z
        Lose possibilities: C Y, B X, A Z
         */
        int score = 0;
        // Win
        if (opponent.equals("A") && you.equals("Y")) {
            score = 6 + score(you);
        }
        // Win
        if (opponent.equals("B") && you.equals("Z")) {
            score = 6 + score(you);
        }
        // Win
        if (opponent.equals("C") && you.equals("X")) {
            score = 6 + score(you);
        }

        // Draw
        if (opponent.equals("A") && you.equals("X")) { //
            score = 3 + score(you);
        }
        // Draw
        if (opponent.equals("B") && you.equals("Y")) {
            score = 3 + score(you);
        }
        // Draw
        if (opponent.equals("C") && you.equals("Z")) {
            score = 3 + score(you);
        }
        // Lose
        if (opponent.equals("C") && you.equals("Y")) {
            score = 0 + score(you);
        }
        // Lose
        if (opponent.equals("B") && you.equals("X")) {
            score = 0 + score(you);
        }
        // Lose
        if (opponent.equals("A") && you.equals("Z")) {
            score = 0 + score(you);
        }

        return score;
    }

    public static int score(String input) {
        int score = 0;
        if (input.equals("X")) {
            score = 1;
        }
        if (input.equals("Y")) {
            score = 2;
        }
        if (input.equals("Z")) {
            score = 3;
        }
        return score;
    }

    public static int secondColumnStrategy(String opponent, String you) {
        int score = 0;
        switch (opponent){
            case "A":{
                if(you.equals("Y")){
                    score += 3+1;
                } else if (you.equals("X")) {
                    score += 3;
                }else{
                    score += 6+2;
                }
                break;
            }

            case "B":{
                if(you.equals("Z")){
                    score += 6+3;
                } else if (you.equals("Y")) {
                    score += 3+2;
                }else{
                    score += 1;
                }
                break;
            }

            case "C":{
                if(you.equals("X")){
                    score += 2;
                } else if (you.equals("Z")) {
                    score += 6+1;
                }else{
                    score += 3+3;
                }
                break;
            }

            default:{
                break;
            }
        }
        return score;
    }
}
