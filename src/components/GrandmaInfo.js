import React from 'react'
import * as cnt from "./constants.js"

export default class GrandmaInfo extends React.Component {
    render() {
        return (
            <div className="producerInfo">
            <p>Grandma amount: {this.props.grandmaAmount}</p>
            <p>Grandma cost: {this.props.grandmaCost}</p>
            <p>Grandma cookies production: {(this.props.grandmaAmount * cnt.cpsMultiplier.grandma)}/second</p>
            </div>
        );
    }
}
