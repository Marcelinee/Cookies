import React from 'react'
import * as cnt from "./constants.js"

export default class CursorInfo extends React.Component {
    render() {
        return (
            <div className="producerInfo">
            <table>
            <tr>
                <td className="name">CURSOR</td>
                <td>Amount: {this.props.cursorAmount}</td>
            </tr>
            <tr>
                <td>Cost: {this.props.cursorCost}</td>
                <td>Cookies production: {this.props.cursorAmount * cnt.cpsMultiplier.cursor}/s</td>                
            </tr>
        </table>            
        </div>
        );
    }
}