import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import './index.css'

import { ChakraProvider } from '@chakra-ui/react';

import { store } from './store';
import { Provider as ReduxProvider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>
)
