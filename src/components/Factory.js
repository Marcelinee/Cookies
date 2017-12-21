import React from 'react'

export default class Factory extends React.Component {
    render() {
        return (
            <div><button 
            disabled = {this.props.cookiesAmount < this.props.factoryCost}
            onClick={() => {this.props.buyProducers("factory")}}>Buy Factory</button></div>
        );
    }
}