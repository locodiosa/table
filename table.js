"use strict";

let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
let scale = (clientWidth <= clientHeight) ? clientWidth * 0.9 : clientHeight * 0.9;

let canvas = document.getElementById("canvas");
canvas.width  = scale; 
canvas.height = scale;

let context = canvas.getContext('2d');

let table = {
	radius: scale / 2 * 0.9,
	draw: function(context) {
		context.fillStyle = '#888'; 
		context.arc(scale / 2, scale / 2, this.radius, 0, 2 * Math.PI, true);		
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

canvas.addEventListener("mouseover", e => {
	let x = e.offsetX;
	let y = e.offsetY;	    
    drowShade(context, x, y);
});

canvas.addEventListener("click", e => {
	console.log(e.offsetX + ", " + e.offsetY);
	let x = e.offsetX;
	let y = e.offsetY;	    
    drowCoin(context, x, y);
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
