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

String.prototype.includes = function (str) {
  var returnValue = false;

  if (this.indexOf(str) !== -1) {
    returnValue = true;
  }

  return returnValue;
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}