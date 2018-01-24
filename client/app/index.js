import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

import './styles/index.scss';
import './utils/responsive';

console.log('Hello pack!!');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Home';

ReactDOM.render(<App />, document.getElementById('root'));

if(module.hot) {
  module.hot.accept();
}