import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from 'react-icons/fa';
import './TripModal.css';

const TripModal = ({ isOpen, onClose, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [preferences, setPreferences] = useState({
    people: 1,
    region: '',
    purpose: '',
    startDate: null,
    endDate: null
  });

  const regions = [
    '서울/경기',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주도'
  ];

  const purposes = ['힐링', '관광', '액티비티', '맛집투어'];

  const validateStep = () => {
    switch (step) {
      case 1:
        if (preferences.people < 1) {
          setError('인원수를 선택해주세요.');
          return false;
        }
        break;
      case 2:
        if (!preferences.region) {
          setError('지역을 선택해주세요.');
          return false;
        }
        break;
      case 3:
        if (!preferences.purpose) {
          setError('여행 목적을 선택해주세요.');
          return false;
        }
        break;
      case 4:
        if (!preferences.startDate || !preferences.endDate) {
          setError('여행 기간을 선택해주세요.');
          return false;
        }
        if (preferences.startDate > preferences.endDate) {
          setError('종료일이 시작일보다 빠를 수 없습니다.');
          return false;
        }
        break;
      default:
        break;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        handleConfirm();
      }
    }
  };

  const handlePrevious = () => {
    setError('');
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    if (validateStep()) {
      onConfirm(preferences);  // MainPage로 preferences 전달
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className='modal-title'>여행 선호도 설정 ({step}/4)</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          
          {step === 1 && (
            <div className="step-content">
              <h3 className="step-question">인원수를 입력해주십시오</h3>
              <select 
                value={preferences.people}
                onChange={(e) => {
                  setError('');
                  setPreferences({...preferences, people: parseInt(e.target.value)})
                }}
              >
                {[1,2,3,4,5,6,7].map(num => (
                  <option key={num} value={num}>{num}명</option>
                ))}
              </select>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3 className="step-question">선호하는 지역을 선택해주십시오</h3>
              <select
                value={preferences.region}
                onChange={(e) => setPreferences({...preferences, region: e.target.value})}
              >
                <option value="">지역 선택</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h3 className="step-question">여행 목적을 선택해주십시오</h3>
              <select
                value={preferences.purpose}
                onChange={(e) => setPreferences({...preferences, purpose: e.target.value})}
              >
                <option value="">목적 선택</option>
                {purposes.map(purpose => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </div>
          )}

          {step === 4 && (
            <div className="step-content">
              <h3 className="step-question">기간을 선택해주십시오</h3>
              <div className="date-picker-container">
                <div className="date-input">
                  <FaCalendar />
                  <DatePicker
                    selected={preferences.startDate}
                    onChange={(date) => setPreferences({...preferences, startDate: date})}
                    selectsStart
                    startDate={preferences.startDate}
                    endDate={preferences.endDate}
                    minDate={new Date()}
                    placeholderText="시작일"
                  />
                </div>
                <div className="date-input">
                  <FaCalendar />
                  <DatePicker
                    selected={preferences.endDate}
                    onChange={(date) => setPreferences({...preferences, endDate: date})}
                    selectsEnd
                    startDate={preferences.startDate}
                    endDate={preferences.endDate}
                    minDate={preferences.startDate || new Date()}
                    placeholderText="종료일"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step > 1 && (
            <button onClick={handlePrevious}>이전</button>
          )}
          {step < 4 ? (
            <button onClick={handleNext}>다음</button>
          ) : (
            <button onClick={handleConfirm}>확인</button>
          )}
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default TripModal;