import React from 'react'
import CursorInfo from "./CursorInfo"
import GrandmaInfo from "./GrandmaInfo"
import FactoryInfo from "./FactoryInfo"
import MineInfo from "./MineInfo"
import FarmInfo from "./FarmInfo"


export default class ProducerInfo extends React.Component {
    render() {
        return (
            <div className="info">
            <div className="infoContainer">
                <CursorInfo cursorAmount={this.props.cursorAmount} cursorCost={this.props.cursorCost} />
                <GrandmaInfo grandmaAmount={this.props.grandmaAmount} grandmaCost={this.props.grandmaCost}/>
                <FarmInfo farmAmount={this.props.farmAmount} farmCost={this.props.farmCost}/>
                <MineInfo mineAmount={this.props.mineAmount} mineCost={this.props.mineCost}/>
                <FactoryInfo factoryAmount={this.props.factoryAmount} factoryCost={this.props.factoryCost} />
            </div>
            </div>
        );
    }
}