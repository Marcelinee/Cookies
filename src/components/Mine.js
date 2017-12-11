import React from 'react'

export default class Mine extends React.Component {
    render() {
        return (
            <div>
            <button 
                disabled = {this.props.cookiesAmount < this.props.mineCost}
                onClick={() => {this.props.buyProducers("farm")}}>
                Buy Mine
            </button>
            </div>
        );
    }
}