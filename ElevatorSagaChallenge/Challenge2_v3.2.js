
{ 
   //Refactor to give precedence to pick drop off floors
    init: function(elevators, floors) 
    {
        var minFloor = 0;
        var maxFloor = floors[floors.length - 1].floorNum();

        var weightPercent = 2.3;

        var buttonPressedBuffer = createArray(elevators.length, 0);

        //TODO consider adding an intermediate buffer that prevents value an elevator is traveling to be added to the master buffer.
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

        function filterArray(array, removeValue)
        {
        	array = array.filter(function(element)
                        {
                            return element != removeValue;
                        });
        	return array;
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
            	//TODO Consider what the order means and how it effects the efficiency of the solution.
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
            	elevators[elevatorNum].goingDownIndicator(false);
                elevators[elevatorNum].goingUpIndicator(true);
                masterUpBuffer = filterArray(masterUpBuffer,currentBestDestination);

            }
            else if (currentBestDirection == "down")
            {
            	elevators[elevatorNum].goingDownIndicator(true);
                elevators[elevatorNum].goingUpIndicator(false);
                masterDownBuffer = filterArray(masterDownBuffer, currentBestDestination)

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
            if (elevators.length != 1)
            {
	            if(elevator.currentFloor() > elevator.destinationQueue[0])
	            {
	                elevators[elevatorNum].goingDownIndicator(true);
	                elevators[elevatorNum].goingUpIndicator(false);
	            }
	            else if (elevator.currentFloor() < elevator.destinationQueue[0])
	            {
	                elevators[elevatorNum].goingDownIndicator(false);
	                elevators[elevatorNum].goingUpIndicator(true);
	            }
	            else
	            {
	            	elevators[elevatorNum].goingDownIndicator(true);
	           		elevators[elevatorNum].goingUpIndicator(true);
	            }
	        }
	        else
	        {
	        	elevators[elevatorNum].goingDownIndicator(true);
	            elevators[elevatorNum].goingUpIndicator(true);
	        }
            //else if (elevator.destinationQueue.length > 1 )
        }

    	function sortButtonPressedBufferAndDestinationQueue(elevatorNum)
    	{
    		var elevator = elevators[elevatorNum];
    		buttonPressedBuffer[elevatorNum].push(elevators[elevatorNum].destinationQueue);
    		buttonPressedBuffer[elevatorNum].sort(function(a, b){return a-b});

    		if(elevator.currentFloor() > buttonPressedBuffer[elevatorNum])
            {
            	buttonPressedBuffer[elevatorNum].reverse(function(a, b){return a-b});
            }

            elevator.destinationQueue = buttonPressedBuffer[elevatorNum];
            elevator.checkDestinationQueue();
            buttonPressedBuffer[elevatorNum] = [];
    	}

    	function optimizedPassengerLoadFactor(elevatorNum)
    	{
    		var elevator = elevators[elevatorNum];
    		return ((elevator.maxPassengerCount() - weightPercent) / elevator.maxPassengerCount());
    	}







        //for (var i = 0; i < elevators.length; i++)
        elevators.forEach(function(elevator, ind)
        {         
            elevator.on("idle", function() 
            {
                window.alert("idle: " + ind)
                if(buttonPressedBuffer[ind].length != 0)
	                {
	                	sortButtonPressedBufferAndDestinationQueue(ind);
	                	window.alert("elevator: " + ind + " queue: " + elevator.destinationQueue);
	                }
                else if ((masterUpBuffer.length != 0 || masterDownBuffer.length != 0))
                {
                    
                    var bestDestinationFromIdleNum = getBestDestinationFromIdle(ind, elevator.currentFloor());
                    elevator.destinationQueue.push(bestDestinationFromIdleNum);
                    elevator.checkDestinationQueue();
                }
                else 
                {
                	if (ind == 1)
                	{
                		elevator.goToFloor(0);
                	}
                    else if (ind != 0)
                        elevator.goToFloor(Math.ceil(maxFloor / ind));
                    else 
                        elevator.goToFloor(maxFloor - 2);
                }
                getTheLightsRight(ind);
            });

            elevator.on("floor_button_pressed", function(floorNum)
            {
                //window.alert("floorNum " + floorNum + "pressed on" + ind);
                buttonPressedBuffer[ind].push(floorNum);
                if (elevator.loadFactor() > optimizedPassengerLoadFactor(ind))
                {
                	sortButtonPressedBufferAndDestinationQueue(ind);
                	getTheLightsRight(ind);
                }
            });

            elevator.on("passing_floor", function(floorNum, direction)
            {
            	 // if(buttonPressedBuffer[ind].length != 0)
	             //    {
	             //    	sortButtonPressedBufferAndDestinationQueue(ind);
	             //    	window.alert("elevator: " + ind + " queue: " + elevator.destinationQueue)
	             //    }
                if((elevator.destinationQueue.indexOf(floorNum) != -1) || (buttonPressedBuffer[ind].indexOf(floorNum) != -1))
                {
                	//TODO This may be the cause of a data leak. Investigate and fix. 
                     elevator.goToFloor(floorNum, true);
                }
                //TODO Rewrite to consider elevator size as a factor
                else if(direction == "up" && elevator.loadFactor() < optimizedPassengerLoadFactor(ind) && masterUpBuffer.indexOf(floorNum) > -1)
                {
                	window.alert(elevator + " " +weightPercent)
                   	elevator.goToFloor(floorNum, true);
                   	masterUpBuffer = filterArray(masterUpBuffer, floorNum);
                }
                //TODO Rewrite to consider elevator size as a factor.
                else if(direction == "down" && elevator.loadFactor() < optimizedPassengerLoadFactor(ind) && masterDownBuffer.indexOf(floorNum) > -1)
                {
                    elevator.goToFloor(floorNum, true);
                    masterDownBuffer = filterArray(masterDownBuffer, floorNum);
                }
                //else if (elevator.destinationQueue.length = 0 && arrayContains(masterDownBuffer, floorNum) || arrayContains(masterDownBuffer)))

            });

            //TODO Fix the hole due to order of operation. Nothing gets removed from the elevator buffer.
            elevator.on("stopped_at_floor", function(floorNum)
            {
            	getTheLightsRight(ind);
            	//TODO Conisder what is the best if statement for this.
                elevator.destinationQueue = filterArray(elevator.destinationQueue, floorNum);
                elevator.checkDestinationQueue();
                buttonPressedBuffer[ind] = filterArray(buttonPressedBuffer[ind],floorNum);
                
                if (elevator.goingUpIndicator())
                {
                	masterUpBuffer = filterArray(masterUpBuffer, floorNum);
                	if (elevator.loadFactor() < optimizedPassengerLoadFactor(ind) && masterUpBuffer.indexOf(floorNum - 1) > -1)
                	{
                		elevator.goToFloor(floorNum - 1, true);
                		filterArray(masterUpBuffer, floorNum - 1);
                	}
                }
                //TODO Consider what is the best if statement for this.
                else if (elevator.goingDownIndicator())
                {
                	masterDownBuffer = filterArray(masterDownBuffer, floorNum);
                	if (elevator.loadFactor() < optimizedPassengerLoadFactor(ind) && masterDownBuffer.indexOf(floorNum + 1) > -1)
                	{
                		elevator.goToFloor(floorNum + 1, true);
                		filterArray(masterDownBuffer, floorNum + 1)
                	}
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
