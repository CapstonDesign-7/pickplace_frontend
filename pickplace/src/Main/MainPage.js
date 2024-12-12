// src/components/MainPage.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Review from "../Public_Component/review";
import TripModal from './TripModal';
import Trip from '../Trip/trip';
import travel_img from "../Assets/travel_img.png";
import Header from '../Public_Component/Header';
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTripPopup, setShowTripPopup] = useState(false);
  const [tripPreferences, setTripPreferences] = useState(null);
  const reviewRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartClick = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = (preferences) => {
    setTripPreferences(preferences);
    setIsModalOpen(false);
    setShowTripPopup(true);
  };

  return (
    <div>
      <Header reviewRef={reviewRef} />
      
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-center">
            <h1>
              여행계획은 PickPlace! <br /> 당신은 짐만 챙기세요
            </h1>
            <p>고민만 하던 여행계획 픽플레이스와 함께하세요</p>
            <button 
              className="cta-button" 
              onClick={handleStartClick}
            >
              시작하기
            </button>
          </div>
          <div className="hero-right">
            <img 
              src={travel_img} 
              alt="여행 사진" 
              className="travel_image"
            />
          </div>
        </div>
      </section>

      {/* 리뷰 섹션 */}
      <section className="review-section" ref={reviewRef}>
        <div className="container">
          <Review />
        </div>
      </section>

      {/* 푸터 */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 PickPlace. All rights reserved.</p>
        </div>
      </footer>

      {/* 여행 선호도 모달 */}
      <TripModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />

      {/* Trip 팝업 추가 */}
      {showTripPopup && (
        <Trip 
          preferences={tripPreferences}
          onClose={() => setShowTripPopup(false)}
        />
      )}
    </div>
  );
};

export default MainPage;
