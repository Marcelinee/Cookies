import React from 'react'
import * as cnt from "./constants.js"

export default class MineInfo extends React.Component {
    render() {
        return (
            <div className="producerInfo">
                <table>
                    <tbody>
                        <tr>
                            <td className="name">MINE</td>
                            <td>Amount: {this.props.mineAmount}</td>
                        </tr>
                        <tr>
                            <td>Cost: {this.props.mineCost}</td>
                            <td>Cookies production: {this.props.mineAmount * cnt.cpsMultiplier.mine}/s</td>                
                        </tr>
                    </tbody>
                </table>            
            </div>
        );
    }
}