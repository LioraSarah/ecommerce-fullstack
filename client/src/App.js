import React, { useEffect, useMemo } from 'react';
import './App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/header/Header.js';
import { MainView } from './components/mainView/mainView.js';
import { Route, Routes, useLocation } from "react-router-dom";
import {
  setAuthenticated, setUser, selectUserId
} from './features/loginSlice';
import { useQuery } from '@tanstack/react-query';

function App() {

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

    const onSuccess = (data) => { //for useQuery
      if (data) {
        dispatch(setUser(data)); //set user info in redux state
        dispatch(setAuthenticated(true));
      }
    }

    //getting the logged in user info from db
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
        return response.data
    },
        {
            onSuccess,
        }
    );

  //refetch the logged in user info at the beggining of every render
  useEffect(()=>{
    refetch();
    console.log(userId);
  });

  let location = useLocation();
  const bottomUl = useMemo(() => document.getElementById("bottomUl"), []);

  console.log("location");
  console.log(location);
  console.log("button menu");
  console.log(bottomUl);

  // useEffect(() => {
  //   bottomUl.classList.remove('active');
  // }, [location, bottomUl]);

  return (
      <div id="app">
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
      </div>
  );
}

export default App;