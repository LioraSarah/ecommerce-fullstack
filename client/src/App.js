import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/header/Header.js';
import { MainView } from './components/mainView/mainView.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import Cookies from 'js-cookie';
import {
  setAuthenticated, setUser, selectUserId
} from './features/loginSlice';

function App() {

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  const authUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        withCredentials: true,
        url: "/user"
      });
      if (response.data) {
        console.log("ji");
        console.log(response.data);
        dispatch(setUser(response.data));
        dispatch(setAuthenticated(true));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    authUser();
    console.log(userId);
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