var mountains;
var trees_x;
var clouds;
var raindrops;

function setupScene()
{
    trees_x = [200, 400, 750];

	clouds = [{pos_x:random(10,width),pos_y:random(20,100),size:random(50,80)},
	{pos_x:random(10,width),pos_y:random(100,200),size:random(50,80)},
	{pos_x:random(10,width),pos_y:random(200,250),size:random(50,80)}];

	mountains = [{pos_x:300,pos_y:floorPos_y-125,height:250,width:150},
	{pos_x:550,pos_y:floorPos_y-75,height:150,width:100},
	{pos_x:425,pos_y:floorPos_y-175,height:350,width:200}];

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

function drawMountains()
{
    for(var i=0;i<mountains.length;i++)
	{
		fill(112, 67, 64);
		triangle(mountains[i].pos_x - mountains[i].width/2, mountains[i].pos_y + mountains[i].height/2, mountains[i].pos_x, mountains[i].pos_y - mountains[i].height/2, mountains[i].pos_x + mountains[i].width/2, mountains[i].pos_y + mountains[i].height/2);
		//anchor point
		fill(255,0,0);
		ellipse(mountains[i].pos_x,mountains[i].pos_y,10,10);
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
		fill(149, 190, 75);
		ellipse(trees_x[i]-30, floorPos_y-92, 65, 65);
		ellipse(trees_x[i]+30, floorPos_y-92, 65, 65);
		ellipse(trees_x[i], floorPos_y-132, 65, 65);
		ellipse(trees_x[i], floorPos_y-82, 50, 50);
		//anchor point
		fill(255,0,0);
		ellipse(trees_x[i],floorPos_y-41,10,10);
	}
}