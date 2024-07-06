import { LiFiWidget, WidgetConfig } from '@lifi/widget';

const widgetConfig: WidgetConfig = {
    variant: 'wide',
    chains: {
        allow: [8453],
      },
    theme: {
        container: {
            border: '1px solid rgb(234, 234, 234)',
            borderRadius: '16px',
        },
    },
    integrator: 'Your dApp/company name'
};

export const WidgetPage = () => {
  return (
    <LiFiWidget integrator="Your dApp/company name" config={widgetConfig} />
  );
};