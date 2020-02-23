import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {subscribe} from './services/local-api';

let currentData = {}
subscribe((data) => {
  currentData = data;
  const logData = JSON.stringify(currentData, null, 2);
  console.log('sub render', logData)
  ReactDOM.render(<App data={data} />, document.getElementById('root'));
});

// setTimeout(() => {
//   send('TEST test local react app');
// }, 2000);


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(<NextApp data={currentData} />);
  })
}