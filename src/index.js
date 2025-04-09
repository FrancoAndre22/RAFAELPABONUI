import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { FlightProvider } from './context/FlightContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FlightProvider>
      <App />
    </FlightProvider>
  </React.StrictMode>
);