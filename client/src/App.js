import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/header/Header.js';
import { MainView } from './components/mainView/mainView.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Cookies from 'js-cookie';
import {
  setAuthenticated, setUser, selectUserId
} from './features/loginSlice';
import { useQuery } from '@tanstack/react-query';

function App() {

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

    const onSuccess = (data) => {
      console.log("in success");
      console.log(data);
      if (data) {
        dispatch(setUser(data));
        dispatch(setAuthenticated(true));
      }
    }

    const {
        data,
        status,
        refetch
    } = useQuery(["user"], async () => {
      const response = await axios({
        method: "GET",
        withCredentials: true,
        url: "/user"
      });
      console.log("in app user query");
      console.log(response.data);
        return response.data
    },
        {
            onSuccess,
        }
    );

  useEffect(()=>{
    refetch();
    console.log(userId);
  });



  return (
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
  );
}

export default App;