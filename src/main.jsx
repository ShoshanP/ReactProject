import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MetaMaskProvider } from '@metamask/sdk-react';
import './App.css'; // ייבוא קובץ הסגנונות

ReactDOM.render(
  <MetaMaskProvider>
    <App />
  </MetaMaskProvider>,
  document.getElementById('root')
);
