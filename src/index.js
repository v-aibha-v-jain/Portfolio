import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reactGA from 'react-ga4'; // IGNORE

// Initialize Google Analytics
const GA4_MEASUREMENT_ID = "G-CJ0K80M103";
reactGA.initialize(GA4_MEASUREMENT_ID);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
