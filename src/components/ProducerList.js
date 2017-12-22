import React from 'react'
import Cursor from "./Cursor"
import Grandma from "./Grandma"
import Factory from "./Factory"
import Mine from "./Mine"
import Farm from "./Farm"

export default class ProducerList extends React.Component {    
        render() {
            return (
                <div className= "list">
                    <div className="listContainer">
                    <Cursor buyProducers={() => this.props.buyProducers("cursor")} cursorAmount={this.props.cursorAmount} cursorCost={this.props.cursorCost} cookiesAmount={this.props.cookiesAmount}/>              
                    <Grandma buyProducers={() => this.props.buyProducers("grandma")}  grandmaAmount={this.props.grandmaAmount} grandmaCost={this.props.grandmaCost} cookiesAmount={this.props.cookiesAmount}/>
                    <Farm buyProducers={() => this.props.buyProducers("farm")}  farmAmount={this.props.farmAmount} farmCost={this.props.farmCost} cookiesAmount={this.props.cookiesAmount}/>
                    <Mine buyProducers={() => this.props.buyProducers("mine")}  mineAmount={this.props.mineAmount} mineCost={this.props.mineCost} cookiesAmount={this.props.cookiesAmount}/>                    
                    <Factory buyProducers={() => this.props.buyProducers("factory")}  factoryAmount={this.props.factoryAmount} factoryCost={this.props.factoryCost} cookiesAmount={this.props.cookiesAmount}/>                    
                    </div>
                </div>
            );
        }
    }