var express = require('express')
var router  = express.Router()

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


  gameWidth = input.width;
  gameHeight = input.height;
  gameID = input.game_id;
  snakes = input.snakes;
  turn = input.turn;
  foods = input.food;
  you = input.you; 
  var health;
  var position;

  var enemySnakeHeads;
  var dangerousPositions;
  var headPosition;



//build my snake, and track enemy snakes 
var i;
var j;

 for(i = 0; i < snakes.length; i++)
 {
    if (snakes[i].id == you)
    {
      health = snakes[i].health_points;
      headPosition = snakes[i].coords[0];
      for(j = 0; j < snakes[i].coords.length; j++)
      {
        position.push(snakes[i].coords[j]);
      }
    }/*
    else
    {
      enemySnakeHeads.push(snakes[i].coords[0]);
      for(j = 0; j < snakes[i].coords.length; j++)
      {
        dangerousPositions.push(snakes[i].coords[j]);
      }
    }*/
  }

  var finalMove = 'left';
/*
  if (foods[0][0] > headPosition[0])
  {
    finalMove = 'right';
  }

  if (foods[0][0] < headPosition[0])
  {
    finalMove = 'left';
  }

  if (foods[0][1] < headPosition[1])
  {
    finalMove = 'down';
  }
  if (foods[0][1] > headPosition[1])
  {
    finalMove = 'up';
  }
*/

  // Response data
  var data = {
    move: finalMove, // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  return res.json(data)
})

module.exports = router
