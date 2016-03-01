using System;
using MarsRover;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MarsRoverTests
{
    [TestClass]
    public class MapTests
    {
        private const Int32 MapSize = 5;
        private Map map;

        public MapTests()
        {
            map = new Map(MapSize);
        }

        [TestMethod]
        public void HasObstacleReturnsTrueWhenOneIsPresent()
        {
            map.AddObstacle(new Coordinate { X = 1, Y = 2 });

            Assert.IsTrue(map.HasObstacle(new Coordinate(1, 2)));
        }

        [TestMethod]
        public void HasObstacleReturnsFalseWhenNoneIsPresent()
        {
            map.AddObstacle(new Coordinate { X = 1, Y = 2 });

            Assert.IsFalse(map.HasObstacle(new Coordinate(3, 2)));
        }

        [TestMethod]
        public void HasObstacleReturnsFalseWhenCoordinateValuesAreReversed()
        {
            map.AddObstacle(new Coordinate { X = 1, Y = 2 });

            Assert.IsFalse(map.HasObstacle(new Coordinate(2, 1)));
        }

        [TestMethod]
        public void ProcessLocationHandlesWrappingOnTheXAxis()
        {
            var repositionedLocation = map.ProcessLocation(new Coordinate(6, 5));

            Assert.AreEqual(0, repositionedLocation.X);
            Assert.AreEqual(5, repositionedLocation.Y);
        }

        [TestMethod]
        public void ProcessLocationHandlesWrappingOnTheYAxis()
        {
            var repositionedLocation = map.ProcessLocation(new Coordinate(5, 6));

            Assert.AreEqual(5, repositionedLocation.X);
            Assert.AreEqual(0, repositionedLocation.Y);
        }

        [TestMethod]
        public void ProcessLocationHandlesWrappingOnTheXAxisForNegativePosition()
        {
            var repositionedLocation = map.ProcessLocation(new Coordinate(-1, 5));

            Assert.AreEqual(5, repositionedLocation.X);
            Assert.AreEqual(5, repositionedLocation.Y);
        }

        [TestMethod]
        public void ProcessLocationHandlesWrappingOnTheYAxisForNegativePosition()
        {
            var repositionedLocation = map.ProcessLocation(new Coordinate(5, -1));

            Assert.AreEqual(5, repositionedLocation.X);
            Assert.AreEqual(5, repositionedLocation.Y);
        }

        [TestMethod]
        public void ProcessLocationHandlesWrappingOnTheXAndYAxis()
        {
            var repositionedLocation = map.ProcessLocation(new Coordinate(6, 6));

            Assert.AreEqual(0, repositionedLocation.X);
            Assert.AreEqual(0, repositionedLocation.Y);
        }

        [TestMethod]
        public void ProcessLocationHandlesWrappingOnTheXAndYAxisForNegativePosition()
        {
            var repositionedLocation = map.ProcessLocation(new Coordinate(-1, -1));

            Assert.AreEqual(5, repositionedLocation.X);
            Assert.AreEqual(5, repositionedLocation.Y);
        }
    }
}
