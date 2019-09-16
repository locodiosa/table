"use strict";

let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
let scale = (clientWidth <= clientHeight) ? clientWidth * 0.9 : clientHeight * 0.9;

let canvas = document.getElementById("canvas");
canvas.width  = scale; 
canvas.height = scale;
let center = scale / 2;

let context = canvas.getContext('2d');

let table = {
	radius: center * 0.9,
	draw: function(context) {
		context.fillStyle = '#888'; 
		context.arc(center, center, this.radius, 0, 2 * Math.PI, true);		
	}
}

let coin = {	
	radius: table.radius * 0.07,	
	draw: function(context, x, y) {
		context.fillStyle = '#008';
		context.arc(x, y, this.radius, 0, 2 * Math.PI, true);		
	}	
};

drowTable(context);

canvas.addEventListener("click", e => {
	let x = e.offsetX;
	let y = e.offsetY;

	if (Math.sqrt(Math.pow(center - y, 2) + Math.pow(center - x, 2)) 
		<= table.radius - coin.radius) {
		drowShade(context, x, y);
	} 
});

canvas.addEventListener("dblclick", e => {
	let x = e.offsetX;
	let y = e.offsetY;	

    if (Math.sqrt(Math.pow(center - y, 2) + Math.pow(center - x, 2)) 
		<= table.radius - coin.radius) {
		drowCoin(context, x, y);
	}
});

function drowTable(context) {	
	context.beginPath();
	table.draw(context);
	context.closePath();
	context.fill();		
}

function drowCoin(context, x, y) {	
	context.beginPath();
	coin.draw(context, x, y);
	context.closePath();
	context.fill();	
}

function drowShade(context, x, y) {	
	context.beginPath();
	coin.draw(context, x, y);
	context.closePath();
	context.stroke();		
}
