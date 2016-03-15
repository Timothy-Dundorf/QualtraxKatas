using System;
using System.Collections.Generic;
using System.Linq;

namespace MarsRover
{
    public class Map
    {
        public Int32 Size { get; private set; }
        private List<Coordinate> obstacles;

        public Map(Int32 size)
        {
            this.Size = size;
            obstacles = new List<Coordinate>();
        }

        public Boolean HasObstacle(Coordinate coordinate)
        {
            return obstacles.Any(o => o.X == coordinate.X && o.Y == coordinate.Y);
        }

        public void AddObstacle(Coordinate coordinate)
        {
            obstacles.Add(coordinate);
        }

        public Coordinate ProcessLocation(Coordinate location)
        {
            var newLocation = location;

            if (location.X > Size)
                newLocation.X = 0;
            else if (location.X < 0)
                newLocation.X = Size;

            if (location.Y > Size)
                newLocation.Y = 0;
            else if (location.Y < 0)
                newLocation.Y = Size;

            return newLocation;
        }
    }
}