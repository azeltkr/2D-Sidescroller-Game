//Note: All the scene objects (e.g. mountain, clouds) are in scene.js.
//Refer to index.html, scene.js is included as part of the project

var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var mountains;
var trees_x;
var clouds;
var collectables;
var canyons;

var cameraPosX;
function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	gameChar_width = 35;


	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	cameraPosX = 0;
	/** 
	trees_x = [{pos_x:width/5,pos_y:floorPos_y-41},
	{pos_x:width/4,pos_y:floorPos_y-41},
	{pos_x:width/3,pos_y:floorPos_y-41}]; */

	trees_x = [200, 400, 750];

	clouds = [{pos_x:random(10,width),pos_y:random(20,100),size:random(50,80)},
	{pos_x:random(10,width),pos_y:random(100,200),size:random(50,80)},
	{pos_x:random(10,width),pos_y:random(200,250),size:random(50,80)}];

	mountains = [{pos_x:300,pos_y:floorPos_y-125,height:250,width:150},
	{pos_x:550,pos_y:floorPos_y-75,height:150,width:100},
	{pos_x:425,pos_y:floorPos_y-175,height:350,width:200}];

	collectables = [{x_pos:100, y_pos:floorPos_y-16, size:40, isFound:false},
		{x_pos:200, y_pos:floorPos_y-16, size:40, isFound:false},
		{x_pos:1000, y_pos:floorPos_y-16, size:40, isFound:false}];

	canyons = [{x_pos:600, width:100},{x_pos:800, width:100}];

}

function draw()
{
	cameraPosX = gameChar_x - width/2;
	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue
    
	//draw some green ground
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); 

    push();
	translate(-cameraPosX, 0);
    //draw the clouds
	for(var i=0;i<clouds.length;i++)
	{
		fill(255);
		ellipse(clouds[i].pos_x,clouds[i].pos_y, 30, 30);
		ellipse(clouds[i].pos_x-20,clouds[i].pos_y-30, 25, 25);
		ellipse(clouds[i].pos_x+10,clouds[i].pos_y-25, 50, 50);
		ellipse(clouds[i].pos_x-20,clouds[i].pos_y+10, 70, 70);    
		ellipse(clouds[i].pos_x+30, clouds[i].pos_y+10, 55, 55);
		ellipse(clouds[i].pos_x+57,clouds[i].pos_y+20, 28, 28);
		ellipse(clouds[i].pos_x-57,clouds[i].pos_y+25, 32, 32);    
		//anchor point
		fill(255,0,0);
		ellipse(clouds[i].pos_x,clouds[i].pos_y,10,10);
	}

	//animate clouds
	for(var i=0;i<clouds.length;i++)
	{
		if(clouds[i].pos_x>width)
		
			clouds[i].pos_x = 0;
			clouds[i].pos_x += random(1, 2);
		
	}
    
    //draw the mountains
	for(var i=0;i<mountains.length;i++)
	{
		fill(112, 67, 64);
		triangle(mountains[i].pos_x - mountains[i].width/2, mountains[i].pos_y + mountains[i].height/2, mountains[i].pos_x, mountains[i].pos_y - mountains[i].height/2, mountains[i].pos_x + mountains[i].width/2, mountains[i].pos_y + mountains[i].height/2);
		//anchor point
		fill(255,0,0);
		ellipse(mountains[i].pos_x,mountains[i].pos_y,10,10);
	}
    
    //draw the trees_x
	for(var i=0;i<trees_x.length;i++)
	{
		noStroke();
		//Brown Tree Trunk
		fill(82, 47, 45); 
		rectMode(CENTER);
		rect(trees_x[i], floorPos_y-41, 40, 82);
		rectMode(CORNER);
		//tree leaves
		fill(149, 190, 75);
		ellipse(trees_x[i]-30, floorPos_y-92, 65, 65);
		ellipse(trees_x[i]+30, floorPos_y-92, 65, 65);
		ellipse(trees_x[i], floorPos_y-132, 65, 65);
		ellipse(trees_x[i], floorPos_y-82, 50, 50);
		//anchor point
		fill(255,0,0);
		ellipse(trees_x[i],floorPos_y-41,10,10);
	}

	//draw collectable
	for(var i=0;i<collectables.length;i++)
	{
		if(collectables[i].isFound==false)
		{
			fill(103, 246, 237);
			//noStroke();
			beginShape();
			//vertex(444, 432);
			vertex(collectables[i].x_pos-1, collectables[i].y_pos+16);
			//vertex(430, 410);
			vertex(collectables[i].x_pos-15, collectables[i].y_pos-6);
			//vertex(435, 400);
			vertex(collectables[i].x_pos-10, collectables[i].y_pos-16);
			//vertex(455, 400);
			vertex(collectables[i].x_pos+10, collectables[i].y_pos-16);
			//vertex(460, 410);
			vertex(collectables[i].x_pos+15, collectables[i].y_pos-6);
			endShape();
			//anchor point
			fill(255,0,0);
			ellipse(collectables[i].x_pos,collectables[i].y_pos,10,10);
		}
	}

	//draw canyon
	for(var i=0;i<canyons.length;i++)
	{
		fill(0,0,0);
		rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height-floorPos_y);
		//NB. the canyon should go from ground-level to the bottom of the screen
		//anchor point
		fill(255,0,0);
		ellipse(canyons[i].x_pos,floorPos_y,10,10);;
	}

	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
	    fill(192,192,192);
    	ellipse(gameChar_x+7,gameChar_y-40,35,40); //char body
    	ellipse(gameChar_x+7,gameChar_y-68,20); //char head
    	fill(0);
    	ellipse(gameChar_x-2.5,gameChar_y-70,3.2,6.5); //right eye
    	ellipse(gameChar_x+2,gameChar_y-70,3.5,7); //left eye
		fill(255,0,0);
		ellipse(gameChar_x,gameChar_y,10,10);
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
	    fill(192,192,192);
    	ellipse(gameChar_x-7,gameChar_y-40,35,40); //char body
    	ellipse(gameChar_x-7,gameChar_y-68,20); //char head
    	fill(0);
    	ellipse(gameChar_x-2.5,gameChar_y-70,3.5,7); //right eye
    	ellipse(gameChar_x+2,gameChar_y-70,3.2,6.5); //left eye
		fill(255,0,0);
		ellipse(gameChar_x,gameChar_y,10,10);
	}
	else if(isLeft)
	{
		// add your walking left code
		fill(192,192,192);
		ellipse(gameChar_x+7,gameChar_y-25,30,55); //char body
		ellipse(gameChar_x+7,gameChar_y-60,20); //char head
		fill(0);
		ellipse(gameChar_x-2.5,gameChar_y-62,3.2,6.5); //right eye
		ellipse(gameChar_x+2,gameChar_y-62,3.5,7); //left eye
		fill(255,0,0);
		ellipse(gameChar_x,gameChar_y,10,10);
	}
	else if(isRight)
	{
		// add your walking right code
		fill(192,192,192);
		ellipse(gameChar_x-7,gameChar_y-25,30,55); //char body
		ellipse(gameChar_x-7,gameChar_y-60,20); //char head
		fill(0);
		ellipse(gameChar_x-2.5,gameChar_y-62,3.5,7); //right eye
		ellipse(gameChar_x+2,gameChar_y-62,3.2,6.5); //left eye
		fill(255,0,0);
		ellipse(gameChar_x,gameChar_y,10,10);
	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		fill(192,192,192);
		ellipse(gameChar_x,gameChar_y-40,47,40); //char body
		ellipse(gameChar_x,gameChar_y-68,20); //char head
		fill(0);
		ellipse(gameChar_x-3,gameChar_y-70,3.5,7); //right eye
		ellipse(gameChar_x+3,gameChar_y-70,3.5,7); //lefteye
		fill(255,0,0);
		ellipse(gameChar_x,gameChar_y,10,10);
	}
	else
	{
		// add your standing front facing code
		fill(192,192,192);
		ellipse(gameChar_x,gameChar_y-25,35,55); //char body
		ellipse(gameChar_x,gameChar_y-60,20); //char head
		fill(0);
		ellipse(gameChar_x-3,gameChar_y-62,3.5,7); //left eye
		ellipse(gameChar_x+3,gameChar_y-62,3.5,7); //right eye
		fill(255,0,0);
		ellipse(gameChar_x,gameChar_y,10,10);
	}
    
	pop();


	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if(isPlummeting)
	{
		gameChar_y += 10;
		return;
	}

	if(gameChar_y<floorPos_y)
	{
		gameChar_y += 1;
		isFalling = true;
	}
	else 
	{
		isFalling = false;
	}

	if(isLeft == true)
	{
		gameChar_x -= 5;
	}
	else if(isRight == true)
	{
		gameChar_x += 5;
	}

	//check if char is in range of collectable
	for(var i=0;i<collectables.length;i++)
	{
		var d = dist(gameChar_x,gameChar_y,collectables[i].x_pos,collectables[i].y_pos);
		if(d<30)
		{
			collectables[i].isFound = true;
		};
	}

	//check if char is over the canyon
	for(var i=0;i<canyons.length;i++)
	{
		//check if char is on the ground
		var cond1 = gameChar_y == floorPos_y;
		//check if char is at the left side of canyon
		var cond2 = gameChar_x - gameChar_width/2>(canyons[i].x_pos);
		//check if char is at the right side of canyon
		var cond3 = gameChar_x + gameChar_width/2<(canyons[i].x_pos+canyons[i].width);

		//check if game char is over the canyon
		if(cond1 && cond2 && cond3)
		{
			isPlummeting=true;
		};
	};
}


function keyPressed()
{	
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if(keyCode == 37)
	{
		console.log("left arrow");
		isLeft = true;
	}
	else if(keyCode == 39)
	{
		console.log("right arrow")
		isRight = true;
	}
	else if(keyCode == 38)
	{
		if(gameChar_y>=floorPos_y)
		{
			console.log("up arrow");
			gameChar_y -= 50;
		}
	}
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	if(keyCode == 37)
	{
		console.log("left arrow");
		isLeft = false;
	}
	else if(keyCode == 39)
	{
		console.log("right arrow");
		isRight = false;
	}
}
//palworld

