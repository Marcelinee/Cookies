import React from 'react'
import * as cnt from "./constants.js"

export default class MineInfo extends React.Component {
    render() {
        return (
            <div className="producerInfo">
            <p>Mine amount: {this.props.mineAmount}</p>
            <p>Mine cost: {this.props.mineCost}</p>
            <p>Mine cookies production: {this.props.mineAmount * cnt.cpsMultiplier.mine}/second</p>
            </div>
        );
    }
}