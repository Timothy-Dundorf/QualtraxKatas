using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BowlingGame
{
    public class GameTwo
    {
        private List<Int32> rolls;

        public GameTwo()
        {
            rolls = new List<Int32>();
        }

        public void Roll(Int32 rollScore)
        {
            rolls.Add(rollScore);
        }

        public Int32 Score()
        {
            var score = 0;
            var currentRoll = 0;

            for (var frame = 0; frame < 10; frame++)
            {
                if (IsStrike(currentRoll))
                {
                    score += CalculateBonusFrame(currentRoll);
                    currentRoll++;
                }
                else if (IsSpare(currentRoll))
                {
                    score += CalculateBonusFrame(currentRoll);
                    currentRoll += 2;
                }
                else
                {
                    score += CalculateOpenFrame(currentRoll);
                    currentRoll += 2;
                }
            }

            return score;
        }

        private Int32 CalculateBonusFrame(Int32 currentRoll)
        {
            return rolls[currentRoll] + rolls[currentRoll + 1] + rolls[currentRoll + 2];
        } 

        private Int32 CalculateOpenFrame(Int32 currentRoll)
        {
            return rolls[currentRoll] + rolls[currentRoll + 1];
        }

        private Boolean IsStrike(Int32 currentRoll)
        {
            return rolls[currentRoll] == 10;
        }

        private Boolean IsSpare(Int32 currentRoll)
        {
            return rolls[currentRoll] + rolls[currentRoll + 1] == 10;
        }        
    }
}
