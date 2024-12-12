import React, { useState } from 'react';
import './trip.css';
import tripphoto from '../Assets/trip-photo.png';
import { FaMapMarkerAlt, FaUtensils, FaCoffee, FaRunning } from 'react-icons/fa';
import { MdAttractions } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Trip({ preferences, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPlanner, setShowPlanner] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const handleSelect = () => {
    setShowPlanner(true);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToSchedule = (item) => {
    setSchedule([...schedule, item]);
  };

  const handleRemoveFromSchedule = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    alert('일정이 저장되었습니다.');
    onClose();
  };

  return (
    <div className="trip-popup-overlay">
      <div className="trip-popup">
        {!showPlanner ? (
          // 첫 번째 화면: 여행지 추천
          <>
            <div className="trip-header">
              <h2>추천 여행지</h2>
              <button className="trip-close-button" onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="Trip">
              <div className="trip-image-container">
                <img src={tripphoto} alt="Random Travel Destination" />
                <p className='trip-title'>강원도 춘천</p>
                <p className='trip-description'>"자연과 도시의 조화가 이루어진 매력적인 여행지"</p>
                <div className="trip-hashtags">
                  <span>#자연</span>
                  <span>#도시</span>
                  <span>#여행</span>
                </div>
              </div>

              <div className="trip-info-container">
                <div className="trip-weather">
                  <h3>날씨</h3>   
                  <div className="weather-details">
                    <div>월 <span>21°C</span></div>
                    <div>금 <span>19°C</span></div>
                    <div>토 <span>21°C</span></div>
                  </div>
                  <a href="https://weather.com">weather.com</a>
                </div>

                <div className="trip-info">
                  <h3>정보</h3>
                  <p>이 여행지는 한국의 강원도에 위치한 아름다운 도시입니다. 풍부한 역사와 자연경관이 특징입니다.</p>
                  <p>인구: 28.65만 (2022년 10월)</p>
                  <a href="https://ko.wikipedia.org/wiki/">더 알아보기</a>
                </div>
              </div>

              <div className="trip-buttons">
                <button className="recommend-btn">다시 추천</button>
                <button className="select-btn" onClick={handleSelect}>선택</button>
              </div>
            </div>
          </>
        ) : (
          // 두 번째 화면: 플래너
          <>
            <div className="trip-header">
              <h2>여행 플래너</h2>
              <button className="trip-close-button" onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="planner-container">
              <div className="recommendations">
                <h3 className="recommend-title">추천 장소</h3>
                <div className="category-buttons">
                  {['명소', '식당', '카페', '활동'].map((category) => (
                    <button
                      key={category}
                      className={selectedCategory === category ? 'active' : ''}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="place-list">
                  <div className="place-item" onClick={() => handleAddToSchedule({
                    name: "남이섬",
                    type: "명소",
                    time: "10:00",
                    icon: "https://via.placeholder.com/50"
                  })}>
                    <img src="https://via.placeholder.com/50" alt="남이섬" />
                    <div>
                      <h4>남이섬</h4>
                      <p>인기 관광지</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="map-container">
                <div className="google-map">
                  <p>Google Maps will be integrated here</p>
                </div>
              </div>

              <div className="schedule-container">
                <h3 className="schedule-title">나의 일정</h3>
                <div className="schedule-list">
                  {schedule.map((item, index) => (
                    <div key={index} className="schedule-item">
                      <img src={item.icon} alt={item.name} style={{ width: '30px', height: '30px' }} />
                      <span>{item.time}</span>
                      <span>{item.name}</span>
                      <span>{item.type}</span>
                      <button onClick={() => handleRemoveFromSchedule(index)}>삭제</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="planner-buttons">
                <button className="save-btn" onClick={handleSave}>저장</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Trip;
