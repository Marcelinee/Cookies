import React from 'react'

export default class Mine extends React.Component {
    render() {
        return (
            <div>
                <button 
                    disabled = {(this.props.cookiesAmount < this.props.mineCost)  || (this.props.mineCost === 0)}
                    onClick={() => {this.props.buyProducers("farm")}}>
                    Buy Mine
                </button>
            </div>
        );
    }
}