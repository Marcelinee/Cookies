require(["scripts/cookies.js"], function(cookies){});
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
 
        this.intervalTim = setInterval(() => this.setState({amount: Math.floor(this.state.amount + (this.state.perSecond))}), 100)
        this.intervalCookies = setInterval(() => updateCookiesDatabase("cookies", this.state.amount, this.state.perSecond), 10000);
        this.intervalProducers = setInterval(() => updateProducersDatabase("producers", this.state.cursorAmount, this.state.cursorCost,
        this.state.grandmaAmount, this.state.grandmaCost, this.state.mineAmount, this.state.mineCost,
        this.state.farmAmount, this.state.farmCost), 10000);
        //cookiesCpsUpdate();
        
        }

    cookiesCpsUpdate() {
        this.setState({perSecond: (this.state.grandmaAmount * cpsMultiplier.grandma)});
    }

    handleBuy(producer) {
       // this.setState((prevState) => {
            //this.setState({[producer + "Amount"]: prevState[producer + "Amount"] + 1, [producer + "Cost"]: prevState[[producer + "Cost"]]})});
       
        this.setState((prevState) => ({[producer + "Amount"]: prevState[producer + "Amount"] + 1, [producer + "Cost"]: prevState[producer + "Cost"] + 1}));
    }

    componentWillUnmount() {
        clearInterval(this.intervalTim);
        clearInterval(this.intervalCookies);
        clearInterval(this.intervalProducers);
      }

    render() {
        //cps = this.state.grandmaAmount*cpsMultiplier.grandma + this.state.cursorAmount*cpsMultiplier.cursor; //It does not need to be computed with every render (to constructor?)
        return (
            <div>
            <ProducerList handleBuy={this.handleBuy} grandmaAmount={this.state.grandmaAmount} grandmaCost={this.state.grandmaCost}/>
            <ProducerInfo grandmaAmount={this.state.grandmaAmount} grandmaCost={this.state.grandmaCost}/>
                <form>
                    Cookies amount: <input type="text" id="amount"></input>
                    Cookies per second<input type= "text" id="perSecond"></input>
                    Cookies DB key<input type="text" id="id"></input>
                </form>
                <button onClick={addCookies}>Add value</button>
                <button onClick={getCookies}>Get value</button>
                <button onClick={updateCookies}>Update value</button>
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
                <Cursor />
                <Grandma  handleBuy={() => this.props.handleBuy("grandma")} grandmaAmount={this.props.grandmaAmount} grandmaCost={this.props.grandmaCost}/>
                <Farm />
            </div>
        );
    }
}

class ProducerInfo extends React.Component {
    render() {
        return (
            <div>
                <CursorInfo />
                <GrandmaInfo handleBuy={this.props.handleBuy} grandmaAmount={this.props.grandmaAmount} grandmaCost={this.props.grandmaCost}/>
                <FarmInfo />
            </div>
        );
    }
}

class Cursor extends React.Component {
    render() {
        return (
            <div><button>Buy Cursor </button></div>
        );
    }
}

class Grandma extends React.Component {
    render() {
        return (
            <div><button onClick={this.props.handleBuy}>Buy Grandma</button></div>
        );
    }
}

class Farm extends React.Component {
    render() {
        return (
            <div><button>Buy Farm</button></div>
        );
    }
}

class CursorInfo extends React.Component {
    render() {
        return (
            <div><p>Cursor cost:</p></div>
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

class FarmInfo extends React.Component {
    render() {
        return (
            <div><p>Farm cost:</p></div>
        );
    }
}

ReactDOM.render(<CookiesClicker />, document.getElementById('cookies'));
});