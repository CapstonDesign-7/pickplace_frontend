// App.js
import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from "./Public_Component/Header"
import MainPage from './Main/MainPage';
import SignUpPage from './Login/SignUpPage';
import LoginPage from './Login/LoginPage';
import EmailConfirm from './Login/EmailConfirm';
import Mypage from './Mypage/Mypage'
import Trip from "./Trip/trip"

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/email-confirm" element={<EmailConfirm />} />
        <Route path="/mypage" element={<Mypage/>}/>
        <Route path="/trip" element={<Trip />} /> {/* 여행추천 페이지 */}
      </Routes>
    </div>
  );
};

export default App;
