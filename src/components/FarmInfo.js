import React from 'react'
import * as cnt from "./constants.js"

export default class FarmInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Farm amount: {this.props.farmAmount}</p>
            <p>Farm cost: {this.props.farmCost}</p>
            <p>Farm cookies production: {this.props.farmAmount * cnt.cpsMultiplier.farm}/second</p>
            </div>
        );
    }
}