import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ChakraProvider } from "@/components/ui/provider"
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
