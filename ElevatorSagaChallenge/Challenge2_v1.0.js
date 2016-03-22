
{ 
   
    init: function(elevators, floors) 
    {
        var minFloor = 0;
        var maxFloor = floors[floors.length - 1].floorNum();
        var currentClosestElevatorNumMagicNumber = -1;
        var averageDistanceDownArray = [];
        var averageDistanceUpArray = [];
        var buttonPressedBuffer = createArray(elevators.length, 0);
        var calledToFloorUpBuffer = createArray(elevators.length, 0);
        var calledToFloorDownBuffer = createArray(elevators.length, 0);
        var masterUpBuffer;
        var masterDownBuffer;



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

    function absDistance(floorNum, destinationFloorNum)
    {
        return Math.abs(destinationFloorNum - floorNum);
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
        if (currentClosestStoppedElevatorNum != currentClosestElevatorNumMagicNumber)
        {
            return currentClosestStoppedElevatorNum;
        }

        return getClosestElevatorNumBasedOnLastDestination(floorNum);
    }
    function getClosestStoppedElevatorNum(floorNum)
    {
        var currentClosestElevatorNum = currentClosestElevatorNumMagicNumber;

        for (var i = 0; i < elevators.length; i++)
        {
            window.alert("a1 " + i);
            if(elevators[i].destinationQueue.length == 0)
            {
                var distance = Math.abs(floorNum - elevators[i].currentFloor());
                window.alert("a2 " + distance + " floorNum " + floorNum + " elevator[i].currentFloor[] " + elevators[i].currentFloor());
                if(currentClosestElevatorNum == currentClosestElevatorNumMagicNumber)
                    currentClosestElevatorNum = i;
                
                var distanceCurrentClosestElevator = Math.abs(floorNum - elevators[currentClosestElevatorNum].currentFloor());

                if(distanceCurrentClosestElevator > distance)
                {
                    currentClosestElevatorNum = i; 
                }
            }
        }

        return currentClosestElevatorNum;
    }
    function getClosestElevatorNumBasedOnLastDestination(floorNum)
    {
        var currentClosestElevatorNum = currentClosestElevatorNumMagicNumber;


        for (var i = 0; i < elevators.length; i++)
        {
            var distance = Math.abs(floorNum - elevators[i].destinationQueue[elevators[i].destinationQueue.length -1]);
            
            if(currentClosestElevatorNum == currentClosestElevatorNumMagicNumber)
                currentClosestElevatorNum = i;

            var distanceCurrentClosestElevator = Math.abs(floorNum - elevators[currentClosestElevatorNum].destinationQueue[elevators[i].destinationQueue.length -1]);
            
            if(distanceCurrentClosestElevator > distance)
            {
                currentClosestElevatorNum = i; 
            }
        }

        return currentClosestElevatorNum;

    }
    //ToDo split best Destination Up or Down preference per even or odd elevators
    function getBestDestinationFromIdle(elevatorNum, floorNum)
    {
        var currentBestDestination = maxFloor * 3;

        calledToFloorUpBuffer[elevatorNum].forEach(function(calledToNum)
        {
            if (absDistance(floorNum, currentBestDestination) > absDistance(floorNum, calledToNum))
            {
                currentBestDestination = calledToNum;
            }
        });

        calledToFloorDownBuffer[elevatorNum].forEach(function(calledToNum)
        {
            if (absDistance(floorNum, currentBestDestination) > absDistance(floorNum, calledToNum))
            {
                currentBestDestination = calledToNum;
            }
        });
        window.alert("CurrentBestDestination " + currentBestDestination);
        return currentBestDestination;
    }




        //for (var i = 0; i < elevators.length; i++)
        elevators.forEach(function(elevator, ind)
        {

             elevator.on("stopped_at_floor", function(floorNum)
            {
                //window.alert("stopped a floor" + floorNum);
                //TODO Remove all up or down references  to this floor from calledToFloorUpBuffer or calledToFloorDownBuffer respectively.
                if (elevator.destinationDirection() == "up")
                {
                    calledToFloorUpBuffer[ind] = calledToFloorUpBuffer[ind].filter(function(floor)
                        {
                            return floor != floorNum;
                        });
                }
                else if (elevator.destinationDirection() == "down")
                {
                    calledToFloorDownBuffer[ind] = calledToFloorDownBuffer[ind].filter(function(floor)
                        {
                            return floor != floorNum;
                        });
                }
                else
                {
                    //TODO add magic master buffer grabber
                }
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
                        elevator.goingUpIndicator("true");
                        elevator.goingDownIndicator("false");
                    }
                    else
                    {
                        buttonPressedBuffer[ind].reverse();
                        elevator.goingUpIndicator("false");
                        elevator.goingDownIndicator("true");
                    }
                    elevator.destinationQueue = buttonPressedBuffer[ind];
                    elevator.checkDestinationQueue();
                    buttonPressedBuffer[ind] = [];
                }
                if (calledToFloorUpBuffer[ind].length != 0 || calledToFloorDownBuffer[ind].length != 0)
                {
                    elevator.destinationQueue.push(getBestDestinationFromIdle(ind, elevator.currentFloor()));
                    elevator.checkDestinationQueue();
                }
            });


            elevator.on("passing_floor", function(floorNum, direction)
            {
                //TODO add stops as passing by floors in calledToFloor*Buffers
                
            });

            for (i = 0; i <= maxFloor; i++)
            {
                floors[i].on("up_button_pressed", function()
                {
                    var choosenElevatorNum = getClosestElevatorNum(this.floorNum());
                    //window.alert("Up" + choosenElevatorNum)
                    calledToFloorUpBuffer[choosenElevatorNum].push(this.floorNum());

                });
                floors[i].on("down_button_pressed", function()
                {
                    var choosenElevatorNum = getClosestElevatorNum(this.floorNum());
                    //window.alert("Down" + choosenElevatorNum)

                    calledToFloorDownBuffer[choosenElevatorNum].push(this.floorNum());
                });
            }
        });
    },
        // Called every 0.1 seconds
    update: function(dt, elevators, floors) 
    {
        
    }


}
