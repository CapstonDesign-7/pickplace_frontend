import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/authActions';
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import "./Header.css";
import { Nav, Dropdown } from 'react-bootstrap';
import Logo from '../Assets/pickplace_logo.png';
import { FaUserCircle } from 'react-icons/fa';

const Header = ({ reviewRef }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
    if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/');
    }
  }, [isLoggedIn, location, navigate]);

    const handleNavigation = (path) => {
    navigate(path)
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    try {
      await dispatch(logout());
      handleNavigation("/");
      console.log('로그아웃 되었습니다.');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleScrollToReview = () => {
    reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="container">
        <img 
          src={Logo} alt="PickPlace" className="pickplace_logo"
          onClick={() => handleNavigation('/')}
        />
        <Nav className="navbar">
          {location.pathname === '/' && (
            <>
              <Nav.Link as="div" onClick={handleScrollToReview} className="header-navLink">포토 리뷰</Nav.Link>
              {!isLoggedIn && (
                <Nav.Link as={NavLink} to="/login" className="header-navLink">로그인/회원가입</Nav.Link>
              )}
            </>
          )}
          {isLoggedIn && (
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="dropdown-basic" className="header-user-icon" bsPrefix="custom-dropdown-toggle">
                <FaUserCircle size={24} />
              </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={NavLink} to="/mypage">마이페이지</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </Nav>
      </div>
    </header>
  );
};

export default Header;