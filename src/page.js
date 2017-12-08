requirejs(["scripts/cookies.js"], function(cookies){});
requirejs.config({
    paths: {
        'react': 'https://unpkg.com/react@15.3.2/dist/react',
        'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
    }
});

requirejs(['react', 'react-dom'], function(React, ReactDOM) {
const cpsMultiplier = {
    cursor: 1,
    grandma: 5,
    mine: 10,
    farm: 20
}    
let cps;
class CookiesClicker extends React.Component {
    constructor(props) {
        super(props);
        this.cookiesCpsUpdate = this.cookiesCpsUpdate.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.state = {
                amount: 0,
                perSecond : 0, //is it needed here?
                cursorAmount: 0,
                cursorCost: 0,
                grandmaAmount: 0,
                grandmaCost: 0,
                mineAmount: 0,
                mineCost: 0,
                farmAmount: 0,
                farmCost: 0
            };
    }

    componentDidMount() {
        var that = this; 
        var cookiesRestore, producersRestore;

        setTimeout(function() {
            pageCookiesRestore(function(cookies) {
            console.log(cookies); cookiesRestore = cookies; console.log(cookiesRestore.amount);
            that.setState({amount: cookiesRestore.amount, perSecond: cookiesRestore.perSecond});
            })
        }, 100);

        setTimeout(function() {
            pageProducersRestore(function(producers) {
            console.log(producers); producersRestore = producers; console.log(producersRestore.amount);
            that.setState({cursorAmount: producersRestore.cursorAmount, cursorValue: producersRestore.cursorCost,
                           grandmaAmount: producersRestore.grandmaAmount, grandmaValue: producersRestore.grandmaCost,
                           mineAmount: producersRestore.mineAmount, mineValue: producersRestore.mineCost,
                           farmAmount: producersRestore.farmAmount, farmValue: producersRestore.farmCost});
            })
        }, 100);
 
        this.intervalTim = this.state.perSecond < 10 ? (setInterval(() => this.setState({amount: Math.floor(this.state.amount + (this.state.perSecond/10))}), 100))
                                                      :(setInterval(() => this.setState({amount: Math.floor(this.state.amount + (this.state.perSecond))}), 1000));
        this.intervalCookies = setInterval(() => updateCookiesDatabase("cookies", this.state.amount, this.state.perSecond), 3000);
        this.intervalProducers = setInterval(() => updateProducersDatabase("producers", this.state.cursorAmount, this.state.cursorCost,
        this.state.grandmaAmount, this.state.grandmaCost, this.state.mineAmount, this.state.mineCost,
        this.state.farmAmount, this.state.farmCost), 10000);
        //cookiesCpsUpdate();
        
        }

    cookiesCpsUpdate() {
        this.setState({perSecond: (this.state.cursorAmount * cpsMultiplier.cursor + this.state.grandmaAmount * cpsMultiplier.grandma
                                 + this.state.mineAmount * cpsMultiplier.mine + this.state.farmAmount * cpsMultiplier.farm)});
    }

    handleBuy(producer) {
        this.setState((prevState) => ({[producer + "Amount"]: prevState[producer + "Amount"] + 1, [producer + "Cost"]: prevState[producer + "Cost"] + 1}));
    }

    componentWillUnmount() {
        clearInterval(this.intervalTim);
        clearInterval(this.intervalCookies);
        clearInterval(this.intervalProducers);
      }

    render() {
        return (
            <div>
            <ProducerList cookiesCpsUpdate= {this.cookiesCpsUpdate} handleBuy={this.handleBuy} cursorAmount={this.state.cursorAmount} cursorCost={this.state.cursorCost}
                                                    grandmaAmount={this.state.grandmaAmount} grandmaCost={this.state.grandmaCost}
                                                    mineAmount={this.state.mineAmount} mineCost={this.state.mineCost}
                                                    farmAmount={this.state.farmAmount} farmCost={this.state.farmCost}/>
            <ProducerInfo cursorAmount={this.state.cursorAmount} cursorCost={this.state.cursorCost}
                            grandmaAmount={this.state.grandmaAmount} grandmaCost={this.state.grandmaCost}
                            mineAmount={this.state.mineAmount} mineCost={this.state.mineCost}
                            farmAmount={this.state.farmAmount} farmCost={this.state.farmCost}/>

                <button onClick={this.cookiesCpsUpdate}>Update cps</button>
                <p>Cookies amount {this.state.amount}</p>
                <p>Cookies per second {this.state.perSecond}</p>
            </div>
        );

    }
}

class ProducerList extends React.Component {

    render() {
        return (
            <div>
                <Cursor handleBuy={() => this.props.handleBuy("cursor")} cookiesCpsUpdate={() => this.props.cookiesCpsUpdate()} cursorAmount={this.props.cursorAmount} cursorCost={this.props.cursorCost}/>              
                <Grandma handleBuy={() => this.props.handleBuy("grandma")} cookiesCpsUpdate={() => this.props.cookiesCpsUpdate()} grandmaAmount={this.props.grandmaAmount} grandmaCost={this.props.grandmaCost}/>
                <Mine handleBuy={() => this.props.handleBuy("mine")} cookiesCpsUpdate={() => this.props.cookiesCpsUpdate()} cursorAmount={this.props.mineAmount} cursorCost={this.props.mineCost}/>
                <Farm handleBuy={() => this.props.handleBuy("farm")} cookiesCpsUpdate={() => this.props.cookiesCpsUpdate()} farmAmount={this.props.farmAmount} farmCost={this.props.farmCost}/>
            </div>
        );
    }
}

class ProducerInfo extends React.Component {
    render() {
        return (
            <div>
                <CursorInfo cursorAmount={this.props.cursorAmount} cursorCost={this.props.cursorCost}/>
                <GrandmaInfo grandmaAmount={this.props.grandmaAmount} grandmaCost={this.props.grandmaCost}/>
                <MineInfo mineAmount={this.props.mineAmount} mineCost={this.props.mineCost}/>
                <FarmInfo farmAmount={this.props.farmAmount} farmCost={this.props.farmCost}/>
            </div>
        );
    }
}

class Cursor extends React.Component {
    render() {
        return (
            <div><button onClick={() => {this.props.handleBuy("cursor"); this.props.cookiesCpsUpdate()}}>Buy Cursor </button></div>
        );
    }
}

class Grandma extends React.Component {
    render() {
        return (
            <div><button onClick={() => {this.props.handleBuy("grandma"); this.props.cookiesCpsUpdate()}}>Buy Grandma</button></div>
        );
    }
}

class Mine extends React.Component {
    render() {
        return (
            <div><button onClick={() => {this.props.handleBuy("mine"); this.props.cookiesCpsUpdate()}}>Buy Mine</button></div>
        );
    }
}

class Farm extends React.Component {
    render() {
        return (
            <div><button onClick={() => {this.props.handleBuy("farm"); this.props.cookiesCpsUpdate()}}>Buy Farm </button></div>
        );
    }
}

class CursorInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Cursor amount: {this.props.cursorAmount}</p>
            <p>Cursor cost: {this.props.cursorCost}</p>
            </div>
        );
    }
}

class GrandmaInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Grandma amount: {this.props.grandmaAmount}</p>
            <p>Grandma cost: {this.props.grandmaCost}</p>
            </div>
        );
    }
}

class MineInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Mine amount: {this.props.mineAmount}</p>
            <p>Mine cost: {this.props.mineCost}</p>
            </div>
        );
    }
}

class FarmInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Farm amount: {this.props.farmAmount}</p>
            <p>Farm cost: {this.props.farmCost}</p>
            </div>
        );
    }
}

ReactDOM.render(<CookiesClicker />, document.getElementById('cookies'));
});