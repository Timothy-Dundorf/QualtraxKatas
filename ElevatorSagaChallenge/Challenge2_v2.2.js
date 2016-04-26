
{ 
   
    init: function(elevators, floors) 
    {
        var minFloor = 0;
        var maxFloor = floors[floors.length - 1].floorNum();
        var currentClosestElevatorNumMagicNumber = -1;

        var averageDistanceDownArray = [];
        var averageDistanceUpArray = [];

        var buttonPressedBuffer = createArray(elevators.length, 0);

        var masterUpBuffer = [];
        var masterDownBuffer = [];

        var calledToFloorUpBuffer = createArray(elevators.length, 0);
        var calledToFloorDownBuffer = createArray(elevators.length, 0);



        for (var i = 0; i <= maxFloor; i++)
        {

            averageDistanceUpArray.push(averageDistanceToTravel(i, "up"));
            averageDistanceDownArray.push(averageDistanceToTravel(i, "down"));
        }


        function createArray(length) 
        {
            var arr = new Array(length || 0),
                i = length;

             if (arguments.length > 1)
             {
                var args = Array.prototype.slice.call(arguments, 1);
                while(i--) arr[length-1 - i] = createArray.apply(this, args);
             }

            return arr;
        }


        function averageDistanceToTravel(floorNum, direction)
        {
            if (direction == "up")
            {
                return (maxFloor - floorNum)/2;
            }
            return  floorNum/2;
        }

        function getClosestElevatorNum(floorNum)
        {
            var currentClosestElevatorNum = currentClosestElevatorNumMagicNumber;
            var currentClosestStoppedElevatorNum = getClosestStoppedElevatorNum(floorNum);
            if (currentClosestStoppedElevatorNum = currentClosestElevatorNumMagicNumber)
            {
                
            }
            return currentClosestStoppedElevatorNum;


        }
        function getClosestStoppedElevatorNum(floorNum)
        {
            var currentClosestElevatorNum = currentClosestElevatorNumMagicNumber;

            for (var i = 0; i < elevators.length; i++)
            {
                if(elevators[i].destinationQueue.length == 0)
                {
                    var distance = absDistance(elevators[i].currentFloor(), floorNum);
                    if(currentClosestElevatorNum == currentClosestElevatorNumMagicNumber)
                        currentClosestElevatorNum = i;
                    
                    var distanceCurrentClosestElevator = absDistance(elevators[currentClosestElevatorNum].currentFloor(), floorNum);

                    if(distanceCurrentClosestElevator > distance)
                    {
                        currentClosestElevatorNum = i; 
                    }
                }
            }

            return currentClosestElevatorNum;
        }
        
        function absDistance(floorNum, destinationFloorNum)
        {
            var distance = Math.abs(destinationFloorNum - floorNum);
            return distance;

        }
        //ToDo split best Destination Up or Down preference per even or odd elevators
        function getBestDestinationFromIdle(elevatorNum, floorNum)
        {
            var currentBestDestination = maxFloor + maxFloor + maxFloor;
            var currentBestDirection = "";

            for (var i = 0; i < masterUpBuffer.length; i++)
            {
                var calledToNum = masterUpBuffer[i];
                if (absDistance(floorNum, currentBestDestination) > absDistance(floorNum, calledToNum))
                {
                    currentBestDestination = calledToNum;
                    currentBestDirection = "up";
                }
            }

            for (var i = 0; i < masterDownBuffer.length; i++)
            {
                var calledToNum = masterDownBuffer[i];            
                if (absDistance(floorNum, currentBestDestination) > absDistance(floorNum, calledToNum))
                {
                    currentBestDestination = calledToNum;
                    currentBestDirection = "down";
                }
            }
            if (currentBestDirection == "up")
            {
                masterUpBuffer = masterUpBuffer.filter(function(floor)
                    {
                        return floor != currentBestDestination;
                    });
                elevators[elevatorNum].goingUpIndicator(true);
                elevators[elevatorNum].goingDownIndicator(false);
            }
            else if (currentBestDirection == "down")
            {
                masterDownBuffer = masterDownBuffer.filter(function(floor)
                    {
                        return floor != currentBestDestination;
                    });
                elevators[elevatorNum].goingDownIndicator(true);
                elevators[elevatorNum].goingUpIndicator(false);
            }
            else
            {
                //TODO add magic master buffer grabber
            }
            return currentBestDestination;
        }






        //for (var i = 0; i < elevators.length; i++)
        elevators.forEach(function(elevator, ind)
        {
            //TODO Fix the hole due to order of operation. Nothing gets removed from the elevator buffer.
            elevator.on("stopped_at_floor", function(floorNum)
            {
                
            });

            elevator.on("floor_button_pressed", function(floorNum)
            {
                //window.alert("floorNum " + floorNum + "pressed");
                buttonPressedBuffer[ind].push(floorNum);
            });

            elevator.on("idle", function() 
            {
                //window.alert("idle")
                if ((masterUpBuffer.length != 0 || masterDownBuffer.length != 0) && elevator.loadFactor() < (2/3))          {
                    
                    var bestDestinationFromIdleNum = getBestDestinationFromIdle(ind, elevator.currentFloor());
                    elevator.destinationQueue.push(bestDestinationFromIdleNum);
                    elevator.checkDestinationQueue();

                }
                else if(buttonPressedBuffer[ind].length != 0)
                {
                    if(elevator.currentFloor < buttonPressedBuffer[ind][0])
                    {
                        buttonPressedBuffer[ind].sort();
                        elevator.goingUpIndicator(true);
                        elevator.goingDownIndicator(false);
                    }
                    else
                    {
                        buttonPressedBuffer[ind].reverse();
                        elevator.goingUpIndicator(false);
                        elevator.goingDownIndicator(true);
                    }
                    elevator.destinationQueue = buttonPressedBuffer[ind];
                    elevator.checkDestinationQueue();
                    buttonPressedBuffer[ind] = [];
                }
                
                else 
                {
                    elevator.goingUpIndicator(true);
                    elevator.goingDownIndicator(true);
                    if (ind != 0)
                        elevator.goToFloor(Math.ceil(maxFloor / ind));
                    else 
                        elevator.goToFloor(0);

                }
            });


            elevator.on("passing_floor", function(floorNum, direction)
            {
                if(elevator.destinationQueue.find(function(floor)
                    {
                        
                        return floorNum == floor;

                    }))
                {
                     elevator.destinationQueue = elevator.destinationQueue.filter(function(floor)
                        {
                            return floor != floorNum;
                        });
                    elevator.goToFloor(floorNum, true);
                }
                else if(direction == "up" && elevator.loadFactor() < (2/3) && masterUpBuffer.find(function(floor)
                    {

                        return floorNum == floor;
                    }))
                {
                     masterUpBuffer = masterUpBuffer.filter(function(floor)
                        {
                            return floor != floorNum;
                        });
                    elevator.goToFloor(floorNum, true);
                }
                else if(direction == "down" && elevator.loadFactor() < (2/3) && masterDownBuffer.find(function(floor)
                    {
                        return floorNum == floor;
                    }))
                {
                    masterDownBuffer = masterDownBuffer.filter(function(floor)
                        {
                            return floor != floorNum;
                        });
                    elevator.goToFloor(floorNum, true);
                }

            });

        });
        floors.forEach(function(floor)
        {
            floor.on("up_button_pressed", function()
            {
                masterUpBuffer.push(floor.floorNum());
                masterUpBuffer.sort();
            });
            floor.on("down_button_pressed", function()
            {
                masterDownBuffer.push(floor.floorNum());
                masterDownBuffer.reverse();
            });
        });
    },
        // Called every 0.1 seconds
    update: function(dt, elevators, floors) 
    {
        
    }


}
