import React from 'react'

export default class Bakery extends React.Component {
    render() {
        return (
            <div><button 
            disabled = {this.props.cookiesAmount < this.props.bakeryCost}
            onClick={() => {this.props.buyProducers("bakery")}}>Buy Bakery</button></div>
        );
    }
}