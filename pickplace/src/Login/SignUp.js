import React, { useState } from 'react';
import './SignUp.css'; // CSS 파일 임포트

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    password2: '',
    name: '',
    id: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const { email, password1, password2, name, phone } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = (password1, password2) => {
    if (password1 !== password2) {
      return '비밀번호가 일치하지 않습니다.';
    }
    if (password1.length < 8 || !/[a-zA-Z]/.test(password1) || !/\d/.test(password1)) {
      return '비밀번호는 8자 이상이어야 하며, 영문자와 숫자를 포함해야 합니다.';
    }
    return '';
  };

  const onSubmit = e => {
    e.preventDefault();

    const error = validatePassword(password1, password2);
    if (error) {
      setPasswordError(error);
      return;
    }

    const user = {
      email,
      password1,
      password2,
      name,
      phone
    };

    setIsLoading(true);
    fetch('http://127.0.0.1:8000/club_account/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => {
      setIsLoading(false);
      if (res.status >= 200 && res.status < 300) {
        window.location.href = `/signup/email_confirm?email=${encodeURIComponent(email)}`;
        alert('이메일 인증을 진행해 주세요.');
      } else {
        alert('회원가입 실패');
        console.error('회원가입 실패:', res.status);
      }
    });
  };

  return (
    <div className="signup-container py-5">
      <h1 className="signup-title">회원가입</h1>
      <form onSubmit={onSubmit}>
        <div className="signup-form-group">
          <label htmlFor='email'>이메일</label>
          <input
            className="signup-form-control"
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor='password1'>패스워드</label>
          <input
            className="signup-form-control"
            type='password'
            name='password1'
            value={password1}
            onChange={onChange}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor='password2'>패스워드 재확인</label>
          <input
            className="signup-form-control"
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        {passwordError && <p className="signup-text-danger">{passwordError}</p>}
        <div className="signup-form-group">
          <label htmlFor='name'>이름</label>
          <input
            className="signup-form-control"
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
      
        
        <div className="signup-form-group">
          <label htmlFor='phone'>휴대전화</label>
          <input
            className="signup-form-control"
            type='text'
            name='phone'
            value={phone}
            onChange={onChange}
            required
          />
        </div>
        <br/>
        <button type='submit' className='signup-btn'>Signup</button>
        <br/>
        <div>
          {isLoading && (
            <div className="signup-spinner spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </form>    
      </div>
  );
};

export default SignUp;
