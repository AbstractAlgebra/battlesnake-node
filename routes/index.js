var express = require('express')
var router  = express.Router()
var bodyParser = require('body-parser')

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: '#48C9B0',
    secondary_color: '#00FF00',
    head_url: 'http://tinypic.com/r/1gqij7/9',
    name: 'Metal Gear Snake',
    taunt: 'Colonel, it's me! I'm fighting myself!',
    head_type: 'fang',
    tail_type: 'pixel'
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
			}
		}
		else
		{
			enemySnakeHeads.push(snakes[i].coords[0]);
			for(var j = 0; j < snakes[i].coords.length; j++)
			{
				dangerousPositions.push(snakes[i].coords[j]);
			}
		}
	}
	

	var leftCount = 0;
	var rightCount = 0;
	var upCount = 0;  
	var downCount = 0;


	//only seek out food if hungry
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


	// Response data

})

module.exports = router
