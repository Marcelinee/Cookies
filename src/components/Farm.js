import React from 'react'

export default class Farm extends React.Component {
    render() {
        return (
            <div>
            <button 
            disabled = {this.props.cookiesAmount < this.props.farmCost}
                onClick={() => {this.props.buyProducers("farm")}}>
                Buy Farm 
            </button>
            </div>
        );
    }
}