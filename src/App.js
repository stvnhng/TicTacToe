import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Body from './Body.js';

import Announcement from './Announcement.js';
import ResetButton from './ResetButton.js';
import Tile from './Tile.js';

import Footer from './Footer.js'

class App extends Component {
    constructor() {
        super();
        this.state= {
            gameBoard: [
                ' ', ' ', ' ',
                ' ', ' ', ' ',
                ' ', ' ', ' '
            ]
        }
    }
  render() {
    return (
      <div className="container">
       <div className="menu">
        <h1>Tic-Tac-Toe</h1>
        <Announcement />
        <ResetButton />
      </div>
      {this.state.gameBoard.map(function(value, i) {
          <Tile />
      })}
     </div>
    );
  }
}


export default App;
