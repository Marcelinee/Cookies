import React from 'react'

export default class Cursor extends React.Component {
    render() {
        return (
            <div>
                <button 
                    disabled = {(this.props.cookiesAmount < this.props.cursorCost) || (this.props.cursorCost === 0)}
                    onClick={() => {this.props.buyProducers("cursor")}}>
                    Buy Cursor 
                </button>
            </div>
        );
    }
}