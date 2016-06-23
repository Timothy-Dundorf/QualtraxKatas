using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BowlingGame.Tests
{
    [TestClass]
    public class GameTwoTests
    {
        private GameTwo game;

        public GameTwoTests()
        {
            game = new GameTwo();
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
            RollMany(18, 1);
            Assert.AreEqual(29, game.Score());
        }

        [TestMethod]
        public void TestSpareLaterInGame()
        {
            RollMany(16, 1);
            RollMany(2, 5);
            RollMany(2, 1);
            Assert.AreEqual(29, game.Score());
        }

        [TestMethod]
        public void TestStrike()
        {
            RollMany(1, 10);
            RollMany(18, 1);
            Assert.AreEqual(30, game.Score());
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
        public void AllStrikes()
        {
            RollMany(12, 10);
            Assert.AreEqual(300, game.Score());
        }

        private void RollMany(Int32 numberOfRolls, Int32 rollScore)
        {
            for (var i = 0; i < numberOfRolls; i++)
                game.Roll(rollScore);
        }
    }
}