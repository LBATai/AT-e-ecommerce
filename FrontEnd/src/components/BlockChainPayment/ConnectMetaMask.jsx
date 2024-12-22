import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ConnectMetaMask = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);

  // Kiểm tra xem MetaMask đã được cài đặt chưa
  const checkIfMetaMaskInstalled = () => {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    } else {
      alert('Please install MetaMask!');
    }
  };

  // Kết nối với MetaMask
  const connectMetaMask = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setAccount(accounts[0]);
      setConnected(true);
    } catch (err) {
      console.error('Error connecting to MetaMask', err);
    }
  };

  // Tự động kiểm tra khi component được mount
  useEffect(() => {
    checkIfMetaMaskInstalled();
  }, []);

  return (
    <div>
      {connected ? (
        <div>
          <h3>Connected Account: {account}</h3>
        </div>
      ) : (
        <button onClick={connectMetaMask}>Connect to MetaMask</button>
      )}
    </div>
  );
};

export default ConnectMetaMask;
