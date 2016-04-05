var grid = 
{
  height: 0,
  width: 0,
  viewElement: $("#grid"),
  booleanArray: []
}


var gridBooleanArray  
function initializeGrid(count)
{
	initializeModelGrid(count);
	initializeScreenGrid(count);
}
function initializeModelGrid(count)
	{
		grid.height = count;
		grid.width = count; 
		grid.booleanArray = createArray(count, count);
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
	var width = grid.width;
	var x = (id % width) - 1;
	var y = id / width;
	if (grid.booleanArray[x, y])
		grid.booleanArray[x,y] = false;
	else 
		grid.booleanArray[x,y]= true; 
	console.log("Alive" + grid.booleanArray[x, y]);

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
	initializeGrid($(this).val());
	
})

// Shorthand for $( document ).ready()
$(function() {
    initializeGrid(25);
});

