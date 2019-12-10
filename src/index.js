// React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// CSS and SCSS imported
import './common/stylesheets/base.scss';
import './App.scss';

// common libraries
import './common/libraries/polyfill.js';
import './common/libraries/rem.js';
import './common/libraries/bounce-disabled';


// App Element
import App from './App.jsx';


// ReactDOM render
ReactDOM.render(<App/>, document.querySelector("#root"));
