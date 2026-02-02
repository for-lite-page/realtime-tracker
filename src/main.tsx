import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StoreProvider } from "./lib/storeProvider.tsx";
import './index.css'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StoreProvider>
          <App />
      </StoreProvider>
  </StrictMode>,
)
