using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BowlingGame.Tests
{
    [TestClass]
    public class GameTests
    {
        private Game game;

        public GameTests()
        {
            game = new Game();
        }

        [TestMethod]
        public void AllGutters()
        {
            RollMany(20, 0);
            Assert.AreEqual(0, game.Score());
        }

        [TestMethod]
        public void AllOnes()
        {
            RollMany(20, 1);
            Assert.AreEqual(20, game.Score());
        }

        [TestMethod]
        public void TestSpare()
        {
            RollMany(2, 5);
            RollMany(9, 1);
            Assert.AreEqual(20, game.Score());
        }

        [TestMethod]
        public void TestSpareLaterInGame()
        {
            RollMany(8, 1);
            RollMany(2, 5);
            RollMany(1, 1);
            Assert.AreEqual(20, game.Score());
        }

        [TestMethod]
        public void TestStrike()
        {
            RollMany(1, 10);
            RollMany(9, 1);
            Assert.AreEqual(21, game.Score());
        }

        [TestMethod]
        public void TestStrikeLaterInGame()
        {
            RollMany(1, 10);
            RollMany(14, 1);
            RollMany(1, 10);
            RollMany(2, 0);
            Assert.AreEqual(36, game.Score());
        }
        [TestMethod]
        public void nineFollowedByOne()
        {
            RollMany(2, 1);
            RollMany(9, 1);
            Assert.AreEqual(11, game.Score());
        }

        private void RollMany(Int32 numberOfRolls, Int32 rollScore)
        {
            for (var i = 0; i < numberOfRolls; i++)
                game.Roll(rollScore);
        }
    }
}