import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RouterConfig from './routes/routerConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);
