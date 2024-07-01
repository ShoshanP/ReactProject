
import React, { useState } from 'react';
import { useSDK } from '@metamask/sdk-react';
import './App.css'; // ייבוא קובץ הסגנונות

const App = () => {
  const [account, setAccount] = useState(null);
  const { sdk, connected } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.error('Failed to connect', err);
    }
  };

  const openOkxBrowser = () => {
    window.open('https://www.okx.com/web3', '_blank');
  };

  return (
    <div className="container">
      <button className="wallet-button connect-wallet" onClick={connect}>
        Connect Wallet
      </button>
      <button className="wallet-button okx-browser" onClick={openOkxBrowser}>
        Open in OKX Browser
      </button>
      {connected && account && <p>Connected account: {account}</p>}
    </div>
  );
};

export default App;
