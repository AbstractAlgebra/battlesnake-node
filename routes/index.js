var express = require('express')
var router  = express.Router()
var bodyParser = require('body-parser')

// Handle POST request to '/start'
router.post('//start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    "color": "#48C9B0",
    "secondary_color": "#00FF00",
    "head_url": "http://i68.tinypic.com/1448v7k.png",
    "name": "Metal Gear Snake",
    "taunt": "Colonel, it's me! I'm fighting myself!",
    "head_type": "fang",
    "tail_type": "pixel"
}
  return res.json(data)
})

function TinyQueue(data, compare) {
    if (!(this instanceof TinyQueue)) return new TinyQueue(data, compare);

    this.data = data || [];
    this.length = this.data.length;
    this.compare = compare || defaultCompare;

    if (data) for (var i = Math.floor(this.length / 2); i >= 0; i--) this._down(i);
}

TinyQueue.prototype = {

    push: function (item) {
        this.data.push(item);
        this.length++;
        this._up(this.length - 1);
    },

    pop: function () {
        var top = this.data[0];
        this.data[0] = this.data[this.length - 1];
        this.length--;
        this.data.pop();
        this._down(0);
        return top;
    },

    peek: function () {
        return this.data[0];
    },

    _up: function (pos) {
        var data = this.data,
            compare = this.compare;

        while (pos > 0) {
            var parent = Math.floor((pos - 1) / 2);
            if (compare(data[pos], data[parent]) < 0) {
                swap(data, parent, pos);
                pos = parent;

            } else break;
        }
    },

    _down: function (pos) {
        var data = this.data,
            compare = this.compare,
            len = this.length;

        while (true) {
            var left = 2 * pos + 1,
                right = left + 1,
                min = pos;

            if (left < len && compare(data[left], data[min]) < 0) min = left;
            if (right < len && compare(data[right], data[min]) < 0) min = right;

            if (min === pos) return;

            swap(data, min, pos);
            pos = min;
        }
    }
};

function swap(data, i, j) {
    var tmp = data[i];
    data[i] = data[j];
    data[j] = tmp;
}

// Handle POST request to '/move'
router.post('//move', function (req, res) {
	// NOTE: Do something here to generate your move
	try{
	var input = req.body;
	var gameWidth = input.width;
	var gameHeight = input.height;
	var gameID = input.game_id;
	var snakes = input.snakes;
	var turn = input.turn;
	var foods = input.food;
	var you = input.you; 
	
	const NONE = -1;
	const DOWN = 0;
	const RIGHT = 1;
	const LEFT = 2;
	const UP = 3;
	const offsets = [[0, 1], [1, 0], [-1, 0], [0, -1]];
	const reverseMove = [3, 2, 1, 0];
	
	var visited = new Array(gameWidth);
	var weight = new Array(gameWidth);
	var prev = new Array(gameWidth);
	var plen = new Array(gameWidth);
	var foodAtArr = new Array(gameWidth);
	var snakeWeight = new Array(gameWidth);
	var snakesAt = new Array(gameWidth);
	for (var i = 0; i < gameWidth; ++i)
	{
		visited[i] = new Array(gameHeight);
		weight[i] = new Array(gameHeight);
		prev[i] = new Array(gameHeight);
		plen[i] = new Array(gameHeight);
		foodAtArr[i] = new Array(gameHeight);
		snakeWeight[i] = new Array(gameHeight);
		snakesAt[i] = new Array(gameHeight);
		for (var j = 0; j < gameHeight; ++j)
		{
			visited[i][j] = false;
			weight[i][j] = 9999999999; // arbitrary max weight
			prev[i][j] = NONE;
			plen[i][j] = 0;
			foodAtArr[i][j] = false;
			snakeWeight[i][j] = 0;
			snakesAt[i][j] = 0;
		}
	}
	
	var health;
	var position = new Array();
	var enemySnakeHeads = new Array();
	var dangerousPositions = new Array();
	var headPosition;

	for(var i = 0; i < snakes.length; i++)
	{
		if(snakes[i].id == you)
		{
			health = snakes[i].health_points;
			headPosition = snakes[i].coords[0];
			for(var j = 0; j < snakes[i].coords.length; j++)
			{
				dangerousPositions.push(snakes[i].coords[j]);
				position.push(snakes[i].coords[j]);
				snakesAt[snakes[i].coords[j][0]][snakes[i].coords[j][1]] = snakes[i].coords.length - j;
			}
		}
		else
		{
			enemySnakeHeads.push(snakes[i].coords[0]);
			for(var j = 0; j < snakes[i].coords.length; j++)
			{
				dangerousPositions.push(snakes[i].coords[j]);
				snakesAt[snakes[i].coords[j][0]][snakes[i].coords[j][1]] = snakes[i].coords.length - j;
			}
		}
	}
	
	const hx = headPosition[0];
	const hy = headPosition[1];
	
	for (var i = 0; i < dangerousPositions.length; ++i)
	{
		const dx = dangerousPositions[i][0];
		const dy = dangerousPositions[i][1];
		//visited[dx][dy] = true;
		for (var j = -1; j < 2; ++j)
		{
			for (var k = -1; k < 2; ++k)
			{
				const dpx = dx + j;
				const dpy = dy + k;
				if (dpx >= 0 && dpx < gameWidth && dpy >= 0 && dpy < gameHeight)
				{
					snakeWeight[dpx][dpy] += 1;
				}
			}
		}
	}

	for (var i = 0; i < foods.length; ++i)
	{
		foodAtArr[foods[i][0]][foods[i][1]] = true;
	}
	
	function foodAt(fx, fy)
	{
		return foodAtArr[fx][fy];
	}
	function heurisic(heurx, heury)
	{
		var foodDist = 0;
		for (var i = 0; i < foods.length; ++i)
		{
			foodDist += mdist(heurx, heury, foods[i][0], foods[i][1]);
		}
		return 1 + snakeWeight[heurx][heury] + foodDist * 0.1 / (0.1 + foods.length);
	}
	function mdist(ax, ay, bx, by)
	{
		var xd = ax - by;
		var yd = ay - by;
		if (xd < 0) xd = -xd;
		if (yd < 0) yd = -yd;
		return xd + yd;
	}
	

	var queue = new TinyQueue([], function(a, b) {
		return weight[b[0]][b[1]] - weight[a[0]][a[1]];
	});
	queue.push([hx, hy]);
	weight[hx][hy] = 0;
	var targetX = -1;
	var targetY = -1;
	
	while (queue.length > 0)
	{
		const cur = queue.pop(); // current node to explore
		const cx = cur[0];
		const cy = cur[1];
		const cw = weight[cx][cy];// current weight
		visited[cx][cy] = true;
		// @TODO remove when we don't want to just move to nearest food
		if (targetX == -1 || plen[cx][cy] > plen[targetX][targetY])
		{
			targetX = cx;
			targetY = cy;
		}
		if (foodAt(cx, cy) && (health < 40 || 2 * health < plen[cx][cy]))
		{
			targetX = -1;
			targetY = -1;
			break;
		}
		for (var o = 0; o < 4; ++o)
		{
			// try all offsets (left, right, ec) and if not visited, move to
			const px = offsets[o][0] + cx;
			const py = offsets[o][1] + cy;
			if (px >= 0 && py >= 0 && px < gameWidth && py < gameHeight
			    && !visited[px][py] && snakesAt[px][py] <= plen[cx][cy])
			{
				const pw = cw + heurisic(px, py);
				if (pw < weight[px][py])
				{
					// update weight if we can get there cheaper
					weight[px][py] = pw;
					prev[px][py] = reverseMove[o];
					plen[px][py] = plen[cx][cy] + 1;
					queue.push([px, py]);
				}
			}
		}
	}
	//*
	
	if (targetX == -1)
	{
		// this shouldn't happen???
	}
	else if (prev[tx][ty] != NONE)
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
		
		console.log("This is the value of prev: " + prev[ptx][pty]);
//		const move = reverseMove[prev[ptx][pty]];


		const resp = ['down', 'right', 'left', 'up'];
		var data = {
			move: 'left', // one of: ['up','down','left','right']
			taunt: 'Zoom zoom!', // optional, but encouraged!
		}

		return res.json(data)
	}
	

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
}catch(e){
	console.log(e);
}


	// Response data

})

module.exports = router
