import React from 'react';
import './App.css';
import { Header } from './components/header/Header.js';
import { MainView } from './components/mainView/mainView.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div id="app">
        <Router>
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              <Route path="*"
                element={<MainView />} />
            </Routes>
          </main>
          {/* <footer><div id="footer-div"></div></footer> */}
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;