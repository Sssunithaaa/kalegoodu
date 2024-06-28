import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './context/ContextProvider.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { PrimeReactProvider } from "primereact/api";

// In your main entry file (e.g., index.js or App.js)
import 'primereact/resources/themes/saga-blue/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { HashRouter } from 'react-router-dom'
import HelloWorld from './HelloWorld.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <HashRouter>
    <CartProvider>
      <ContextProvider>
      <App />
    </ContextProvider>
    </CartProvider>
    </HashRouter>
  </React.StrictMode>,
)
