import React, { Component } from 'react';
import './App.css';
import Body from './Body.js';
import index from './index.js';
import Announcement from './Announcement.js';
import ResetButton from './ResetButton.js';
import Tile from './Tile.js';
import Footer from './Footer.js'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            gameBoard: [
                ' ', ' ', ' ',
                ' ', ' ', ' ',
                ' ', ' ', ' '
            ],

            turn: 'x',
            winner: null
        }
    }

    // reset button needs to be passed with prop that resets the board
    resetBoard(){
      // state containing gameBoard
      this.setState({
        // gameBoard is set to empty array when reset
        gameBoard: [
            ' ', ' ', ' ',
            ' ', ' ', ' ',
            ' ', ' ', ' '
        ],
        turn: 'x',
        winner: null
      });
    }

    // function collects player's location and whosever turn it is
    updateBoard(loc, player) {
      // if a tile is clicked and equals x or o or if there is a winner it is not valid play.
      if(this.state.gameBoard[loc] === 'x' || this.state.gameBoard[loc] === 'o' || this.state.winner){
        // invalid move so return
        return;
      }

      let currentGameBoard = this.state.gameBoard;
      // splice in players move at the location it was clicked, we return a single element
      currentGameBoard.splice(loc, 1, this.state.turn);
      // sets state of valid move on gameBoard
      this.setState({gameBoard: currentGameBoard});

      let topRow = this.state.gameBoard[0] + this.state.gameBoard[1] + this.state.gameBoard[2];
      // if top row matches three x or o
      if (topRow.match(/xxx|ooo/)) {
        // then there's a winner
        this.setState({winner: this.state.turn});
        return;
      }
      let middleRow = this.state.gameBoard[3] + this.state.gameBoard[4] +   this.state.gameBoard[5];
      if (middleRow.match(/xxx|ooo/)) {
        this.setState({winner: this.state.turn});
        return;
      }
      let bottomRow = this.state.gameBoard[6] + this.state.gameBoard[7] + this.state.gameBoard[8];
      if (bottomRow.match(/xxx|ooo/)) {
        this.setState({winner: this.state.turn});
        return;
      }
      let leftCol = this.state.gameBoard[0] + this.state.gameBoard[3] + this.state.gameBoard[6];
      if (leftCol.match(/xxx|ooo/)) {
        this.setState({winner: this.state.turn});
        return;
      }
      let middleCol = this.state.gameBoard[1] + this.state.gameBoard[4] + this.state.gameBoard[7];
      if (middleCol.match(/xxx|ooo/)) {
        this.setState({winner: this.state.turn});
        return;
      }
      let rightCol = this.state.gameBoard[2] + this.state.gameBoard[5] + this.state.gameBoard[8];
      if (rightCol.match(/xxx|ooo/)) {
        this.setState({winner: this.state.turn});
        return;
      }
      let leftDiag = this.state.gameBoard[0] + this.state.gameBoard[4] + this.state.gameBoard[8];
      if (leftDiag.match(/xxx|ooo/)) {
        this.setState({winner: this.state.turn});
        return;
      }
      let rightDiag = this.state.gameBoard[2] + this.state.gameBoard[4] + this.state.gameBoard[6];
      if (rightDiag.match(/xxx|ooo/)) {
        this.setState({winner: this.state.turn});
        return;
      }
      // join together all elements in the array and replace empty space with nothing
      let moves = this.state.gameBoard.join(' ').replace(/ /g, '');
      // if there are 9 moves, then set state of winner to draw
      if(moves.lengths === 9) {
        this.setState({winner: 'draw'});
      }
      // if player places x, then o turn, vice versa
      this.setState({turn: (this.state.turn === 'x') ? 'o' : 'x'});
    }

  render() {
    return (
      <div className="container">
       <div className="menu">
        <h1 id="title">Kisses & Hugs</h1>
        {/* pass in prop if there's a winner or note */}
        <Announcement winner={this.state.winner}/>
        {/* sets prop to reset, this is how it'll always look when passing a prop (function). you want to call the function on the top level component, app.js not on ResetButton itself because that's where the state exists. have to bind this from the ResetButton component to work. */}
        <ResetButton reset={this.resetBoard.bind(this)}/>
       </div>
       {/* we use curly braces to inject javascript directly into where we replace HTML code map the function for each elements of the array, value = value of the array element which can be x, o, or blank */}
      {this.state.gameBoard.map((value, i)=>{
        // return tile component for each of those array elements
        return (
            <Tile
              // passes props used to tile thru a key, uses index of the array
              key={i}
              // location is same as key
              loc={i}
              // pass the value, what is currently inside the square, blank, x or o
              value={value}
              // pass the updateBoard to the tile as a prop, and bind this (app components)
              updateBoard={this.updateBoard.bind(this)}
              // pass prop for whose turn it is
              turn={this.state.turn} />
          );
        })}
      <Footer />
     </div>
    );
  }
}
