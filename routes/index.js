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

  var finalMove = 'left';

  if (foods[0][0] > headPosition[0])
  {
    rightCount += 2;
    finalMove = 'right';
  }

  if (foods[0][0] < headPosition[0])
  {
    leftCount += 2;
    finalMove = 'left';
  }

  if (foods[0][1] > headPosition[1])
  {
    downCount += 2;
    finalMove = 'down';
  }
  if (foods[0][1] < headPosition[1])
  {
    upCount += 2;
    finalMove = 'up';
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
      rightCount = 0;
    }
 

    if( ((headX - 1) ==  dangerX)  & (headY == dangerY))
    {
      leftCount = 0;
    } 

    if( (headX  ==  dangerX)  & (( headY + 1) == dangerY))
    {
      downCount = 0;
    } 

    if( (headX ==  dangerX)  & ((headY - 1) == dangerY))
    {
      upCount = 0;
    } 

  }

  //handle avoiding walls
  if(headPosition[0] == 0)
  {
    leftCount = 0;
  }

  if(headPosition[0] == gameWidth)
  {
    rightCount = 0;
  }

  if(headPosition[1] == 0)
  {
    upCount = 0;
  }

  if(headPosition[1] == gameHeight)
  {
    downCount = 0;
  }

  //pick safest direction

  if (downCount > leftCount && downCount > rightCount && downCount > upCount)
  {
    finalMove = 'down';
  }

  if (upCount > leftCount && upCount > rightCount && upCount > downCount)
  {
    finalMove = 'up';
  }

  if (leftCount > rightCount && leftCount > downCount && leftCount > upCount)
  {
    finalMove = 'left';
  }

  if (rightCount > leftCount && rightCount > downCount && rightCount > upCount)
  {
    finalMove = 'right';
  }



  var data = {
    move: finalMove, // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  return res.json(data)


  // Response data

})

module.exports = router
