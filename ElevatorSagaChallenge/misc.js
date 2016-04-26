        var buttonPressedUpArray = [false, false];
        var buttonPressedDownArray = [false, false];

        for (var i = 1; i < maxFloor; i++)
        {
            buttonPressedUpArray.push(false);
            buttonPressedDownArray.push(false);
        }





        if (elevator.getPressedFloors().indexOf(floorNum) != -1)
                {
                    function removeFloorFromDestinationQueue(floor)
                    {
                        return floor != floorNum;
                    }
                    elevator.goToFloor(floorNum, true);
                    elevator.destinationQueue = elevator.destinationQueue.filter(removeFloorFromDestinationQueue);[]