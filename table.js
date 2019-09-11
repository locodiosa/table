"use strict";

let mainloop = function() {
	draw();
}

let FRAME_RATE_HZ = 50;

setInterval(mainloop, 1000 / FRAME_RATE_HZ);

function draw() {
	let canvas  = document.getElementById("canvas");
	canvas.width  = 600; 
	canvas.height = 600; 
	canvas.radius  = 200;
		
	let context = canvas.getContext('2d');
	context.fillStyle = '#000'; 
	context.arc(250, 250, canvas.radius, 0, 2 * Math.PI, true);		
	context.fill();	
}

