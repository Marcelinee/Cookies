import React from 'react'

export default class Cookie extends React.Component {
    clickCookie() {
        let cookieImg = document.getElementById("cookieImg");
        cookieImg.style.width = "380px";
        setTimeout(function() {cookieImg.style.width = "400px"}, 50);

    }
    render() {
        return (
            <div className="cookie">
                <div className= "cookieDiv">
                    <img id="cookieImg" src="http://moziru.com/images/biscuit-clipart-circle-12.png" className="cookieImg" useMap="#cookieMap"/>

                    <map name="cookieMap">
                        <area shape="circle" coords="200, 200, 200" onClick={() => {this.props.addCookies(), this.clickCookie();}} className="click"/>
                    </map>
                </div>
                    <div className="cookieInfo">
                        <p>Cookies amount {Math.round(this.props.cookiesAmount)}</p>
                        <p>Cookies per second {this.props.cookiesPerSecond}</p>
                    </div>
            </div>
        )
    }
}