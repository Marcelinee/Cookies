import React from 'react'
import * as cnt from "./constants.js"

export default class FactoryInfo extends React.Component {
    render() {
        return (
            <div className="producerInfo">
                <table>
                    <tbody>
                        <tr>
                            <td className="name">FACTORY</td>
                            <td>Amount: {this.props.factoryAmount}</td>
                        </tr>
                        <tr>
                            <td>Cost: {this.props.factoryCost}</td>
                            <td>Cookies production: {this.props.factoryAmount * Math.round(cnt.cpsMultiplier.factory*100)/100}/s</td>                
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}