var grid = 
{
  height: 0,
  width: 0,
  viewElement: $("#grid"),
  booleanArray: []
}


function initializeGrid(count)
{
	initializeModelGrid(count);
	initializeScreenGrid(count);
}
function initializeModelGrid(count)
	{
		grid.height = count;
		grid.width = count; 
		grid.booleanArray = createArray(count * count);
	}
function initializeScreenGrid(count)
{
	var gridHeight = grid.viewElement.height();
	var gridWidth = grid.viewElement.width();

	var blockHeight = gridHeight / count;
	var blockWidth = gridWidth / count; 

	var gridHTML = "";
	//Id is the count of the element. 
	for (var i = 0; i < (count * count); i++)
	{
		var GameOfLifeBlock = '<div id="' + i + '" onclick="toggleBlock(this);" style="height: ' + blockHeight + 'px; width: ' + blockWidth + 'px;" class="block"></div>';
		
		gridHTML += GameOfLifeBlock;
	}

	//document.getElementById("grid");
	$("#grid").html(gridHTML);
}
function booleanGridToScreenGrid(booleanGrid)
{
	booleanGrid.forEach(function(isAlive, index){
		if(isAlive)
			$("#" + index).addClass("alive");
		else
			$("#" + index).removeClass("alive");
	})
}
function toggleBlock(element)
{
	toggleColor(element);
	toggleBooleanArrayFromID(element.id);
}
function toggleColor(element)
{
	element = $(element);
	if (element.hasClass("alive"))
	{
		element.removeClass("alive");
		console.log("toggledToDead");
	}
	else
	{
		element.addClass("alive");
		console.log("toggeledToAlive");
	}
}
function toggleBooleanArrayFromID(id)
{
	if (grid.booleanArray[id])
		grid.booleanArray[id] = false;
	else 
		grid.booleanArray[id]= true; 
	console.log("Alive" + grid.booleanArray[id]);

}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

$("#gridRange").on("input change", function() {
	console.log("a1");
	initializeGrid(parseInt($(this).val()));
})

$("#next-button").on("click", function() {
	//Get all selected squares
	var nextBooleanArray = grid.booleanArray;
	$(".alive").each(function(){
		var id = parseInt($(this).attr('id'));
		nextBooleanArray[id] = cellLives(id);
	});
	booleanGridToScreenGrid(nextBooleanArray);
	grid.booleanArray = nextBooleanArray;
	//Iterate through selected squares and apply logic

	//Swap grids 
})

// Shorthand for $( document ).ready()
$(function() {
    initializeGrid(25);
});

function cellLives(id){
	var width = grid.width;

    var cellsToCheckTest = cellsToCheck(id, width);
	var cellsAlive = cellsToCheckTest.filter(function(checkedId){return grid.booleanArray[checkedId];});

	if (cellsAlive.length == 3 || (cellsAlive.length == 2 && grid.booleanArray[id]))
		return true;
	return false; 
}

function cellsToCheck(id, width)
{
	return [id + 1, id -1, id + width, id + width - 1, id + width + 1, id - width, id - width + 1, id - width - 1];
}