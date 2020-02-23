import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {subscribe} from './services/local-api';

import {BrowserRouter} from "react-router-dom";

function Main(props) {
  return (
    <BrowserRouter>
      <App {...props}/>
    </BrowserRouter>
  )
}

let currentData = {
  location: '',
  filePaths: [],
  projectName: 'Hizen'
}
subscribe((data = currentData) => {
  Object.assign(currentData, data);
  const logData = JSON.stringify(currentData, null, 2);
  console.log('data', logData)
  ReactDOM.render(<Main {...currentData} />, document.getElementById('root'));
});

// setTimeout(() => {
//   send('TEST test local react app');
// }, 2000);


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    function NextMain(props) {
      return (
        <BrowserRouter>
          <NextApp {...props}/>
        </BrowserRouter>
      )
    }
    ReactDOM.render(<NextMain {...currentData} />);
  })
}