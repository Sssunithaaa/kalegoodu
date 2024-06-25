import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './context/ContextProvider.jsx'

import { PrimeReactProvider } from "primereact/api";

// In your main entry file (e.g., index.js or App.js)
import 'primereact/resources/themes/saga-blue/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <HashRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
    </HashRouter>
  </React.StrictMode>,
)
