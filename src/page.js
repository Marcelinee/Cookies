import React from 'react';
import ReactDOM from 'react-dom';
import './scripts/timer.min.js';
import './scripts/cookies.js';

import "normalize-css/normalize.css"
import "./styles/styles.scss";

import CookiesClicker from "./components/CookiesClicker";


ReactDOM.render(<CookiesClicker />, document.getElementById('cookieclicker'))