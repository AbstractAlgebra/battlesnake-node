var express = require('express')
var router  = express.Router()
var bodyParser = require('body-parser')

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "#008080",
    name: "Bowser",
    head_url: "http://bsnek.herokuapp.com/", // optional, but encouraged!
    taunt: "Let's do thisss thang!", // optional, but encouraged!
  }

  return res.json(data)
})



// Handle POST request to '/move'
router.post('//move', function (req, res) {
	// NOTE: Do something here to generate your move
	/*
	var input = req.body;
	var gameWidth = input.width;
	var gameHeight = input.height;
	var gameID = input.game_id;
	var snakes = input.snakes;
	var turn = input.turn;
	var foods = input.food;
	var you = input.you; 
	var health;
	var position = new Array();

	var enemySnakeHeads = new Array();
	var dangerousPositions = new Array();
	var headPosition;



	//build my snake, and track enemy snakes 
	var i;
	var j;
	//var k = snakes.length;
	var k = snakes.length;

	// {

	for(i = 0; i < snakes.length; i++)
	{
		if(snakes[i].id == you)
		{
			health = snakes[i].health_points;
			headPosition = snakes[i].coords[0];
			for(j = 0; j < snakes[i].coords.length; j++)
			{
				dangerousPositions.push(snakes[i].coords[j]);
				position.push(snakes[i].coords[j]);
			}
		}
		else
		{
			enemySnakeHeads.push(snakes[i].coords[0]);
			for(j = 0; j < snakes[i].coords.length; j++)
			{
				dangerousPositions.push(snakes[i].coords[j]);
			}
		}
	}
	// }
	/*
	
	var hx = headPosition[0];
	var hy = headPosition[1];
	var NONE = -1;
	var DOWN = 0;
	var RIGHT = 1;
	var LEFT = 2;
	var UP = 3;
	var offsets = [[0, 1], [1, 0], [-1, 0], [0, -1]];
	var reverseMove = [3, 2, 1, 0];
	
	var queue = new PriorityQueue({
		comparator: function(a, b) {
			return weight[b[0],b[1]] - weight[a[0],a[1]];
		}
	});
	var visited = new Array(gameWidth);
	var weight = new Array(gameWidth);
	var prev = new Array(gameWidth);
	var plen = new Array(gameWidth);
	var foodAtArr = new Array(gameWidth);
	for (var i = 0; i < gameWidth; ++i)
	{
		visited[i] = new Array(gameHeight);
		weight[i] = new Array(gameHeight);
		prev[i] = new Array(gameHeight);
		plen[i] = new Array(gameHeight);
		foodAtArr[i] = new Array(gameHeight);
		for (j = 0; j < gameHeight; ++j)
		{
			visited[i][j] = false;
			weight[i][j] = 9999999999; // arbitrary max weight
			prev[i][j] = NONE;
			plen[i][j] = 0;
			foodAtArr[i][j] = false;
		}
	}
	/*for (var i = 0; i < dangerousPositions.length; ++i)
	{
		visited[dangerousPositions[i][0], dangerousPositions[i][1]] = true;
	}
	for (var i = 0; i < foods.length; ++i)
	{
		foodAt[foods[i][0]][foods[i][1]] = true;
	}
	var foodAt = function(fx, fy)
	{
		return foodAtArr[fx][fy];
	}
	// @TODO: keep track of distance to closest food
	//        maybe if hp < 40 || hp < dist * 2, go for it?
	queue.queue([hx, hy]);
	weight[hx][hy] = 0;
	var targetX = -1;
	var targetY = -1;
	while (queue.length() > 0)
	{
		var cur = queue.dequeue(); // current node to explore
		var cx = cur[0];
		var cy = cur[1];
		var cw = weight[cx][cy];// current weight
		visited[cx][cy] = true;
		// @TODO remove when we don't want to just move to nearest food
		if (targetX == -1 || plen[cx][cy] > plen[targetX][targetY])
		{
			targetX = cx;
			targetY = cy;
		}
		if (foodAt(cx, cy))
		{
			targetX = -1;
			targetY = -1;
			break;
		}
		for (var o = 0; o < 4; ++o)
		{
			// try all offsets (left, right, ec) and if not visited, move to
			var px = o[0] + cx;
			var py = o[1] + cy;
			if (!visited[px][py] && px >= 0 && py >= 0 && px < gameWidth && py < gameHeight)
			{
				var pw = cw + 1; // @TODO: add in a weight heuristic
				if (pw < weight[px][py])
				{
					// update weight if we can get there cheaper
					weight[px][py] = pw;
					prev[px][py] = reverseMove[o];
					queue.queue([px, py]);
				}
			}
		}
	}
	
	if (targetX == -1)
	{
		// this shouldn't happen???
	}
	else
	{
		var tx = targetX;
		var ty = targetY;
		var ptx = tx;
		var pty = ty;
		while (prev[tx][ty] != NONE)
		{
			ptx = tx;
			pty = ty;
			tx = offsets[prev[tx][ty]][0];
			ty = offsets[prev[tx][ty]][1];
		}
		var move = reverseMove[prev[ptx][pty]];
		var resp = ['down', 'right', 'left', 'up'];
		var data = {
			move: resp[move], // one of: ['up','down','left','right']
			taunt: 'Zoom zoom!', // optional, but encouraged!
		}

		return res.json(data)
	}*/

	 var backupPlan = {
	 	move: left, // one of: ['up','down','left','right']
	 	taunt: 'Zoom zoom!', // optional, but encouraged!
	 }

	 return res.json(backupPlan)

})

	/*
		var data = {
			move: 'left', // one of: ['up','down','left','right']
			taunt: 'Zoom zoom!' // optional, but encouraged!
		}

	return res.json(data);


	var leftCount = 0;
	var rightCount = 0;
	var upCount = 0;  
	var downCount = 0;


	//only seek out food if hungry
	if( health < 50)
	{
		if (foods[0][0] > headPosition[0])
		{
			rightCount += 2;
		} else 
		{
			rightCount += 1;
		}

		if (foods[0][0] < headPosition[0])
		{
			leftCount += 2;
		}
		else
		{
			leftCount += 1;
		}

		if (foods[0][1] > headPosition[1])
		{
			downCount += 2;
		}
		else 
		{
			downCount += 1;
		}
		if (foods[0][1] < headPosition[1])
		{
			upCount += 2;
		} else
		{
			upCount += 1;
		}
	}
	else
	{
		var low = 1;
		var high = 4;
		rightCount += (Math.floor(Math.random() * (high - low + 1) + low));
		leftCount += (Math.floor(Math.random() * (high - low + 1) + low));
		downCount += (Math.floor(Math.random() * (high - low + 1) + low));
		upCount += Math.floor(Math.random() * (high - low + 1) + low);
	}


	//avoid deadly positions

	for(i = 0; i < dangerousPositions.length; i++)
	{

		var headX = headPosition[0];
		var headY = headPosition[1];

		var dangerX = dangerousPositions[i][0];
		var dangerY = dangerousPositions[i][1];
		//if one right is dangerous

		if( ((headX + 1) ==  dangerX)  & (headY == dangerY))
		{
			rightCount = -1;
		}


		if( ((headX - 1) ==  dangerX)  & (headY == dangerY))
		{
			leftCount = -1;
		} 

		if( (headX  ==  dangerX)  & (( headY + 1) == dangerY))
		{
			downCount = -1;
		} 

		if( (headX ==  dangerX)  & ((headY - 1) == dangerY))
		{
			upCount = -1;
		} 

	}

	//handle avoiding walls
	if(headPosition[0] == 0)
	{
		leftCount = -1;
	}

	if(headPosition[0] == gameWidth-1)
	{
		rightCount = -1;
	}

	if(headPosition[1] == 0)
	{
		upCount = -1;
	}

	if(headPosition[1] == gameHeight-1)
	{
		downCount = -1;
	}

	//default to left
	var finalMove = 'left';

	//pick safest direction

	if (downCount >= leftCount && downCount >= rightCount && downCount >= upCount && downCount != -1)
	{
		finalMove = 'down';
	}

	if (upCount >= leftCount && upCount >= rightCount && upCount >= downCount && upCount != -1)
	{
		finalMove = 'up';
	}

	if (leftCount >= rightCount && leftCount >= downCount && leftCount >= upCount && leftCount != 1)
	{ 
		finalMove = 'left';
	}

	if (rightCount >= leftCount && rightCount >= downCount && rightCount >= upCount && rightCount != 1)
	{
		finalMove = 'right';
	}

	//handle when only one direction is safe
	if (rightCount == -1 && leftCount == -1 && upCount == -1)
	{
		finalMove = 'down';
	}

	if (rightCount == -1 && leftCount == -1 && downCount == -1)
	{
		finalMove = 'up';
	}

	if (downCount == -1 && leftCount == -1 && upCount == -1)
	{
		finalMove = 'right';
	}

	if (rightCount == -1 && downCount == -1 && upCount == -1)
	{
		finalMove = 'left';
	}


	var data = {
		move: finalMove, // one of: ['up','down','left','right']
		taunt: 'Zoom zoom!', // optional, but encouraged!
	}

	return res.json(data)


	// Response data*/
	//})


module.exports = router
