/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';
import firebaseConfig from './database/firebaseConfig';
import { Provider } from 'react-redux';
import { store } from './features/store';
import "cropperjs/dist/cropper.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
)
