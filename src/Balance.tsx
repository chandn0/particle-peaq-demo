import React, { useState, useEffect } from 'react';
import { Base } from '@particle-network/chains';
import { AAWrapProvider, SmartAccount } from '@particle-network/aa';
import { useEthereum, useConnect, useAuthCore,useSolana } from '@particle-network/auth-core-modal';
import { ethers } from 'ethers';
import { notification } from 'antd';
interface Asset {
  asset: {
    name: string;
    symbol: string;
    id: number;
    contracts: string[];
    logo: string;
  };
  price: number;
  estimated_balance: number;
  token_balance: number;
  cross_chain_balances: {
    [key: string]: {
      address: string;
      balance: number;
      balanceRaw: string;
      chainId: number;
    };
  };
}

const Balance: React.FC = () => {
  const { userInfo } = useAuthCore();
  const [balance, setBalance] = useState("...");
  const { connect, disconnect, connectionStatus } = useConnect();
  const { address, chainId, provider, sendTransaction, signMessage, signTypedData } = useEthereum();
  const { address: solanaAddress, signAndSendTransaction } = useSolana();
  const smartAccount = new SmartAccount(provider, {
    projectId: import.meta.env.PROJECT_KEY,
    clientKey: import.meta.env.CLIENT_KEY,
    appId: import.meta.env.APP_KEY,
    aaOptions: {
      accountContracts: {
        SIMPLE: [{ chainIds: [Base.id], version: '1.0.0' }],
      }
    }
  });



  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo]);

  const fetchBalance = async () => {
    setLoading(true);
    const address = await smartAccount.getAddress();
    try {
      const response = await fetch(`https://api.mobula.io/api/1/wallet/portfolio?wallet=${address}`, {
        method: 'GET',
        headers: {
          'Authorization': '099da978-4158-40ea-a872-9461054343b8',
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      // Assuming the result has a similar structure as the previous example
      if (result.data && result.data.assets) {
        const filteredAssets = result.data.assets.filter((asset: Asset) => (asset.estimated_balance) >= 0.2);
        setAssets(filteredAssets);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      {assets.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Balance in USD</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={index}>
                <td>
                  <img src={asset.asset.logo} alt={asset.asset.name} width="20" height="20" />
                  {asset.asset.name}
                </td>
                <td>{(asset.token_balance).toFixed(2)}</td>
                <td>{(asset.price).toFixed(2)}</td>
                <td>{(asset.estimated_balance).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Balance;
