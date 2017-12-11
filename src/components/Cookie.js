import React from 'react'

export default class Cookie extends React.Component {
    render() {
        return (
            <div>
            <button onClick={this.props.addCookies}>Cookie click!</button>
            <p>Cookies amount {Math.round(this.props.cookiesAmount)}</p>
            <p>Cookies per second {this.props.cookiesPerSecond}</p>
            </div>
        )
    }
}