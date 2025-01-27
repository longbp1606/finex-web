import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStyledBreakpointsTheme } from 'styled-breakpoints';
import GlobalStyles from './themes/globalStyles.ts';
import { store } from './store/index.ts';
import LanguageProvider from './lang/LanguageProvider.tsx';
import { ConfigProvider, App as AppAntd } from 'antd';
import { AntdThemeConfig } from './themes/index.ts';

export const breakpoints = {
  xs: '360px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
} as const;

const theme: DefaultTheme = createStyledBreakpointsTheme({
  breakpoints
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ConfigProvider theme={AntdThemeConfig}>
        <AppAntd>
          <Provider store={store}>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </Provider>
          <GlobalStyles />
        </AppAntd>
      </ConfigProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
