import React from 'react'

import ProducerList from "./ProducerList";
import ProducerInfo from "./ProducerInfo";
import Cookie from "./Cookie"
import Cursor from "./Cursor";
import CursorInfo from "./CursorInfo"
import Grandma from "./Grandma";
import GrandmaInfo from "./GrandmaInfo"
import Bakery from "./Bakery";
import BakeryInfo from "./BakeryInfo"
import Mine from "./Mine";
import MineInfo from "./MineInfo"
import Farm from "./Farm";
import FarmInfo from "./FarmInfo";

import {restoreCookiesDatabase, restoreProducersDatabase, updateCookiesDatabase, updateProducersDatabase} from "../scripts/cookies.js"
import * as cnt from "./constants.js"

export default class CookiesClicker extends React.Component {
    constructor(props) {
        super(props);
        this.updateCookiesCPS = this.updateCookiesCPS.bind(this);
        this.buyProducers = this.buyProducers.bind(this);
        this.addCookies = this.addCookies.bind(this);
        this.reduceCookiesAmount = this.reduceCookiesAmount.bind(this);
        this.state = {
                amount: 0,
                perSecond : 0, 
                cursorAmount: 0,
                cursorCost: 0,
                grandmaAmount: 0,
                grandmaCost: 0,
                bakeryAmount: 0,
                bakeryCost: 0,
                mineAmount: 0,
                mineCost: 0,
                farmAmount: 0,
                farmCost: 0
            };
    }
    //Restoring and updating values
    componentDidMount() {
        var that = this; 
        var cookiesRestore, producersRestore;

        setTimeout(function() {
            restoreCookiesDatabase(function(cookies) {
            console.log(cookies); cookiesRestore = cookies; console.log(cookiesRestore.amount);
            that.setState({amount: cookiesRestore.amount, perSecond: cookiesRestore.perSecond});
            })
        }, 20);

        setTimeout(function() {
            restoreProducersDatabase(function(producers) {
            console.log(producers); producersRestore = producers; console.log(producersRestore.amount);
            that.setState({cursorAmount: producersRestore.cursorAmount, cursorCost: producersRestore.cursorCost,
                           grandmaAmount: producersRestore.grandmaAmount, grandmaCost: producersRestore.grandmaCost,
                           bakeryAmount: producersRestore.bakeryAmount, bakeryCost: producersRestore.bakeryCost,
                           mineAmount: producersRestore.mineAmount, mineCost: producersRestore.mineCost,
                           farmAmount: producersRestore.farmAmount, farmCost: producersRestore.farmCost});
            })
        }, 50);
 
        this.intervalTim = (setInterval(() => this.setState((prevState) =>  {return {amount: (prevState.amount + (this.state.perSecond/10))}}), 100));                                               
        this.intervalCookies = setInterval(() => updateCookiesDatabase("cookies", this.state.amount, this.state.perSecond), 3000);
        this.intervalProducers = setInterval(() => updateProducersDatabase("producers", this.state.cursorAmount, this.state.cursorCost,
            this.state.grandmaAmount, this.state.grandmaCost, this.state.bakeryAmount, this.state.bakeryCost, this.state.mineAmount, this.state.mineCost,
            this.state.farmAmount, this.state.farmCost), 3000);
        }

    updateCookiesCPS() {
        this.setState(() => {return {perSecond: (this.state.cursorAmount * cnt.cpsMultiplier.cursor + this.state.grandmaAmount * cnt.cpsMultiplier.grandma
                                                + this.state.bakeryAmount * cnt.cpsMultiplier.bakery  + this.state.mineAmount * cnt.cpsMultiplier.mine 
                                                + this.state.farmAmount * cnt.cpsMultiplier.farm)}});
    }

    //Cookie click adder
    addCookies() {
        this.setState((prevState) => {return {amount: prevState.amount + 1}});
    }
    //
    reduceCookiesAmount(cost) {
        this.setState((prevState) => {return {amount: prevState.amount - cost}});
    }

    buyProducers(producer) {
        this.setState((prevState) => {return {[producer + "Amount"]: prevState[producer + "Amount"] + 1, [producer + "Cost"]: prevState[producer + "Cost"] + 1}}, 
        function() {
            this.updateCookiesCPS(); 
            this.reduceCookiesAmount(this.state[producer + "Cost"]);
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalTim);
        clearInterval(this.intervalCookies);
        clearInterval(this.intervalProducers);
      }

    render() {
        return (
            <div className="container">

            <ProducerList buyProducers={this.buyProducers} cookiesAmount={this.state.amount}
                        cursorAmount={this.state.cursorAmount} cursorCost={this.state.cursorCost}
                        grandmaAmount={this.state.grandmaAmount} grandmaCost={this.state.grandmaCost}
                        bakeryAmount={this.state.bakeryAmount} bakeryCost={this.state.bakeryCost}
                        mineAmount={this.state.mineAmount} mineCost={this.state.mineCost}
                        farmAmount={this.state.farmAmount} farmCost={this.state.farmCost}/>

            <ProducerInfo cursorAmount={this.state.cursorAmount} cursorCost={this.state.cursorCost}
                            grandmaAmount={this.state.grandmaAmount} grandmaCost={this.state.grandmaCost}
                            bakeryAmount={this.state.bakeryAmount} bakeryCost={this.state.bakeryCost}
                            mineAmount={this.state.mineAmount} mineCost={this.state.mineCost}
                            farmAmount={this.state.farmAmount} farmCost={this.state.farmCost}/>

            <Cookie addCookies={this.addCookies} cookiesAmount={this.state.amount} cookiesPerSecond={this.state.perSecond}/>
            
            </div>
        );

    }
}