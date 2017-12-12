import React from 'react'
import * as cnt from "./constants.js"

export default class BakeryInfo extends React.Component {
    render() {
        return (
            <div className="producerInfo">
            <p>Bakery amount: {this.props.bakeryAmount}</p>
            <p>Bakery cost: {this.props.bakeryCost}</p>
            <p>Bakery cookies production: {this.props.bakeryAmount * cnt.cpsMultiplier.bakery}/second</p>
            </div>
        );
    }
}