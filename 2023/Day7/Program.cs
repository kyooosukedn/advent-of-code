using System;
using System.Collection.Generic;
using System.Linq;

class Program {
  static void Main() {
    // get hands with bid amounts
    var handsWithBids = ParseInput("32T3K 765 \nT55J5 684 \nKK677 28");

    // Order hands based on strength and calculate ranks
    var orderedHands = OrderHands(handsWithBids);

    int totalWins = CalculateTotalWins(orderedHands);

    Console.WriteLine($"Total Wins:  {totalWins}");

  }

  static List<(string Hand, int Bid, int Rank)> OrderHands(<List<(string Hand, intBid)> handsWithBids) {
    // hand order logic
    // list of hands with bid amounts and ranks
    return handsWithBids.Select((handWithBid, index) => (handWithBid.Hand, handWithBid.Bid, index + 1)).ToList();
  }

  static List<(string Hand, int Bid)> CalculateTotalWins(List<(string Hand, int Bid, int Rank)> orderedHands) {
    return orderedHands.Sum(Hand => hand.Bid * hand.Rank);
  }

  static int[][] ParseInput(string filePath) {
    return input.Split('\n')
      .Select(line => {
          var parts = line.Split(' ');
          return (Hand:parts[0], Bid: int.Parse(parts[1]));
          }).ToList();
    
  }
}
