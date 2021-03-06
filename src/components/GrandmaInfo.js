import React from 'react'
import * as cnt from "./constants.js"

export default class GrandmaInfo extends React.Component {
    render() {
        return (
            <div className="producerInfo">
                <table>
                    <tbody>
                        <tr>
                            <td className="name">GRANDMA</td>
                            <td>Amount: {this.props.grandmaAmount}</td>
                        </tr>
                        <tr>
                            <td>Cost: {this.props.grandmaCost}</td>
                            <td>Cookies production: {this.props.grandmaAmount * Math.round(cnt.cpsMultiplier.grandma*100)/100}/s</td>                
                        </tr>
                    </tbody>
                </table>            
            </div>
        );
    }
}
