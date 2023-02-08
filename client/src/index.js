import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App';
//import "./index.css";
import { Provider } from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
