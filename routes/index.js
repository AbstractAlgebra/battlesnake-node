var config  = require('../config.json');
var express = require('express');
var router  = express.Router();

var gameWidth = 0;
var gameHeight = 0;
var gameID = '';
//var board = [];
var foods = [];
var snakes = [];
var turn = 0;
var you = '';

// Handle GET request to '/'
router.get(config.routes.info, function (req, res) {
  // Response data
  var data = {
    color: config.snake.color,
    head_url: config.snake.head_url,
  };

  return res.json(data);
});


//START START START
// Handle POST request to '/start'
router.post(config.routes.start, function (req, res) {
  // Do something here to start the game


  var input = req.body;

  gameWidth = input.width;
  gameHeight = input.height;
  gameID = input.game_id;
  // Response data
  var data = {
    color: config.snake.color,
    head_url: config.snake.head_url,    
    name: 'Bowser',
    taunt: config.snake.taunt.start,

  };

  return res.json(data);
});


//MOVE MOVE MOVE
// Handle POST request to '/move'
router.post(config.routes.move, function (req, res) {
  // Do something here to generate your move
  // Response data
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

//  var fruits = ["Banana", "Orange", "Apple", "Mango"];
  //var k = fruits.length;

  //build my snake, and track enemy snakes
 
var i;
var j = snakes.length;
//document.write(j);
/*
 for(i = 0; i < snakes.length; i++)
  {
    if (snakes[i].id == you)
    {
      health = snakes[i].health_points;
      for(j = 0; j < snakes[i].coords.length; j++)
      {
        position.push(snakes[i].coords[j]);
      }
    }
    else
    {
      enemySnakeHeads.push(snakes[i]coords[0]);
      for(j = 0; j < snakes[i].coords.length; j++)
      {
        dangerousPositions.push(snakes[i].coords[j]);
      }
    }
*/
//  var headPosition =



  var data = {
    move: 'north', // one of: ["north", "east", "south", "west"]
    taunt: config.snake.taunt.move
  };

  return res.json(data);
});

// Handle POST request to '/end'
router.post(config.routes.end, function (req, res) {
  // Do something here to end your snake's session

  // We don't need a response so just send back a 200
  res.status(200);
  res.end();
  return;
});


module.exports = router;
