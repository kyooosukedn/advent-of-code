using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        string[] data = File.ReadAllText("./day6.txt").Split("\n");
        List<Boat> boats = Boat.ParseMultipleBoats(data);
        Boat boat = Boat.ParseBoat(data);

        Console.WriteLine($"Part 1: {boats.Select(boat => boat.FindPossibilities()).Aggregate((x, y) => x * y)}");
        Console.WriteLine($"Part 2: {boat.FindPossibilities()}");
    }
}

record Boat(long Time, long Distance)
{
    bool CanBeat(long boost) => (Time - boost) * boost > Distance;

    public long FindPossibilities() =>
        Enumerable.Range(1, (int)Distance).Count(x => CanBeat(x) == true);

    public static Boat ParseBoat(string[] lines)
    {
        if (lines.Length >= 2)
        {
            string times = string.Join("", Regex.Matches(lines[0].Trim(), @"\d+").Select(match => match.Value));
            string distance = string.Join("", Regex.Matches(lines[1].Trim(), @"\d+").Select(match => match.Value));

            return new Boat(long.Parse(times), long.Parse(distance));
        }
        return new Boat(0, 0);
    }

    public static List<Boat> ParseMultipleBoats(string[] lines)
    {
        List<Boat> boats = new();

        if (lines.Length >= 2)
        {
            string[] times = lines[0].Split(' ', StringSplitOptions.RemoveEmptyEntries);
            string[] distance = lines[1].Split(' ', StringSplitOptions.RemoveEmptyEntries);

            for (int i = 1; i < times.Length; i++)
            {
                boats.Add(new Boat(long.Parse(times[i]), long.Parse(distance[i])));
            }
        }

        return boats;
    }
}

