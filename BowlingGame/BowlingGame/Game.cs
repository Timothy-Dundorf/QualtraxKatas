using System;
using System.Collections.Generic;
using System.Linq;

namespace BowlingGame
{
    public class Game
    {
        private Int32 gameScore = 0;
        private List<HalfFrame> rolls = new List<HalfFrame>();

        public void Roll(Int32 rollScore)
        {
            gameScore += rollScore;

            if (RollAfterSpareOrStrike())
                gameScore += rollScore;

            if (SecondRollAfterStrike())
                gameScore += rollScore;

            rolls.Add(new HalfFrame(rollScore, false));

            if (Strike(rollScore))
                rolls.Add(new HalfFrame(0, true));
        }

        public Int32 Score()
        {
            return gameScore;
        }

        private Boolean LastTwoRolls10()
        {
            if (rolls.Count < 2)
                return false;

            return (rolls.Last().GetScore() + rolls.ElementAt(rolls.Count - 2).GetScore() == 10);
        }

        private Boolean RollAfterSpareOrStrike()
        {
            return (!rolls.Any() || rolls.Count % 2 == 0) && LastTwoRolls10();
        }
        
        private Boolean Strike(Int32 rollScore)
        {
            return rollScore == 10;
        }

        private Boolean SecondRollAfterStrike()
        {
            if (rolls.Count < 2)
                return false;

            return rolls.ElementAt(rolls.Count - 2).PostStrike;
        }
    }
}