import React,{ Component } from 'react';


// All cells pushed into an array.
var cells = document.querySelectorAll('.cell');

// Add click event listener to all cells.
for (var cell=0; cell < cells.length; cell++) {
  cells[cell].addEventListener('click', placeMarker);
}

// Track the game progress.
var count = 0;
var x = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"];
var o = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"];
var playerTurnDiv = document.querySelector(".playerTurn");


// Winning Combos
var win = [[1,1,1,0,0,0,0,0,0], [0,0,0,1,1,1,0,0,0], [0,0,0,0,0,0,1,1,1],
           [1,0,0,1,0,0,1,0,0], [0,1,0,0,1,0,0,1,0], [0,0,1,0,0,1,0,0,1],
           [1,0,0,0,1,0,0,0,1], [0,0,1,0,1,0,1,0,0]];

var inARow;
function checkWin (player) {
  for (var i=0; i < win.length; i++) {
    inARow = 0;
    for (var j=0; j < win[i].length; j++) {
      if(win[i][j] === player[j]){
        inARow += 1;
      }
      if (inARow > 2){
        return true;
      }
    }
  }
  return false;
}


// Add X or O on alternation and check winner after turn.
function placeMarker(e) {
  if ( count % 2 === 0) {
    e.target.innerText = "X";
    x[e.target.id[4]] = 1;
    count += 1;
    e.target.removeEventListener('click', placeMarker);
    if (count > 4 && checkWin(x)) {
      playerTurnDiv.innerText = "Game over, X wins!";
      endGame();
    } else if (count > 7){
      playerTurnDiv.innerText = "Game over, it's a draw!";
      endGame();
    } else {
      playerTurnDiv.innerText = "It is O's turn";
    }
  } else {
    e.target.innerText = "O";
    count += 1;
    o[e.target.id[4]] = 1;
    e.target.removeEventListener('click', placeMarker);
    if (count > 4 && checkWin(o)) {
      playerTurnDiv.innerText = "Game over, O wins!";
      endGame();
    } else if (count > 7) {
      playerTurnDiv.innerText = "Game over, it's a draw!";
      endGame();
    } else {
      playerTurnDiv.innerText = "It is X's turn";
    }
  }
}

// Reset the board.
function reset() {
  playerTurnDiv.innerText = "It is X's turn";
  count = 0;
  x = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"];
  o = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"];
  for (var cell=0; cell < cells.length; cell++) {
    cells[cell].addEventListener('click', placeMarker);
    cells[cell].innerHTML = "&nbsp;" ;
  }
}

// Add click event listener for reset button.
var resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', reset);

// Ends the game. No more clicking allowed.
function endGame() {
  for (var cell=0; cell < cells.length; cell++) {
  cells[cell].removeEventListener('click', placeMarker);
}
}




export default Body;
