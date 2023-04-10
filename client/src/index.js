import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App';
//import "./index.css";
import { Provider } from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
