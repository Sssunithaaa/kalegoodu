import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './context/ContextProvider.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// In your main entry file (e.g., index.js or App.js)
import 'primereact/resources/themes/saga-blue/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store,persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
  <BrowserRouter>
     <QueryClientProvider client={queryClient}>
    <CartProvider>
      <ContextProvider>
   
      <ScrollToTop/>
      
     <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
     
    </ContextProvider>
    </CartProvider>
    </QueryClientProvider>
    </BrowserRouter>
        </Provider>
  </React.StrictMode>,
)
