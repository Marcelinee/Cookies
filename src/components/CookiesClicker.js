import React from 'react'

import ProducerList from "./ProducerList";
import ProducerInfo from "./ProducerInfo";
import Cookie from "./Cookie"
import Cursor from "./Cursor";
import CursorInfo from "./CursorInfo"
import Grandma from "./Grandma";
import GrandmaInfo from "./GrandmaInfo"
import Factory from "./Factory";
import FactoryInfo from "./FactoryInfo"
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
        this.updateProducersCost = this.updateProducersCost.bind(this);
        this.state = {
                amount: 0,
                perSecond : 0, 
                cursorAmount: 0,
                cursorCost: 0,
                grandmaAmount: 0,
                grandmaCost: 0,
                factoryAmount: 0,
                factoryCost: 0,
                mineAmount: 0,
                mineCost: 0,
                farmAmount: 0,
                farmCost: 0
            };
    }

    //Restore cookies amount and producers values
    componentDidMount() {
        var that = this; 
        var cookiesRestore, producersRestore;

        setTimeout(function() {
            restoreCookiesDatabase(function(cookies) {
                cookiesRestore = cookies;
                that.setState({amount: cookiesRestore.amount});
            })
        }, 50);
    
        setTimeout(function() {
            restoreProducersDatabase(function(producers) {
            producersRestore = producers;
                that.setState({cursorAmount: producersRestore.cursorAmount,
                            grandmaAmount: producersRestore.grandmaAmount,
                            factoryAmount: producersRestore.factoryAmount,
                            mineAmount: producersRestore.mineAmount,
                            farmAmount: producersRestore.farmAmount});
                that.updateCookiesCPS(); that.updateProducersCost();
            });

        }, 100);
        //Update database (cookies and producers)    
        this.intervalTim = (setInterval(() => this.setState((prevState) =>  {return {amount: (prevState.amount + (this.state.perSecond/10))}}), 100));                                               
        this.intervalCookies = setInterval(() => updateCookiesDatabase("cookies", this.state.amount), 2000);
        }

    //Update cookies per second   
    updateCookiesCPS() {
        this.setState(() => {return {perSecond: (this.state.cursorAmount * cnt.cpsMultiplier.cursor + this.state.grandmaAmount * cnt.cpsMultiplier.grandma
                                                + this.state.factoryAmount * cnt.cpsMultiplier.factory  + this.state.mineAmount * cnt.cpsMultiplier.mine 
                                                + this.state.farmAmount * cnt.cpsMultiplier.farm)}});
    }

    //Update costs for all producers
    updateProducersCost() { 
        this.setState(() =>  {console.log(this.state); return { 
        cursorCost: Math.round(Math.exp(this.state.cursorAmount) * cnt.costMultiplier.cursor),
        grandmaCost: Math.round(Math.exp(this.state.grandmaAmount) * cnt.costMultiplier.grandma),
        factoryCost: Math.round(Math.exp(this.state.factoryAmount) * cnt.costMultiplier.factory),
        mineCost: Math.round(Math.exp(this.state.mineAmount) * cnt.costMultiplier.mine),
        farmCost: Math.round(Math.exp(this.state.farmAmount) * cnt.costMultiplier.farm)}})
    }

    //Cookie click cookie adder
    addCookies() {
        this.setState((prevState) => {return {amount: prevState.amount + 1}});
    }
    
    //Buy producer -> update amount & cost -> update CPS -> update database
    buyProducers(producer) {
        this.setState((prevState) => {return {[producer + "Amount"]: prevState[producer + "Amount"] + 1, 
                                     amount: prevState.amount - prevState[producer + "Cost"], 
                                     [producer + "Cost"]: Math.round(Math.exp(prevState[producer + "Amount"] + 1) * cnt.costMultiplier[producer])};},
            function() {
                this.updateCookiesCPS(); 
                updateProducersDatabase("producers", this.state.cursorAmount, this.state.grandmaAmount, this.state.factoryAmount, this.state.mineAmount, 
                this.state.farmAmount); 
            }
        );
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
                          factoryAmount={this.state.factoryAmount} factoryCost={this.state.factoryCost}
                          mineAmount={this.state.mineAmount} mineCost={this.state.mineCost}
                          farmAmount={this.state.farmAmount} farmCost={this.state.farmCost}/>

            <ProducerInfo cursorAmount={this.state.cursorAmount} cursorCost={this.state.cursorCost}
                          grandmaAmount={this.state.grandmaAmount} grandmaCost={this.state.grandmaCost}
                          factoryAmount={this.state.factoryAmount} factoryCost={this.state.factoryCost}
                          mineAmount={this.state.mineAmount} mineCost={this.state.mineCost}
                          farmAmount={this.state.farmAmount} farmCost={this.state.farmCost}/>

            <Cookie addCookies={this.addCookies} cookiesAmount={this.state.amount} cookiesPerSecond={this.state.perSecond}/>
            
            </div>
        );

    }
}