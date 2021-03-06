import React from 'react';
import ReactDOM from 'react-dom';
import './scripts/timer.min.js';
import './scripts/cookies.js';

import "normalize-css/normalize.css"
import "./styles/styles.scss";

import CookiesClicker from "./components/CookiesClicker";

function run() {
    ReactDOM.render(<CookiesClicker />, document.getElementById('cookieclicker'))
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.indexOf(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}