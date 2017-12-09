import React from 'react'

export default class Grandma extends React.Component {
    render() {
        return (
            <div><button 
            disabled = {this.props.cookiesAmount < this.props.grandmaCost}
            onClick={() => {this.props.buyProducers("grandma")}}>Buy Grandma</button></div>
        );
    }
}