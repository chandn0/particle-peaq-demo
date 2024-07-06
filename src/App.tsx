import React, { useState, useEffect } from 'react';
import { Base } from '@particle-network/chains';
import { AAWrapProvider, SmartAccount } from '@particle-network/aa';
import { useEthereum, useConnect, useAuthCore,useSolana } from '@particle-network/auth-core-modal';
import { ethers } from 'ethers';
import { notification } from 'antd';
import {WidgetPage} from "./swap";

import './App.css';

const App = () => {

  const { userInfo } = useAuthCore();

  const [balance, setBalance] = useState("...");
  const { connect, disconnect, connectionStatus } = useConnect();
  const { address, chainId, provider, sendTransaction, signMessage, signTypedData } = useEthereum();
  const { address: solanaAddress, signAndSendTransaction } = useSolana();
  const smartAccount = new SmartAccount(provider, {
    projectId: "d62710ee-82d2-4399-81c5-a057d0424004",
    clientKey: 'cZgJnecHZAyXRewgy3NWtMGEdgrUnxcfah6lI6qe',
    appId: '1af9f2b9-2280-433c-bef3-58cc479f9255',
    aaOptions: {
      accountContracts: {
        SIMPLE: [{ chainIds: [Base.id], version: '1.0.0' }],
      }
    }
  });

  const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount), "any");

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo]);

  const fetchBalance = async () => {
    const address = await smartAccount.getAddress();
    const balanceResponse = await customProvider.getBalance(address);
    setBalance(ethers.utils.formatEther(balanceResponse));
  };


  const handleLogin = async () => {
    if (!userInfo) {
      await connect({
        chain: Base
      });
    }
  };
    const handleConnect = async () => {
        try {
            await connect();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="App">
<main >
                {connectionStatus !== 'connected' && (
                    <>
                        <button  onClick={handleConnect}>
                            {connectionStatus === 'disconnected' ? 'CONNECT' : connectionStatus.toUpperCase()}
                        </button>
                    </>
                )}

                {connectionStatus === 'connected' && (
                    <>
                        <button onClick={handleDisconnect}>
                            DISCONNECT
                        </button>
                    </>
                )}
<address/>
            </main>
                {!userInfo ? ( <h4>Add ETH</h4>) :(<small>{balance} ETH</small>)
    }
    {/* <WidgetPage/> */}
      </div> 
  );
};

export default App;
