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

var leftCount = 0;
var rightCount = 0;
var upCount = 0;  
var downCount = 0;


//only seek out food if hungry
  if(healh <= 50)
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
    rightCount += randomIntInc(1,2);
    leftCount += randomIntInc(1,2);
    downCount += randomIntInc(1,2);
    upCount += randomIntInc(1,2);
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
