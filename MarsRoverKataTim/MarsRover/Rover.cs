using System;
using System.Collections.Generic;

namespace MarsRover
{
    public class Rover
    {
        public Direction Direction { get; private set; }
        public Coordinate CurrentLocation { get; private set; }
        private Int32 x; 
        private Int32 y;
        private Map map;
        private List<Direction> leftCompass = new List<Direction> { Direction.West, Direction.North, Direction.East, Direction.South, Direction.West };
        private List<Direction> rightCompass = new List<Direction> { Direction.North, Direction.East, Direction.South, Direction.West, Direction.North };
        private List<Coordinate> obstaclesFound = new List<Coordinate>();
        
        public Rover(Int32 x, Int32 y, Direction direction, Map map)
        {
            this.x = x;
            this.y = y;
            this.Direction = direction;
            this.map = map;
            CurrentLocation = new Coordinate(x, y);
        }

        public List<Coordinate> ReportObstacles()
        {
            return obstaclesFound;
        }

        public void Move(IEnumerable<Char> commands)
        {
            foreach (var command in commands)
            {
                if (command == Command.Forward)
                {
                    LookForward();
                    var spaceInSight = new Coordinate(x, y);
                    if (map.HasObstacle(spaceInSight))
                    {
                        obstaclesFound.Add(spaceInSight);
                        LookBackward();
                    }
                }
                else if (command == Command.Backward)
                {
                    LookBackward();
                    var spaceInSight = new Coordinate(x, y);
                    if (map.HasObstacle(spaceInSight))
                    {
                        obstaclesFound.Add(spaceInSight);
                        LookForward();
                    }
                }
                else if (command == Command.TurnLeft)
                {
                    TurnLeft();
                }
                else if (command == Command.TurnRight)
                {
                    TurnRight();
                }

                CurrentLocation.X = x;
                CurrentLocation.Y = y;
            }
        }

        private void LookForward()
        {
            if (Direction == Direction.North)
                y++;
            else if (Direction == Direction.East)
                x++;
            else if (Direction == Direction.South)
                y--;
            else
                x--;

            RepositionToGrid();
        }

        private void RepositionToGrid()
        {
            var spaceInSight = map.ProcessLocation(new Coordinate(x, y));
            x = spaceInSight.X;
            y = spaceInSight.Y;
        }

        private void LookBackward()
        {
            if (Direction == Direction.North)
                y--;
            else if (Direction == Direction.East)
                x--;
            else if (Direction == Direction.South)
                y++;
            else
                x++;

            RepositionToGrid();
        }

        private void TurnLeft()
        {
            var index = leftCompass.FindLastIndex(d => d == Direction);
            index--;

            Direction = leftCompass[index];
        }

        private void TurnRight()
        {
            var index = rightCompass.FindIndex(d => d == Direction);
            index++;

            Direction = rightCompass[index];
        }
    }
}
