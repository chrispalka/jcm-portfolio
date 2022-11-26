import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './assets/styles.css';
import App from './components/App';
var container = document.getElementById('app');
var root = createRoot(container);
root.render( /*#__PURE__*/React.createElement(Router, null, /*#__PURE__*/React.createElement(App, null)));