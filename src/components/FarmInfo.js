import React from 'react'
import * as cnt from "./constants.js"

export default class FarmInfo extends React.Component {
    render() {
        return (
            <div className="producerInfo">
                <table>
                    <tbody>
                        <tr>
                            <td className="name">FARM</td>
                            <td>Amount: {this.props.farmAmount}</td>
                        </tr>
                        <tr>
                            <td>Cost: {this.props.farmCost}</td>
                            <td>Cookies production: {this.props.farmAmount * cnt.cpsMultiplier.farm}/s</td>                
                        </tr>
                    </tbody>
                </table>            
            </div>
        );
    }
}