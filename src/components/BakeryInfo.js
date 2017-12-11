import React from 'react'
import * as cpsMultiplier from "./constants.js"

export default class BakeryInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Bakery amount: {this.props.bakeryAmount}</p>
            <p>Bakery cost: {this.props.bakeryCost}</p>
            <p>Bakery cookies production: {this.props.bakeryAmount * cpsMultiplier.cpsMultiplier.bakery}/second</p>
            </div>
        );
    }
}