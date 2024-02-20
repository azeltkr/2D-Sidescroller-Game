var buildings;
var trees_x;
var clouds;
var raindrops;
var buildingColors;
var platforms;

function setupScene()
{
    trees_x = [200, 400, 1000, 1450, 1650, 2300];

	clouds = [{pos_x:random(10,width),pos_y:random(20,100),size:random(50,80)},
	{pos_x:random(10,width),pos_y:random(100,150),size:random(50,80)},
	{pos_x:random(10,width),pos_y:random(200,130),size:random(50,80)}];

	buildings = [{pos_x:215,pos_y:floorPos_y-330,height:455,width:265},
	{pos_x:925,pos_y:floorPos_y-280,height:255,width:265},
	{pos_x:1400,pos_y:floorPos_y-310,height:375,width:265}];

	buildingColors = [color(168, 202, 226), color(189,206,169), color(147, 127, 97)];

}

//define the behavior of individual raindrop
class Raindrop 
{
	constructor(x, y) 
	{
		this.x = x;
		this.y = y;
		this.length = 10;
		this.speed = 5;
	}

	fall()
{
	this.y += this.speed;

    if (this.y > height) 
	{
      // Reset raindrop if it reaches ground
      this.y = random(-200, -100);
      this.x = random(0, width);
    }
}

	display()
	{
		stroke(150, 200, 255);
		line(this.x, this.y, this.x, this.y + this.length);
	}
}

function drawRaindrops()
{
    // Display and animate raindrops
    for (var i = 0; i < raindrops.length; i++) 
	{
		raindrops[i].fall();
		raindrops[i].display();
	}
}

function drawClouds()
{
    for(var i=0;i<clouds.length;i++)
	{
		fill(145,159,161);
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
}

function animateClouds()
{
    for(var i=0;i<clouds.length;i++)
	{
		if(clouds[i].pos_x>width)
		
			clouds[i].pos_x = 0;
			clouds[i].pos_x += random(1, 2);
		
	}
}

function drawBuildings()
{
    for(var i=0;i<buildings.length;i++)
	{	

		fill(buildingColors[i % buildingColors.length]);
		rect(buildings[i].pos_x, buildings[i].pos_y, buildings[i].width, buildings[i].pos_y+buildings[i].height/2);
		//nested loop for building windows
        for (var row = 0; row < 4; row++) 
		{ // adjust the number of rows
            for (var col = 0; col < 5; col++) 
			{ 
                fill(216,228,233); // color of the windows
                var windowX = buildings[i].pos_x + 17.5 + col * 50; // adjust the spacing between windows horizontally
                var windowY = buildings[i].pos_y + 20 + row * 50; // adjust the spacing between windows vertically
                rect(windowX, windowY, 30, 30); // adjust the size of the windows
            }
        }
		fill(255,0,0);
		ellipse(buildings[i].pos_x,buildings[i].pos_y,10,10);
	}
}

function drawTrees_x()
{
    for(var i=0;i<trees_x.length;i++)
	{
		noStroke();
		//Brown Tree Trunk
		fill(82, 47, 45); 
		rectMode(CENTER);
		rect(trees_x[i], floorPos_y-41, 40, 82);
		rectMode(CORNER);
		//tree leaves
		fill(19, 71, 77);
		ellipse(trees_x[i]-30, floorPos_y-92, 65, 65);
		ellipse(trees_x[i]+30, floorPos_y-92, 65, 65);
		ellipse(trees_x[i], floorPos_y-132, 65, 65);
		ellipse(trees_x[i], floorPos_y-82, 50, 50);
		//anchor point
		fill(255,0,0);
		ellipse(trees_x[i],floorPos_y-41,10,10);
	}
}

function drawBackgroundBuildings()
{
	//signal
	noStroke();
	fill(250, 249, 246, 50);
	triangle(924, 268, 729, 91, 790, 70);
	fill(224, 246, 238);
	ellipse(760, 82, 72, 52);

	fill(12,37,87);
	noStroke();
	//building 1
	rect(0, 245, 50, height-245);
    rect(22.5, 210, 5, 35);
	rect(50, 270, 9, height-270);
	rect(52, 368, 40, height-368);
	//building 2
	rect(70, 200, 80, height-200);
	rect(72, 193, 60, 20);
	//building 3
	rect(150, 243, 30, height-243);
	rect(155, 180, 90, height-180);
	rect(180, 160, 5, 40);
	rect(223, 130, 5, 60);
	//building 4
	rect(250, 140, 110, height-140);
	rect(235, 217, 30, height-217);
	rect(290, 127, 70, 50);
	//building 5
	rect(366, 199, 90,  height-199);
	rect(349, 307, 40,  height-307);
	rect(449, 282, 30, height-282);
	//building 6
	rect(463, 253, 100, height-253);
	rect(485,  240, 70, 50);
	//building 7
	rect(563, 95, 80, height-95);
	rect(579, 82, 50, 50);
	rect(603, 38, 5, 80);
	//building 8
	rect(648, 148, 120, height-148);
	rect(630, 196, 40, height-196);
	//building 9
	rect(773, 219, 90, height-219);
	rect(752, 278, 40, height-278);
	//building 10
	rect(866, 254, 100, height-254);
	rect(856, 271 , 30, height-271);
	rect(878, 244, 30, 30);
	rect(939, 223, 15, 40);
	rect(942, 190, 5, 40);
	//building 11
	rect(960, 171, 80, height-171);
	rect(978, 155, 50, 50);
}

function drawBatCharAndCar()
{	

	if(batCar.isReached)
	{	
		//exhaust
		fill(128,128,128);
		rect(batCar.pos_x-120, batCar.pos_y, 100,  8);
		triangle(batCar.pos_x-112, batCar.pos_y, batCar.pos_x-105, batCar.pos_y-10, batCar.pos_x-100,batCar.pos_y);
		//draw batMob chasis
		fill(48, 50, 52);
		rect(batCar.pos_x-100, batCar.pos_y-20, 255, 40, 10);
		triangle(batCar.pos_x+150.5, batCar.pos_y-20, batCar.pos_x+170.5, batCar.pos_y-20, batCar.pos_x+150.5, batCar.pos_y+20);
		bezier(batCar.pos_x+40, batCar.pos_y-25, batCar.pos_x+70, batCar.pos_y-35, batCar.pos_x+150.5, batCar.pos_y-35, batCar.pos_x+170.5, batCar.pos_y-20);
		rect(batCar.pos_x-100, batCar.pos_y-24, 265, 5, 10);
		rect(batCar.pos_x+42, batCar.pos_y-25, 25, 7, 10);
		quad(batCar.pos_x-150, batCar.pos_y-25, batCar.pos_x-60, batCar.pos_y-48, batCar.pos_x+20, batCar.pos_y-48, batCar.pos_x+51, batCar.pos_y-20);
		quad(batCar.pos_x-150, batCar.pos_y-25, batCar.pos_x-130, batCar.pos_y-5, batCar.pos_x-82, batCar.pos_y-5, batCar.pos_x-80, batCar.pos_y-25);
		//wheels
		fill(32,32,32);
		ellipse(batCar.pos_x-82, batCar.pos_y+11, 55);
		ellipse(batCar.pos_x+90, batCar.pos_y+11, 55);
		//windows
		fill(192,192,192);
		quad(batCar.pos_x-40, batCar.pos_y-25, batCar.pos_x-40, batCar.pos_y-43, batCar.pos_x+15,batCar.pos_y-43, batCar.pos_x+37, batCar.pos_y-25);
		triangle(batCar.pos_x-40, batCar.pos_y-25, batCar.pos_x-63, batCar.pos_y-35, batCar.pos_x-40, batCar.pos_y-43);
		//exhaust smoke
		noStroke();
		for (var i = 0; i < 10; i++) 
		{
			var alpha = map(i, 0, 10, 50, 0); // Adjust the mapping based on the loop variable
			fill(125, alpha);
			ellipse(batCar.pos_x - 120 - i * 5, batCar.pos_y + 5, 10); // Adjust the x-position for each ellipse
		}
		//car anchor point
		fill(255,0,0);
		ellipse(batCar.pos_x,batCar.pos_y,10,10);
		//animate car to move
		batCar.pos_x += 3;
		if(batCar.pos_x > 3300 && gameOver != true)
		{
			gameOver = true;
		}
	}
	else
	{

		//exhaust
		fill(128,128,128);
		rect(batCar.pos_x-120, batCar.pos_y, 100,  8);
		triangle(batCar.pos_x-112, batCar.pos_y, batCar.pos_x-105, batCar.pos_y-10, batCar.pos_x-100,batCar.pos_y);
		//draw batMob chasis
		fill(48, 50, 52);
		rect(batCar.pos_x-100, batCar.pos_y-20, 255, 40, 10);
		triangle(batCar.pos_x+150.5, batCar.pos_y-20, batCar.pos_x+170.5, batCar.pos_y-20, batCar.pos_x+150.5, batCar.pos_y+20);
		bezier(batCar.pos_x+40, batCar.pos_y-25, batCar.pos_x+70, batCar.pos_y-35, batCar.pos_x+150.5, batCar.pos_y-35, batCar.pos_x+170.5, batCar.pos_y-20);
		rect(batCar.pos_x-100, batCar.pos_y-24, 265, 5, 10);
		rect(batCar.pos_x+42, batCar.pos_y-25, 25, 7, 10);
		quad(batCar.pos_x-150, batCar.pos_y-25, batCar.pos_x-60, batCar.pos_y-48, batCar.pos_x+20, batCar.pos_y-48, batCar.pos_x+51, batCar.pos_y-20);
		quad(batCar.pos_x-150, batCar.pos_y-25, batCar.pos_x-130, batCar.pos_y-5, batCar.pos_x-82, batCar.pos_y-5, batCar.pos_x-80, batCar.pos_y-25);
		//wheels
		fill(32,32,32);
		ellipse(batCar.pos_x-82, batCar.pos_y+11, 55);
		ellipse(batCar.pos_x+90, batCar.pos_y+11, 55);
		//windows
		fill(192,192,192);
		quad(batCar.pos_x-40, batCar.pos_y-25, batCar.pos_x-40, batCar.pos_y-43, batCar.pos_x+15,batCar.pos_y-43, batCar.pos_x+37, batCar.pos_y-25);
		triangle(batCar.pos_x-40, batCar.pos_y-25, batCar.pos_x-63, batCar.pos_y-35, batCar.pos_x-40, batCar.pos_y-43);
		//car anchor point
		fill(255,0,0);
		ellipse(batCar.pos_x,batCar.pos_y,10,10);

		//the game character
		if(onPlatform && isLeft)
		{
			// add your walking left code
			fill(192,192,192);
			ellipse(batChar_x+7,batChar_y-25,30,55); //char body
			ellipse(batChar_x+7,batChar_y-60,20); //char head
			fill(0);
			ellipse(batChar_x-2.5,batChar_y-62,3.2,6.5); //right eye
			ellipse(batChar_x+2,batChar_y-62,3.5,7); //left eye
			fill(255,0,0);
			ellipse(batChar_x,batChar_y,10,10);
		}
		else if(onPlatform && isRight)
		{
			// add your walking right code
			fill(192,192,192);
			ellipse(batChar_x-7,batChar_y-25,30,55); //char body
			ellipse(batChar_x-7,batChar_y-60,20); //char head
			fill(0);
			ellipse(batChar_x-2.5,batChar_y-62,3.5,7); //right eye
			ellipse(batChar_x+2,batChar_y-62,3.2,6.5); //left eye
			fill(255,0,0);
			ellipse(batChar_x,batChar_y,10,10);
		}
		else if(isLeft && isFalling)
		{
			// add your jumping-left code
			fill(192,192,192);
			ellipse(batChar_x+7,batChar_y-40,35,40); //char body
			ellipse(batChar_x+7,batChar_y-68,20); //char head
			fill(0);
			ellipse(batChar_x-2.5,batChar_y-70,3.2,6.5); //right eye
			ellipse(batChar_x+2,batChar_y-70,3.5,7); //left eye
			fill(255,0,0);
			ellipse(batChar_x,batChar_y,10,10);
		}
		else if(isRight && isFalling)
		{
			// add your jumping-right code
			fill(192,192,192);
			ellipse(batChar_x-7,batChar_y-40,35,40); //char body
			ellipse(batChar_x-7,batChar_y-68,20); //char head
			fill(0);
			ellipse(batChar_x-2.5,batChar_y-70,3.5,7); //right eye
			ellipse(batChar_x+2,batChar_y-70,3.2,6.5); //left eye
			fill(255,0,0);
			ellipse(batChar_x,batChar_y,10,10);
		}
		else if(isLeft)
		{
			// add your walking left code
			fill(192,192,192);
			ellipse(batChar_x+7,batChar_y-25,30,55); //char body
			ellipse(batChar_x+7,batChar_y-60,20); //char head
			fill(0);
			ellipse(batChar_x-2.5,batChar_y-62,3.2,6.5); //right eye
			ellipse(batChar_x+2,batChar_y-62,3.5,7); //left eye
			fill(255,0,0);
			ellipse(batChar_x,batChar_y,10,10);
		}
		else if(isRight)
		{
			// add your walking right code
			fill(192,192,192);
			ellipse(batChar_x-7,batChar_y-25,30,55); //char body
			ellipse(batChar_x-7,batChar_y-60,20); //char head
			fill(0);
			ellipse(batChar_x-2.5,batChar_y-62,3.5,7); //right eye
			ellipse(batChar_x+2,batChar_y-62,3.2,6.5); //left eye
			fill(255,0,0);
			ellipse(batChar_x,batChar_y,10,10);
		}
		else if(onPlatform)
		{
			// add your standing front facing code
			fill(192,192,192);
			ellipse(batChar_x,batChar_y-25,35,55); //char body
			ellipse(batChar_x,batChar_y-60,20); //char head
			fill(0);
			ellipse(batChar_x-3,batChar_y-62,3.5,7); //left eye
			ellipse(batChar_x+3,batChar_y-62,3.5,7); //right eye
			fill(255,0,0);
			ellipse(batChar_x,batChar_y,10,10);
		}
		else if(isFalling || isPlummeting)
		{
			// add your jumping facing forwards code
			fill(192,192,192);
			ellipse(batChar_x,batChar_y-40,47,40); //char body
			ellipse(batChar_x,batChar_y-68,20); //char head
			fill(0);
			ellipse(batChar_x-3,batChar_y-70,3.5,7); //right eye
			ellipse(batChar_x+3,batChar_y-70,3.5,7); //lefteye
			fill(255,0,0);
			ellipse(batChar_x,batChar_y,10,10);
			checkIfBatCharDead();
			return;
		}
		else
		{
			// add your standing front facing code
			fill(192,192,192);
			ellipse(batChar_x,batChar_y-25,35,55); //char body
			ellipse(batChar_x,batChar_y-60,20); //char head
			fill(0);
			ellipse(batChar_x-3,batChar_y-62,3.5,7); //left eye
			ellipse(batChar_x+3,batChar_y-62,3.5,7); //right eye
			fill(255,0,0);
			ellipse(batChar_x,batChar_y,10,10);
		}
	}
}



function checkIfBatCharDead()
{
	if(batChar_y > height)
	{
		//decrease life
		batLives--;

		//restart game if there are still lives
		if(batLives > 0)
		{
			init();
		}
		else
		{
			gameOver = true;
		}
	}
}

function drawbatLives()
{
	fill(204,0,0);
	for(var i = 0; i < batLives; i++)
	{
		rect(40*i+10, 40,30,30);
	}
}

function drawGameOver()
{
	fill(0);
	textSize(75);
	text("Game Over", 270, height/2-100);

	if(batLives>0)
	{
		text("You Win!", 300, height/2);
		textSize(50);
		text("Your Score: " + gameScore, 300, height/2+80);
	}
	else
	{
		text("You Lose!", 300, height/2);
		textSize(50);
		text("Your Score: " + gameScore, 300, height/2+80);
	}
}

function Platform(pos_x, pos_y, length, color)
{
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.length = length;
	this.color = color;
    this.draw = function()
    {
		fill(color);
        rect(this.pos_x, this.pos_y, this.length, 20);
    }

    this.checkForContact = function(batChar_x, batChar_y)
    {
        //check x-axis
        if(batChar_x + 20 > this.pos_x && batChar_x< this.pos_x + this.length)
        {
            //check y-axis - bat char is on platform
            var d = this.pos_y - batChar_y;
            if(d>=0 && d<1)
            {
                return true;
            }
        }
        return false;
    }
}

function createPlatform(pos_x, pos_y, length, color)
{
	return new Platform(pos_x, pos_y, length, color);
}

function drawPlatforms()
{
	for(var i = 0; i < platforms.length; i++)
	{
		platforms[i].draw();
	}
}

function checkIfBatCharIsunderAnyPlatforms()
{
	if(isFalling)
	{
		var isInContact = false;
		onPlatform = false;
		for(var i = 0; i < platforms.length; i++)
		{ 
			isInContact = platforms[i].checkForContact(batChar_x, batChar_y);
			if(isInContact)
			{
				onPlatform = true;
				break;
			}
		}

		if(!isInContact)
		{
			batChar_y += 1.3;
		}
	}
}