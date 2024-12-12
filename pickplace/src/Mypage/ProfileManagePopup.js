import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './ProfileManagePopup.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const ProfileManagePopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('edit');
  const userNo = useSelector(state => state.auth?.user?.user_no) || localStorage.getItem('user_no');
  const userEmail = useSelector(state => state.auth?.user?.email) || localStorage.getItem('email');
  const userName = useSelector(state => state.auth?.user?.name) || localStorage.getItem('name');
  const userPhone = useSelector(state => state.auth?.user?.phone_no) || localStorage.getItem('phone_no');
  
  const [formData, setFormData] = useState({
    user_no: userNo || '',
    email: userEmail || '',
    currentPassword: '',
    newPassword1: '',
    newPassword2: '',
    name: userName || '',
    phone_no: userPhone || ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user_no, email, currentPassword, newPassword1, newPassword2, name, phone_no } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password1, password2) => {
    if (password1 !== password2) {
      return '새 비밀번호가 일치하지 않습니다.';
    }
    if (password1.length < 8 || !/[a-zA-Z]/.test(password1) || !/\d/.test(password1)) {
      return '비밀번호는 8자 이상이어야 하며, 영문자와 숫자를 포함해야 합니다.';
    }
    return '';
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (newPassword1) {
      const error = validatePassword(newPassword1, newPassword2);
      if (error) {
        setPasswordError(error);
        return;
      }
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/club_account/change_password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_no,
          email,
          old_password: currentPassword,
          new_password1: newPassword1,
          new_password2: newPassword2
        })
      });

      if (response.ok) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        onClose();
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        const response = await fetch('', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            user_no,
            email 
          })
        });

        if (response.ok) {
          dispatch(logout());
          localStorage.clear();
          alert('회원 탈퇴가 완료되었습니다.');
          navigate('/');
        } else {
          const errorData = await response.json();
          alert(errorData.message || '회원 탈퇴에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('회원 탈퇴 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="profile-popup-overlay">
      <div className="profile-popup">
        <div className="profile-popup-header">
          <h2>프로필 관리</h2>
          <button className="profile-close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            회원정보 수정
          </button>
          <button 
            className={`profile-tab ${activeTab === 'delete' ? 'active' : ''}`}
            onClick={() => setActiveTab('delete')}
          >
            회원 탈퇴
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'edit' ? (
            <form onSubmit={handleUpdateProfile} className="edit-profile-form">
              <div className="profile-form-group">
                <label>이메일</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  disabled
                  className="profile-form-control disabled"
                />
              </div>
              <div className="profile-form-group">
                <label>현재 비밀번호</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={onChange}
                  className="profile-form-control"
                  required
                />
              </div>
              <div className="profile-form-group">
                <label>새 비밀번호</label>
                <input
                  type="password"
                  name="newPassword1"
                  value={newPassword1}
                  onChange={onChange}
                  className="profile-form-control"
                />
              </div>
              <div className="profile-form-group">
                <label>새 비밀번호 확인</label>
                <input
                  type="password"
                  name="newPassword2"
                  value={newPassword2}
                  onChange={onChange}
                  className="profile-form-control"
                />
              </div>
              {passwordError && <p className="profile-error-message">{passwordError}</p>}
              <div className="profile-form-group">
                <label>이름</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  disabled
                  className="profile-form-control disabled"
                />
              </div>
              <div className="profile-form-group">
                <label>휴대전화</label>
                <input
                  type="text"
                  name="phone_no"
                  value={phone_no}
                  disabled
                  className="profile-form-control disabled"
                />
              </div>
              <button type="submit" className="profile-update-button">
                {isLoading ? '업데이트 중...' : '프로필 수정'}
              </button>
            </form>
          ) : (
            <div className="delete-account-section">
              <h3>회원 탈퇴</h3>
              <p>정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
              <button className="delete-account-button" onClick={handleDeleteAccount}>회원 탈퇴</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagePopup;