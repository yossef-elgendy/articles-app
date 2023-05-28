import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { persistor } from './store'

(async () => {
  await persistor.flush(); // Await the initialization of the PersistentStorage
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})();
