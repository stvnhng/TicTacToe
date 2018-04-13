import React,{ Component } from 'react';
import './Announcement.css'

export default class Announcement extends Component {
    render() {
        return (
            // if there is a winner, then class becomes visible, if not hidden
            <div className={this.props.winner ? 'visible' : 'hidden'}>
                <h2>You win! Player {this.props.winner}</h2>
            </div>
        )
    }
}
