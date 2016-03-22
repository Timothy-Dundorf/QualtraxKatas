{
    var minFloor;
    var maxFloor;
    init: function(elevators, floors) 
    {
        minFloor = floors[0].floorNum();
        maxFloor = floors[floors.length - 1].floorNum();

        document.write("minFloor=" + minFloor);
        document.write("maxFloor=" + maxFloor);


        var elevator = elevators[0]; // Let's use the first elevator

        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() 
        {
            
        });
    },
    update: function(dt, elevators, floors) 
    {
        // We normally don't need to do anything here
    }
}