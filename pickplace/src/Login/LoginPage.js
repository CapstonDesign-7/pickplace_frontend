// src/components/user/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

import './LoginPage.css'; // CSS 파일 임포트

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // 더미 사용자 데이터
  const dummyUser = {
    user_no: 1,
    email: 'tlswogus1205@naver.com',
    pwd: 'tlstls12',
    name: '신재현',
    phone_no: '010-6775-8209'
  };

  const goToResetPassword = () => {
    navigate('/reset-password');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // 더미 데이터와 입력한 이메일 및 비밀번호 비교
    if (email === dummyUser.email && pwd === dummyUser.pwd) {
      dispatch(loginSuccess({ 
        user_no: dummyUser.user_no,
        email: email,
        name: dummyUser.name,    
        phone_no: dummyUser.phone_no   
      }));
      localStorage.setItem('user_no', dummyUser.user_no);
      localStorage.setItem('email', email);
      localStorage.setItem('name', dummyUser.name);
      localStorage.setItem('phone_no', dummyUser.phone_no);
      navigate('/');
      alert('로그인에 성공했습니다!');
      return;
    }

    // 백엔드 로그인 요청
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pwd })
      });
      const data = await response.json();
      
      if (data.email && data.pwd) {
        dispatch(loginSuccess({ 
          user_no: data.user_no,
          email: data.email, 
          name: data.name,
          phone_no: data.phone_no
        }));
        localStorage.setItem('user_no', data.user_no);
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('phone_no', data.phone_no);
        alert('로그인에 성공했습니다!');
        navigate('/');
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error) {
      setEmail('');
      setPassword('');
      localStorage.clear();
      setErrors(true);
      dispatch(logout());
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-form">
            <h1>Login</h1>
            {loading === false && (
              <form onSubmit={onSubmit}>
                <div className="login-form-group">
                  <label htmlFor='email'>Email</label>
                  <input
                    name='email'
                    type='email'
                    className="login-form-control"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="login-form-group">
                  <label htmlFor='password'>Password</label>
                  <input
                    name='password'
                    type='password'
                    className="login-form-control"
                    placeholder="Password"
                    value={pwd}
                    required
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                {errors === true && <h2 className="text-danger">Cannot log in with provided credentials</h2>}
                <button type="submit" className="btn btn-primary">Sign In</button>
                <button type="button" className="btn btn-secondary" onClick={goToResetPassword}>Forgot Password?</button>
                <button type='button' className='btn sign-up' onClick={goToSignup}> 회원가입 </button>
              </form>
            )}
          </div>
          <div className="login-image"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
