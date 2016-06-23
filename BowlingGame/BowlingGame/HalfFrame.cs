using System;

namespace BowlingGame
{
    public class HalfFrame
    {
        public Boolean PostStrike{ get; private set; }
        private Int32 rollScore;

        public HalfFrame(Int32 rollScore, Boolean postStrike)
        {
            this.rollScore = rollScore;
            this.PostStrike = postStrike;
        }

        public Int32 GetScore()
        {
            return rollScore;
        }
    }
}
