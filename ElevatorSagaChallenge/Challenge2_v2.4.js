
{ 
   //Refactor to give precedence to pick drop off floors
    init: function(elevators, floors) 
    {
        var minFloor = 0;
        var maxFloor = floors[floors.length - 1].floorNum();

        var buttonPressedBuffer = createArray(elevators.length, 0);

        var masterUpBuffer = [];
        var masterDownBuffer = [];

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

            }
            else if (currentBestDirection == "down")
            {
                masterDownBuffer = masterDownBuffer.filter(function(floor)
                    {
                        return floor != currentBestDestination;
                    });

            }
            else
            {
                //TODO add magic master buffer grabber
            }
            return currentBestDestination;
        }
        function getTheLightsRight(elevatorNum)
        {
            var elevator = elevators[elevatorNum];
            if (elevator.destinationQueue.length == 0)
            {
                elevators[elevatorNum].goingDownIndicator(true);
                elevators[elevatorNum].goingUpIndicator(true);
            }
            else if(elevator.currentFloor > elevator.destinationQueue[0])
            {
                elevators[elevatorNum].goingDownIndicator(true);
                elevators[elevatorNum].goingUpIndicator(false);
            }
            else
            {
                elevators[elevatorNum].goingDownIndicator(false);
                elevators[elevatorNum].goingUpIndicator(true);
            }
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
                
                if(buttonPressedBuffer[ind].length != 0)
                {
                    if(elevator.currentFloor < buttonPressedBuffer[ind][0])
                    {
                        buttonPressedBuffer[ind].sort();

                    }
                    else
                    {
                        buttonPressedBuffer[ind].reverse();

                    }
                    elevator.destinationQueue = buttonPressedBuffer[ind];
                    elevator.checkDestinationQueue();
                    buttonPressedBuffer[ind] = [];
                }
                else if ((masterUpBuffer.length != 0 || masterDownBuffer.length != 0))
                {
                    
                    var bestDestinationFromIdleNum = getBestDestinationFromIdle(ind, elevator.currentFloor());
                    elevator.destinationQueue.push(bestDestinationFromIdleNum);
                    elevator.checkDestinationQueue();

                }
                
                else 
                {
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
                    getTheLightsRight(ind);
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
                    getTheLightsRight(ind);
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
                    getTheLightsRight(ind);
                    elevator.goToFloor(floorNum, true);
                }

            });

        });
        floors.forEach(function(floor)
        {
            floor.on("up_button_pressed", function()
            {
                masterUpBuffer.push(floor.floorNum());
            });
            floor.on("down_button_pressed", function()
            {
                masterDownBuffer.push(floor.floorNum());
            });
        });
    },
        // Called every 0.1 seconds
    update: function(dt, elevators, floors) 
    {
        
    }


}
