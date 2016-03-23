
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
            //window.alert("a1 " + i);
            if(elevators[i].destinationQueue.length == 0)
            {
                var distance = Math.abs(floorNum - elevators[i].currentFloor());
                //window.alert("a2 " + distance + " floorNum " + floorNum + " elevator[i].currentFloor[] " + elevators[i].currentFloor());
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

    function absDistance(floorNum, destinationFloorNum)
    {
        var distance = Math.abs(destinationFloorNum - floorNum);
        window.alert("absDistance" + distance + "floorNum" + floorNum + "destination Floor " + destinationFloorNum )
        return distance;

    }
    //ToDo split best Destination Up or Down preference per even or odd elevators
    function getBestDestinationFromIdle(elevatorNum, floorNum)
    {
        var currentBestDestination = maxFloor + maxFloor + maxFloor;
        var currentBestDirection = "";

        for (var i = 0; i < calledToFloorUpBuffer.length; i++)
        {
            var calledToNum = calledToFloorUpBuffer[elevatorNum][i];
            if (absDistance(floorNum, currentBestDestination) > absDistance(floorNum, calledToNum))
            {
                currentBestDestination = calledToNum;
                currentBestDirection = "up";
            }
        }

        for (var i = 0; i < calledToFloorDownBuffer[elevatorNum].length; i++)
        {
            var calledToNum = calledToFloorDownBuffer[elevatorNum][i];            
            if (absDistance(floorNum, currentBestDestination) > absDistance(floorNum, calledToNum))
            {
                currentBestDestination = calledToNum;
                currentBestDirection = "down";
            }
        }
        if (currentBestDirection == "up")
        {
            window.alert("saf1");
            calledToFloorUpBuffer[elevatorNum] = calledToFloorUpBuffer[elevatorNum].filter(function(floor)
                {
                    return floor != currentBestDestination;
                });
            elevators[elevatorNum].goingUpIndicator(true);
            elevators[elevatorNum].goingDownIndicator(false);
        }
        else if (currentBestDirection == "down")
        {
            window.alert("saf2");
            calledToFloorDownBuffer[elevatorNum] = calledToFloorDownBuffer[elevatorNum].filter(function(floor)
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
                if(buttonPressedBuffer[ind].length != 0)
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
                if (calledToFloorUpBuffer[ind].length != 0 || calledToFloorDownBuffer[ind].length != 0)
                {
                    
                    var bestDestinationFromIdleNum = getBestDestinationFromIdle(ind, elevator.currentFloor());
                    elevator.destinationQueue.push(bestDestinationFromIdleNum);
                    elevator.checkDestinationQueue();

                }
                else 
                {
                    elevator.goingUpIndicator(true);
                    elevator.goingDownIndicator(true);
                }
            });


            elevator.on("passing_floor", function(floorNum, direction)
            {
                
                
            });

        });
        floors.forEach(function(floor)
        {
            floor.on("up_button_pressed", function()
            {
                var choosenElevatorNum = getClosestElevatorNum(floor.floorNum());
                window.alert("UpChoosenElevator" + choosenElevatorNum);
                calledToFloorUpBuffer[choosenElevatorNum].push(floor.floorNum());
                window.alert("UpBuffer" + calledToFloorUpBuffer[choosenElevatorNum][0]);
            });
            floor.on("down_button_pressed", function()
            {
                var choosenElevatorNum = getClosestElevatorNum(floor.floorNum());
                window.alert("Down ChoosenElevator" + choosenElevatorNum);
                calledToFloorDownBuffer[choosenElevatorNum].push(floor.floorNum());
                window.alert("DownBuffer" + calledToFloorDownBuffer[choosenElevatorNum][0]);
            });
        });
    },
        // Called every 0.1 seconds
    update: function(dt, elevators, floors) 
    {
        
    }


}
