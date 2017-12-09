import React from 'react'
import ReactDOM from 'react-dom'

//Library for running timers whila card is inactive: 
//https://github.com/turuslan/HackTimer
import "./timer.min.js"

import "normalize-css/normalize.css"
import "./styles/styles.scss"

import CookiesClicker from "./components/CookiesClicker";
import ProducerList from "./components/ProducerList";
import ProducerInfo from "./components/ProducerInfo";
import Cookie from "./components/Cookie"
import Cursor from "./components/Cursor";
import CursorInfo from "./components/CursorInfo"
import Grandma from "./components/Grandma";
import GrandmaInfo from "./components/GrandmaInfo"
import Bakery from "./components/Bakery";
import BakeryInfo from "./components/BakeryInfo"
import Mine from "./components/Mine";
import MineInfo from "./components/MineInfo"
import Farm from "./components/Farm";
import FarmInfo from "./components/FarmInfo";

ReactDOM.render(<CookiesClicker />, document.getElementById('cookies'));
