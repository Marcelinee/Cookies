import React from 'react'
import * as cnt from "./constants.js"

export default class CursorInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Cursor amount: {this.props.cursorAmount}</p>
            <p>Cursor cost: {this.props.cursorCost}</p>
            <p>Cursor cookies production: {this.props.cursorAmount * cnt.cpsMultiplier.cursor}/second</p>
            </div>
        );
    }
}