using System;
using System.Linq;
using MarsRover;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MarsRoverTests
{
    [TestClass]
    public class RoverTests
    {
        private Map map;

        public RoverTests()
        {
            map = new Map(10);
        }

        [TestMethod]
        public void RoverIsCreatedWithAPositionAndDirection()
        {
            var rover = new Rover(5, 5, Direction.North, map);
            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.North);
        }

        [TestMethod]
        public void RoverMovesForwardOneSpaceWhileFacingNorth()
        {
            var rover = new Rover(5, 5, Direction.North, map);
            var commands = new char[] { Command.Forward };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 6);
            Assert.AreEqual(rover.Direction, Direction.North);
        }

        [TestMethod]
        public void RoverMovesBackwardsOneSpaceWhileFacingNorth()
        {
            var rover = new Rover(5, 5, Direction.North, map);
            var commands = new char[] { Command.Backward };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 4);
            Assert.AreEqual(rover.Direction, Direction.North);
        }

        [TestMethod]
        public void RoverMovesForwardOneSpaceWhileFacingEast()
        {
            var rover = new Rover(5, 5, Direction.East, map);
            var commands = new char[] { Command.Forward };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 6);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.East);
        }

        [TestMethod]
        public void RoverMovesBackwardsOneSpaceWhileFacingEast()
        {
            var rover = new Rover(5, 5, Direction.East, map);
            var commands = new char[] { Command.Backward };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 4);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.East);
        }

        [TestMethod]
        public void RoverMovesForwardOneSpaceWhileFacingSouth()
        {
            var rover = new Rover(5, 5, Direction.South, map);
            var commands = new char[] { Command.Forward };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 4);
            Assert.AreEqual(rover.Direction, Direction.South);
        }

        [TestMethod]
        public void RoverMovesBackwardsOneSpaceWhileFacingSouth()
        {
            var rover = new Rover(5, 5, Direction.South, map);
            var commands = new char[] { Command.Backward };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 6);
            Assert.AreEqual(rover.Direction, Direction.South);
        }

        [TestMethod]
        public void RoverMovesForwardOneSpaceWhileFacingWest()
        {
            var rover = new Rover(5, 5, Direction.West, map);
            var commands = new char[] { Command.Forward };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 4);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.West);
        }

        [TestMethod]
        public void RoverMovesBackwardsOneSpaceWhileFacingWest()
        {
            var rover = new Rover(5, 5, Direction.West, map);
            var commands = new char[] { Command.Backward };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 6);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.West);
        }

        [TestMethod]
        public void RoverTurnsLeftFacingNorth()
        {
            var rover = new Rover(5, 5, Direction.North, map);
            var commands = new char[] { Command.TurnLeft };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.West);
        }

        [TestMethod]
        public void RoverTurnsLeftFacingWest()
        {
            var rover = new Rover(5, 5, Direction.West, map);
            var commands = new char[] { Command.TurnLeft };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.South);
        }

        [TestMethod]
        public void RoverTurnsLeftFacingSouth()
        {
            var rover = new Rover(5, 5, Direction.South, map);
            var commands = new char[] { Command.TurnLeft };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.East);
        }

        [TestMethod]
        public void RoverTurnsLeftFacingEast()
        {
            var rover = new Rover(5, 5, Direction.East, map);
            var commands = new char[] { Command.TurnLeft };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.North);
        }

        [TestMethod]
        public void RoverTurnsRightFacingNorth()
        {
            var rover = new Rover(5, 5, Direction.North, map);
            var commands = new char[] { Command.TurnRight };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.East);
        }

        [TestMethod]
        public void RoverTurnsRightFacingWest()
        {
            var rover = new Rover(5, 5, Direction.West, map);
            var commands = new char[] { Command.TurnRight };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.North);
        }

        [TestMethod]
        public void RoverTurnsRightFacingSouth()
        {
            var rover = new Rover(5, 5, Direction.South, map);
            var commands = new char[] { Command.TurnRight };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.West);
        }

        [TestMethod]
        public void RoverTurnsRightFacingEast()
        {
            var rover = new Rover(5, 5, Direction.East, map);
            var commands = new char[] { Command.TurnRight };

            rover.Move(commands);

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.South);
        }

        [TestMethod]
        public void ForwardCommandIsNotTakenWhenObstacleIsInPlace()
        {
            var map = new Map(10);
            map.AddObstacle(new Coordinate(4, 5));

            var rover = new Rover(5, 5, Direction.West, map);
            rover.Move(new Char[] { Command.Forward });

            Assert.AreEqual(rover.CurrentLocation.X, 5);
            Assert.AreEqual(rover.CurrentLocation.Y, 5);
            Assert.AreEqual(rover.Direction, Direction.West);
        }

        [TestMethod]
        public void BackwardCommandIsNotTakenWhenObstacleIsInPlace()
        {
            var map = new Map(10);
            map.AddObstacle(new Coordinate(2, 2));

            var rover = new Rover(2, 3, Direction.North, map);
            rover.Move(new Char[] { Command.Backward });

            Assert.AreEqual(rover.CurrentLocation.X, 2);
            Assert.AreEqual(rover.CurrentLocation.Y, 3);
            Assert.AreEqual(rover.Direction, Direction.North);
        }

        [TestMethod]
        public void ReportWhenObstacleIsForward()
        {
            var map = new Map(10);
            map.AddObstacle(new Coordinate(4, 5));

            var rover = new Rover(5, 5, Direction.West, map);
            rover.Move(new Char[] { Command.Forward });

            var obstacles = rover.ReportObstacles();
            Assert.AreEqual(1, obstacles.Count);
            Assert.AreEqual(4, obstacles.First().X);
            Assert.AreEqual(5, obstacles.First().Y);
        }

        [TestMethod]
        public void NoReportWhenNoObstacleIsForward()
        {
            var map = new Map(10);
            map.AddObstacle(new Coordinate(4, 5));

            var rover = new Rover(1, 1, Direction.West, map);
            rover.Move(new Char[] { Command.Forward });

            Assert.AreEqual(0, rover.ReportObstacles().Count);
        }

        [TestMethod]
        public void ReportWhenObstacleIsBackward()
        {
            var map = new Map(10);
            map.AddObstacle(new Coordinate(4, 5));

            var rover = new Rover(3, 5, Direction.West, map);
            rover.Move(new Char[] { Command.Backward });

            Assert.IsTrue(rover.ReportObstacles().Any(o => o.X == 4 && o.Y == 5));
        }

        [TestMethod]
        public void NoReportWhenNoObstacleIsBackward()
        {
            var map = new Map(10);
            map.AddObstacle(new Coordinate(4, 5));

            var rover = new Rover(6, 5, Direction.West, map);
            rover.Move(new Char[] { Command.Backward });

            Assert.AreEqual(0, rover.ReportObstacles().Count);
        }

        [TestMethod]
        public void RoverPositionWrapsAlongXAxis()
        {
            var map = new Map(2);
            var rover = new Rover(2, 2, Direction.East, map);
            rover.Move(new Char[] { Command.Forward });

            Assert.AreEqual(0, rover.CurrentLocation.X);
            Assert.AreEqual(2, rover.CurrentLocation.Y);
        }
    }
}