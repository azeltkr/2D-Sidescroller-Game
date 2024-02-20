//Note: All the scene objects (e.g. mountain, clouds) are in scene.js.
//Refer to index.html, scene.js is included as part of the project

var batChar_x;
var batChar_y;
var batChar_width;
var floorPos_y;

var batCar;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var collectables;
var canyons;

var raindrops;
var gameScore;
var batLives;
var gameOver;

var platforms;
var onPlatform;

var cameraPosX;
var sound;

function preload()
{	
	soundFormats("mp3", "wav");

	//jump sound: https://freesound.org/people/cabled_mess/sounds/350905/
	jumpSound = loadSound("assets/jump.wav");
	jumpSound.setVolume(0.4);

	//collect sound: https://pixabay.com/sound-effects/search/item%20equip/
	collectSound = loadSound("assets/itemequip.mp3");
	collectSound.setVolume(0.4);

	//falling sound: https://freesound.org/people/deleted_user_3330286/sounds/188565/
	fallingSound = loadSound("assets/fallscream.mp3");
	fallingSound.setVolume(0.15);

	//car sound: https://www.youtube.com/watch?v=ss8Qw_aOjJg
	carSound = loadSound("assets/carstart.mp3");
	carSound.setVolume(0.4);

	//footsteps sound: https://www.fesliyanstudios.com/royalty-free-sound-effects-download/footsteps-on-grass-284
	footstepSound = loadSound("assets/footsteps.mp3");
	footstepSound.setVolume(0.4);
}

function setup()
{
	createCanvas(1024, 576);
	//init lives
	batLives = 3;
	//init gameOver is false
	gameOver = false;
	init();
}
function init()
{
	floorPos_y = height * 3/4;
	batChar_x = width/2;
	batChar_y = floorPos_y;
	batChar_width = 35;

	setupScene(); 

	gameScore = 0;
	raindrops = [];
	platforms = [];

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	onPlatform = false;

	cameraPosX = 0;

	collectables = [{pos_x:100, pos_y:floorPos_y-16, size:40, isFound:false},
		{pos_x:400, pos_y:floorPos_y-185, size:40, isFound:false},
		{pos_x:1100, pos_y:floorPos_y-16, size:40, isFound:false}, 
		{pos_x:1050, pos_y:floorPos_y-300, size:40, isFound:false},
		{pos_x:1450, pos_y:floorPos_y-330, size:40, isFound:false},
		{pos_x:1600, pos_y:floorPos_y-16, size:40, isFound:false},
		{pos_x:2300, pos_y:floorPos_y-185, size:40, isFound:false}];

	canyons = [{pos_x:600, width:300},{pos_x:1200, width:100},{pos_x:1800, width:375}];
	batCar = {pos_x: 2500, pos_y: floorPos_y-40, isReached: false};
	
	// Initialize raindrops
	for (var i = 0; i < 100; i++) 
	{
		raindrops.push(new Raindrop(random(width), random(height)));
	}

	platforms.push(createPlatform(600, floorPos_y-100, 100, color(0)));
	platforms.push(createPlatform(750, floorPos_y-200, 100, color(0)));
	platforms.push(createPlatform(380, floorPos_y-160, 40, color(255, 0, 0, 0)));
	platforms.push(createPlatform(925, floorPos_y-280, 265, color(255, 0, 0, 0)));
	platforms.push(createPlatform(1400, floorPos_y-310, 265, color(255, 0, 0, 0)));
	platforms.push(createPlatform(1900, floorPos_y-100, 230, color(0)));
	platforms.push(createPlatform(2280, floorPos_y-160, 40, color(255, 0, 0, 0)));

}

function draw()
{	
	cameraPosX = batChar_x - width/2;
	///////////DRAWING CODE//////////

	// define the gradient colors
	var color1 = color(12,37,87);  
	var color2 = color(29,65,121);  
	var color3 = color(156,175,201);  

	// set the gradient background
	background(0); // set a default background color
    for (var i = 0; i < height; i++) 
	{
        var inter1 = map(i, 0, height / 2, 0, 1);
        var c1 = lerpColor(color1, color2, inter1);

        var inter2 = map(i, height / 3, height, 0, 1);
        var c2 = lerpColor(color2, color3, inter2);

        // combine the two gradients
        var c = lerpColor(c1, c2, i / height);

        stroke(c);
        line(0, i, width, i);
	}

	//background buildings
	drawBackgroundBuildings();

	//display and animate raindrops
	drawRaindrops();

	//draw some green ground
	noStroke();
	fill(48,107,64);
	rect(0, floorPos_y, width, height - floorPos_y);
	fill(92,70,62);
	rect(0, floorPos_y+20, width, height - floorPos_y+20); 

	noStroke();
	
	if(gameOver)
	{
		drawGameOver();
		//set bat char back to starting point
		batChar_x = width/2;
		batChar_y = floorPos_y;

		//draw bat char
		fill(192,192,192);
		ellipse(batChar_x,batChar_y-25,35,55); //char body
		ellipse(batChar_x,batChar_y-60,20); //char head
		fill(0);
		ellipse(batChar_x-3,batChar_y-62,3.5,7); //left eye
		ellipse(batChar_x+3,batChar_y-62,3.5,7); //right eye
		fill(255,0,0);
		ellipse(batChar_x,batChar_y,10,10);

		return;
	}

	//draw the clouds
	drawClouds();

	//animate clouds
	animateClouds();

    push();
	translate(-cameraPosX, 0);

    //draw the mountains
	drawBuildings();
    
	//draw the trees_x
	drawTrees_x();


	//draw collectable
	for(var i=0;i<collectables.length;i++)
	{
		if(collectables[i].isFound==false)
		{
			fill(103, 246, 237);
			//noStroke();
			beginShape();
			//vertex(444, 432);
			vertex(collectables[i].pos_x-1, collectables[i].pos_y+16);
			//vertex(430, 410);
			vertex(collectables[i].pos_x-15, collectables[i].pos_y-6);
			//vertex(435, 400);
			vertex(collectables[i].pos_x-10, collectables[i].pos_y-16);
			//vertex(455, 400);
			vertex(collectables[i].pos_x+10, collectables[i].pos_y-16);
			//vertex(460, 410);
			vertex(collectables[i].pos_x+15, collectables[i].pos_y-6);
			endShape();
			//anchor point
			fill(255,0,0);
			ellipse(collectables[i].pos_x,collectables[i].pos_y,10,10);
		}
	}

	//draw canyon
	for(var i=0;i<canyons.length;i++)
	{
		fill(12,37,87);
		rect(canyons[i].pos_x, floorPos_y, canyons[i].width, height-floorPos_y);
		//NB. the canyon should go from ground-level to the bottom of the screen
		//anchor point
		fill(255,0,0);
		ellipse(canyons[i].pos_x,floorPos_y,10,10);;
	}

	drawPlatforms();


	//Bat Boy Char and Bat Car
	drawBatCharAndCar();

	pop();


	//check if char is over the canyon
	for(var i=0;i<canyons.length;i++)
	{	
		//check if char is on the ground
		var cond1 = batChar_y >= floorPos_y;
		//check if char is at the left side of canyon
		var cond2 = batChar_x - batChar_width/2 > canyons[i].pos_x;
		//check if char is at the right side of canyon
		var cond3 = batChar_x + batChar_width/2 <  canyons[i].pos_x+canyons[i].width;

		//check if game char is over the canyon
		if(cond1 && cond2 && cond3)
		{
			isPlummeting=true;
		};
	};

	//call checkIfBatCharIsunderAnyPlatforms()
	checkIfBatCharIsunderAnyPlatforms();

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if(isPlummeting)
	{	
		fallingSound.play();
		batChar_y += 15;
		return;
	}

	if(batChar_y<floorPos_y)
	{
		isFalling = true;
	}
	else 
	{
		isFalling = false;
	}

	if(isLeft == true)
	{
		batChar_x -= 3;
	}
	else if(isRight == true)
	{
		batChar_x += 3;
	}

	//check if char has reached bat car
	if(batCar.isReached==false)
	{
		var d = dist(batChar_x, batChar_y, batCar.pos_x, floorPos_y)
		if(d<10)
		{	
			carSound.play();
			batCar.isReached=true;
		}
	}

	//check if char is in range of collectable
	for(var i=0;i<collectables.length;i++)
	{
		if(collectables[i].isFound == false)
		{
			var d = dist(batChar_x,batChar_y,collectables[i].pos_x,collectables[i].pos_y);
			if(d<30)
			{	
				collectSound.play();
				collectables[i].isFound = true;
				//increment the game score
				gameScore+=10;
			};
		}
	}
	
	//draw game score
	fill(255,255,255);
	textSize(30);
	text("Score: " + gameScore, 10, 30);

	//Bat life tokens
	drawbatLives();

	//mouse pointer coordinates
	push();
	fill(255,0,0);
	stroke(255,0,0);
	strokeWeight(1);
	text(mouseX + ","+ mouseY, mouseX,mouseY);
	pop();

}


function keyPressed()
{	
	if(gameOver)
	{
		return;
	}
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if(keyCode == 37)
	{
		console.log("left arrow");
		isLeft = true;
		if(batChar_y==floorPos_y || !onPlatform)
		{
			footstepSound.loop(); 
		}
	}
	else if(keyCode == 39)
	{
		console.log("right arrow")
		isRight = true;
		if(batChar_y==floorPos_y || !onPlatform)
		{
			footstepSound.loop(); 
		} 
	}
	else if(keyCode == 38)
	{
		if(batChar_y>=floorPos_y || onPlatform)
		{	
			footstepSound.stop(); // stops footsteps sound if char jumps
			jumpSound.play();
			console.log("up arrow");
			batChar_y -= 150;
		}
	}
}

function keyReleased()
{
	if(gameOver)
	{
		return;
	}
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	if(keyCode == 37)
	{
		console.log("left arrow");
		isLeft = false;
		if (batChar_y > floorPos_y || !onPlatform) 
		{
			footstepSound.stop(); // stop only if the character is on the ground
		}
	}
	else if(keyCode == 39)
	{
		console.log("right arrow");
		isRight = false;
		if (batChar_y > floorPos_y || !onPlatform) 
		{
			footstepSound.stop(); // stop only if the character is on the ground
		} 
	}
}


