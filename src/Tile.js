import React,{ Component } from 'react';
import './Tile.css';

export default class Title extends Component {
    tileClick(props) {
        //click calls update function which exists on our main app.js component. calls it with location and whose turn it is
        props.updateBoard(props.loc, props.turn);
    }
    render() {
        return (
            // tile plus the location on the gameBoard to know where move was, onClick shows whose turn it is and checks to see if someone has already played in that tile
            // passes the onClick to props which passes into the tile
            <div className={"tile " + this.props.loc} onClick={() => this.tileClick(this.props)}>
                {/* value is the player of the game board, x or o */}
                <p>{this.props.value}</p>
            </div>
        )
    }

}
