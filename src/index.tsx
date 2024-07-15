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
        projectId: import.meta.env.VITE_PROJECT_KEY,
        clientKey: import.meta.env.VITE_CLIENT_KEY,
        appId: import.meta.env.VITE_APP_KEY,
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