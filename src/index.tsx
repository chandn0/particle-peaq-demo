import React from 'react';
import ReactDOM from 'react-dom/client';
import { Base,ArbitrumOne,Optimism, Solana,Polygon } from '@particle-network/chains';
import { AuthCoreContextProvider,PromptSettingType } from '@particle-network/auth-core-modal';
import { AuthType } from '@particle-network/auth-core';
import App from './App';

import('buffer').then(({ Buffer }) => {
  window.Buffer = Buffer;
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthCoreContextProvider
      options={{
        projectId: "b7c71a71-997e-4765-a56a-62c7e4c0214d",
        clientKey: 'cZgJnecHZAyXRewgy3NWtMGEdgrUnxcfah6lI6qe',
        appId: '1af9f2b9-2280-433c-bef3-58cc479f9255',
        authTypes: [AuthType.email, AuthType.google, AuthType.twitter],
        themeType: 'dark',
        fiatCoin: 'USD',
        language: 'en',
        erc4337: {
          name: 'SIMPLE',
          version: '1.0.0',
        },
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
          promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
        },
        wallet: {
          visible: true,
          customStyle: {
            supportChains: [Base,ArbitrumOne,Optimism, Solana,Polygon]
          }
        }
      }}
  >
      <App />
    </AuthCoreContextProvider>
  </React.StrictMode>
)