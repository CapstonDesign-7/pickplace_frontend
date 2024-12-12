// Route.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../Main/MainPage";
import Login from "../Login/LoginPage";
import Signup from "../Login/SignUp";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
        <Route path="/signup" element={<Signup />} /> {/* 회원가입 페이지 */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
