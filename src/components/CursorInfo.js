import React from 'react'
import * as cnt from "./constants.js"

export default class CursorInfo extends React.Component {
    render() {
        return (
            <div className="producerInfo">
                <table>
                    <tbody>
                        <tr>
                            <td className="name">CURSOR</td>
                            <td>Amount: {this.props.cursorAmount}</td>
                        </tr>
                        <tr>
                            <td>Cost: {this.props.cursorCost}</td>
                            <td>Cookies production: {this.props.cursorAmount * Math.round(cnt.cpsMultiplier.cursor*100)/100}/s</td>                
                        </tr>
                    </tbody>
                </table>            
            </div>
        );
    }
}