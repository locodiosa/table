"use strict";

let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
let scale = (clientWidth <= clientHeight) ? clientWidth * 0.9 : clientHeight * 0.9;

let canvas = document.getElementById("canvas");
canvas.width  = scale; 
canvas.height = scale;
let center = scale / 2;

let context = canvas.getContext("2d");
let times = 0;
let shade = 0;

let table = {
	radius: center * 0.9,
	draw: function(context) {
		context.fillStyle = "#888"; 
		context.arc(center, center, this.radius, 0, 2 * Math.PI, true);		
	}
}

let coin = {	
	radius: table.radius * 0.1,	
	draw: function(context, x, y, color, deltaR) {
		context.fillStyle = color;
		context.strokeStyle = color;
		context.arc(x, y, this.radius + (deltaR || 0), 0, 2 * Math.PI, true);		
	}	
};

let allCoints = [];

drawTable(context);

canvas.addEventListener("click", e => {
	let x = e.offsetX;
	let y = e.offsetY;

    if (getTableArea(x, y) && (allCoints.length == 0 || checkNeighbours(x, y))) {
    	++times;
    	shade = 0;
    	drawCoin(context, x, y, chooseColor(times));
    	allCoints.push([x, y]);
	}
});

let oldX = null;
let oldY = null;

canvas.addEventListener("mousemove", e => {
	let x = e.offsetX;
	let y = e.offsetY;

	if (shade == 1) {
		drawShade(context, oldX, oldY, false);
		shade = 0;
	}

    if (getTableArea(x, y) && (allCoints.length == 0 || checkNeighbours(x, y))) {
    	drawShade(context, x, y, true);
    	shade = 1;
    	oldX = x;
    	oldY = y;    		
    }    	
});

function checkNeighbours(x, y) {
	let neighbours = allCoints.filter(c => Math.sqrt(Math.pow(c[1] - y, 2) + Math.pow(c[0] - x, 2)) 
			< coin.radius * 2);

	return (neighbours.length > 0) ? false : true;
}

function getTableArea(x, y) {
	return (Math.sqrt(Math.pow(center - y, 2) + Math.pow(center - x, 2)) 
			<= table.radius - coin.radius) ? true : false;
}

function chooseColor(times) {
	return (times % 2 == 0) ? "#008" : "#800";
}

function drawTable(context) {	
	context.beginPath();
	table.draw(context);
	context.closePath();
	context.fill();		
}

function drawCoin(context, x, y, color) {	
	context.beginPath();
	coin.draw(context, x, y, color);
	context.closePath();
	context.fill();	
}

function drawShade(context, x, y, show) {	
	context.beginPath();
	coin.draw(context, x, y, show ? "#000" : "#888", show ? -2 : 0);
	context.closePath();
	
	if (show) {
		context.stroke();
	} else {
		context.fill();
	}
}
