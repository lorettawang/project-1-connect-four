/*----- constants -----*/


/*----- app's state (variables) -----*/
var players = [
{
    name: 'lisa'
},
{
    name: 'bart'
}
];

/*----- cached element references -----*/
var board = document.querySelector('.board');

var count = 0;
var spaces = 42;
var currentPlayer = players[1];
var button = document.querySelector('button');

/*----- event listeners -----*/
board.addEventListener('click', handleClick);

button.addEventListener('click', newGame);

/*----- functions -----*/
var playerTurn = function() {
  var lisa = document.querySelector('.lisa');
  var bart = document.querySelector('.bart');
  if (currentPlayer.name === 'lisa') {
    currentPlayer = players[1];
    var h3 = document.querySelector('h3');
    h3.innerHTML = "It's Bart's turn!";
    } else {
    currentPlayer = players[0];
    var h3 = document.querySelector('h3');
    h3.innerHTML = "It's Lisa's turn!";
  }
};

var renderBoard = function() {
  var html = '';
  for (var i = 0; i < 6; i++) {
    html += '<div class="row">';
    for (var j = 0; j < 7; j++) {
      html += '<div class="token open" data-row="' + i + '" data-col="' + j + '">' + '</div>';
    }
    html += '</div>';
  }
  board.innerHTML = html;
};

var handleClick = function(event) {
  if (event.target.classList.contains('open')) {
    var row = event.target.dataset.row;
    var col = event.target.dataset.col;
    row = parseInt(row);
    col = parseInt(col);
    checkSquares(row, col);
    scanBoard();
    if (count > 3) return;
    else playerTurn();
  }
};

var checkSquares = function(row, col) {
  var aToken = document.querySelectorAll('.token[data-row="' + row + '"]' );
  var aOneBelow = document.querySelectorAll('.token[data-row="' + (row + 1) + '"]' );
  if (aToken[col].classList.contains('open') && !aOneBelow[col]) {
    if (currentPlayer.name === 'lisa') {
      aToken[col].classList.remove('open');
      aToken[col].classList.add('lisa');
    } else {
      aToken[col].classList.remove('open');
      aToken[col].classList.add('bart');
    }
    return;
  } else if (aToken[col].classList.contains('open') && aOneBelow[col].classList.contains('open') ) {
    return checkSquares(row + 1, col);
  } else {
    if (currentPlayer.name === 'lisa') {
      aToken[col].classList.remove('open');
      aToken[col].classList.add('lisa');
  } else {
    aToken[col].classList.remove('open');
    aToken[col].classList.add('bart');
  }
    return;
  }
};

var checkVerticalB = function(row, col) {
  var token = document.querySelectorAll('.token');
  var i = (row*7 + col);
    if (count > 3) {
    return gameWinner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (token[i] && token[i].classList.contains('bart')) {
    count = count + 1;
    return checkVerticalB(row - 1, col);
  } else
    count = 0;
    return;
};

var checkVerticalA = function(row, col) {
  var token = document.querySelectorAll('.token');
  var i = (row*7 + col);
    if (count > 3) {
    return gameWinner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (token[i] && token[i].classList.contains('lisa')) {
    count = count + 1;
    return checkVerticalA(row - 1, col);
  } else
    count = 0;
    return;
};

var checkRHorizontalB = function(row, col) {
  var token = document.querySelectorAll('.token');
  var i = (row*7 + col);
    if (count > 3) {
    return gameWinner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (token[i] && token[i].classList.contains('bart')) {
    count = count + 1;
    return checkRHorizontalB(row, col + 1);
  } else
    count = 0;
    return;
};

var checkLHorizontalB = function(row, col) {
  var token = document.querySelectorAll('.token');
  var i = (row*7 + col);
    if (count > 3) {
    return gameWinner();
  } else if (row < 0 || row > 5 || col < 2 || col > 5) {
    count = 0;
    return;
  } else if (token[i] && token[i].classList.contains('bart')) {
    count = count + 1;
    return checkLHorizontalB(row, col - 1);
  } else
    count = 0;
    return;
};

var checkRHorizontalA = function(row, col) {
  var token = document.querySelectorAll('.token');
  var i = (row*7 + col);
    if (count > 3) {
    return gameWinner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (token[i] && token[i].classList.contains('lisa')) {
    count = count + 1;
    return checkRHorizontalA(row, col + 1);
  } else
    count = 0;
    return;
};

var checkLHorizontalA = function(row, col) {
  var token = document.querySelectorAll('.token');
  var i = (row*7 + col);
if (count > 3) {
    return gameWinner();
  } else if (row < 0 || row > 5 || col < 2 || col > 5) {
    count = 0;
    return;
  } else if (token[i] && token[i].classList.contains('lisa')) {
    count = count + 1;
    return checkLHorizontalA(row, col - 1);
  } else
    count = 0;
    return;
};

var checkRDiagonalB = function(row, col) {
  var token = document.querySelectorAll('.token');
  var i = (row*7 + col);
    if (count > 3) {
    return gameWinner();
  } else if (row < 0 || row > 5 || col < 0 || col > 5) {
    count = 0;
    return;
  } else if (token[i] && token[i].classList.contains('bart')) {
    count = count + 1;
    return checkRDiagonalB(row - 1, col + 1);
  } else
    count = 0;
    return;
};

var checkRDiagonalA = function(row, col) {
  var token = document.querySelectorAll('.token');
  var i = (row*7 + col);
if (count > 3) {
    return gameWinner();
  } else if (row < 0 || row > 5 || col < 0 || col > 5) {
    count = 0;
    return;
  } else if (token[i] && token[i].classList.contains('lisa')) {
    count = count + 1;
    return checkRDiagonalA(row - 1, col + 1);
  } else
    count = 0;
    return;
};

var checkLDiagonalB = function(row, col) {
  var token = document.querySelectorAll('.token');
  var i = (row*7 + col);
if (count > 3) {
    return gameWinner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (token[i] && token[i].classList.contains('bart')) {
    count = count + 1;
    return checkLDiagonalB(row - 1, col - 1);
  } else
    count = 0;
    return;
};

var checkLDiagonalA = function(row, col) {
  var token = document.querySelectorAll('.token');
  var i = (row*7 + col);
if (count > 3) {
    return gameWinner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (token[i] && token[i].classList.contains('bart')) {
    count = count + 1;
    return checkLDiagonalA(row - 1, col - 1);
  } else
    count = 0;
    return;
};

var scanBoard = function() {
  var token = document.querySelectorAll('.token');
  for (var i = 0; i < token.length; i++) {
  var row = parseInt(i / 7);
  var col = parseInt(i % 7);
  checkRHorizontalA(row, col);
  checkLHorizontalA(row, col);
  checkRHorizontalB(row, col);
  checkLHorizontalB(row, col);
  checkVerticalA(row, col);
  checkVerticalB(row, col);
  checkRDiagonalA(row, col);
  checkRDiagonalB(row, col);
  checkLDiagonalA(row, col);
  checkLDiagonalB(row, col);
  }
  spaces -= 1;
  if (spaces === 0) tieGame();
};

var gameWinner = function() {
  var h3 = document.querySelector('h3');
  h3.innerHTML = currentPlayer.name + " wins! Ha-Ha!";
  board.removeEventListener('click', handleClick);
  return;
};

var tieGame = function() {
  board.removeEventListener('click', handleClick);
  var h3 = document.querySelector('h3');
  h3.innerHTML = "It's a tie game! Doh!";
  return;
};

var newGame = function() {
  var lisa = document.querySelector('.lisa');
  var bart = document.querySelector('.bart');
  var h3 = document.querySelector('h3');
  h3.innerHTML = "Bart gets to start! Eat my shorts!";
  currentPlayer = players[1];
  spaces = 42;
  count = 0;
  renderBoard();
  board.addEventListener('click', handleClick);
  return;
};

board.addEventListener('click', handleClick);
button.addEventListener('click', newGame);

renderBoard();