import React from 'react'

export default class Cookie extends React.Component {
    constructor(props) {
        super(props);
        this.imgCoords = this.imgCoords.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            coords: "200,200,200"
        }
    }

    addPlus() {
        const plus = <div>+1</div>;
    }

    clickCookie() {
        let cookieImg = document.getElementById("cookieImg");
        cookieImg.style.transform = "scale(0.95,0.95)";
        setTimeout(function() {cookieImg.style.transform = "scale(1,1)";}, 50);
    }

    //Compute cookie size
    imgCoords() {
           let wid = (parseFloat(window.getComputedStyle(document.getElementById("cookieImg")).getPropertyValue("height")))/2;
           let hei = (parseFloat(window.getComputedStyle(document.getElementById("cookieImg")).getPropertyValue("width")))/2;
           let rad = wid;
           return `${wid},${hei},${rad}`
    }

    //Change coords for area tag 
    handleResize() {
        this.setState(() => {return {coords: this.imgCoords()}});
    }

    componentDidMount() {
        var that = this;
        window.addEventListener('resize', function(){that.handleResize();}, true);
    }

    render() {
        return (
            <div className="cookie">
                <div id="cookieContainer">
                    <div className= "cookieDiv">
                        <img id="cookieImg" src={(this.props.cookiesAmount === 0) ? "images/cookie0.png" : "images/cookie.png"} className="cookieImg" useMap="#cookieMap"/>
                            <map name="cookieMap">
                                <area shape="circle"  coords={this.state.coords} onClick={() => {this.props.addCookies(), this.clickCookie(), this.addPlus()}} className="click"/>
                            </map>
                    </div>
                    
                    <div className="cookieInfo">
                        <p className="cookieText">Cookies amount {Math.round(this.props.cookiesAmount)}</p>
                        <p className="cookieText">Cookies per second {this.props.cookiesPerSecond}</p>
                    </div>
                </div>
            </div>
        )
    }
}