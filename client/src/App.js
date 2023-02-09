import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Header } from './components/header/Header.js';
import { MainView } from './components/mainView/mainView.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import Cookies from 'js-cookie';
import {
  setAuthenticated, setUser
} from './features/loginSlice';

function App() {

  const dispatch = useDispatch();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  const authUser = async () => {
    try {
      const response = await axios.get("/user");
      console.log("in auth");
      console.log(response);
      if (response.data) {
        dispatch(setUser(response.data));
        dispatch(setAuthenticated(true));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    authUser();
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