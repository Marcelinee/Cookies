require(["/scripts/cookies.js"], function(cookies){});
requirejs.config({
    paths: {
        'react': 'https://unpkg.com/react@15.3.2/dist/react',
        'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
    }
});

requirejs(['react', 'react-dom'], function(React, ReactDOM) {

class CookiesClicker extends React.Component {
    render() {
        let cookies = {
            amount: 0,
            perSecond : 0
        }
        return (
            <div>
                <form>
                    Cookies amount: <input type="text" id="amount"></input>
                    Cookies per second<input type= "text" id="perSecond"></input>
                    Cookies DB key<input type="text" id="id"></input>
                </form>
                <button onClick={addCookies}>Add value</button>
                <button onClick={getCookies}>Get value</button>
                <button onClick={updateCookies}>Update value</button>
                <p>Cookies amount {cookies.amount}</p>
            </div>
        )
    }
}

ReactDOM.render(<CookiesClicker />, document.getElementById('cookies'));
});