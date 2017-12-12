import React from 'react'
import CursorInfo from "./CursorInfo"
import GrandmaInfo from "./GrandmaInfo"
import BakeryInfo from "./BakeryInfo"
import MineInfo from "./MineInfo"
import FarmInfo from "./FarmInfo"


export default class ProducerInfo extends React.Component {
    render() {
        return (
            <div className="info">
            <div className="infoContainer">
                <CursorInfo cursorAmount={this.props.cursorAmount} cursorCost={this.props.cursorCost} />
                <GrandmaInfo grandmaAmount={this.props.grandmaAmount} grandmaCost={this.props.grandmaCost}/>
                <BakeryInfo bakeryAmount={this.props.bakeryAmount} bakeryCost={this.props.bakeryCost} />
                <MineInfo mineAmount={this.props.mineAmount} mineCost={this.props.mineCost}/>
                <FarmInfo farmAmount={this.props.farmAmount} farmCost={this.props.farmCost}/>
            </div>
            </div>
        );
    }
}