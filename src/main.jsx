import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactGA from "react-ga4";

// ВСТАВЬ СЮДА СВОЙ ID ИЗ ШАГА 1
const MEASUREMENT_ID = "G-1ZCZ661Q0C"; 

ReactGA.initialize(MEASUREMENT_ID);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)