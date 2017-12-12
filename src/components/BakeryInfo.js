import React from 'react'
import * as cnt from "./constants.js"

export default class BakeryInfo extends React.Component {
    render() {
        return (
            <div className="producerInfo">
            <table>
            <tr>
                <td className="name">BAKERY</td>
                <td>Amount: {this.props.bakeryAmount}</td>
            </tr>
            <tr>
                <td>Cost: {this.props.bakeryCost}</td>
                <td>Cookies production: {this.props.bakeryAmount * cnt.cpsMultiplier.bakery}/s</td>                
            </tr>
        </table>
            </div>
        );
    }
}