"use strict";

let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
let scale = (clientWidth <= clientHeight) ? clientWidth * 0.9 : clientHeight * 0.9;

let canvas = document.getElementById("canvas");
canvas.width  = scale; 
canvas.height = scale;
let center = scale / 2;

let context = canvas.getContext('2d');
let times = 0;

let table = {
	radius: center * 0.9,
	draw: function(context) {
		context.fillStyle = '#888'; 
		context.arc(center, center, this.radius, 0, 2 * Math.PI, true);		
	}
}

let coin = {	
	radius: table.radius * 0.1,	
	draw: function(context, x, y, color) {
		context.fillStyle = color;
		context.arc(x, y, this.radius, 0, 2 * Math.PI, true);		
	}	
};

let allCoints = [];

drowTable(context);

canvas.addEventListener("click", e => {
	let x = e.offsetX;
	let y = e.offsetY;

    if (getTableArea(x, y) && (allCoints.length == 0 || checkNeighbours(x, y))) {
    	++times;
    	drowCoin(context, x, y, chooseColor(times));
    	allCoints.push([x, y]);
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

function drowTable(context) {	
	context.beginPath();
	table.draw(context);
	context.closePath();
	context.fill();		
}

function drowCoin(context, x, y, color) {	
	context.beginPath();
	coin.draw(context, x, y, color);
	context.closePath();
	context.fill();	
}

function drowShade(context, x, y) {	
	context.beginPath();
	coin.draw(context, x, y);
	context.closePath();
	context.stroke();		
}
