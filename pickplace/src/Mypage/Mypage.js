import React, { useState, useEffect } from 'react';
import './Mypage.css';
import profile from '../Assets/profile.jpg';
import AddReviewPopup from '../Review/addreviewpopup';
import { useDispatch, useSelector } from 'react-redux';
import {
  addReview,
  updateReview,
  deleteReview,
  setSelectedReview
} from '../redux/actions/reviewActions';
import ReviewPopup from '../Review/reviewpopup';
import ProfileManagePopup from './ProfileManagePopup';

const Mypage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('schedule');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([
    { id: 1, name: '춘천', date: '2023-10-01' },
    { id: 2, name: '서울', date: '2023-10-05' },
  ]);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isEditReviewPopupOpen, setIsEditReviewPopupOpen] = useState(false);
  const [isViewReviewPopupOpen, setIsViewReviewPopupOpen] = useState(false);

  // Redux state 가져오기
  const reviews = useSelector(state => state.reviews?.reviews || []);
  const selectedReview = useSelector(state => state.reviews?.selectedReview);
  const userEmail = useSelector(state => state.auth?.user?.email);

  // 현재 사용자의 리뷰만 필터링
  const userReviews = reviews.filter(review => review.user_no === userEmail);

  // 컴포넌트 언마운트 시 모든 팝업 상태와 선택된 항목들 초기화
  useEffect(() => {
    return () => {
      setIsReviewPopupOpen(false);
      setIsEditReviewPopupOpen(false);
      setIsViewReviewPopupOpen(false);
      setSelectedSchedule(null);
      dispatch(setSelectedReview(null));
    };
  }, [dispatch]);

  const handleAddReview = (reviewData) => {
    dispatch(addReview({
      ...reviewData,
      user_no: userEmail,
      writing_date: new Date().toISOString().split('T')[0]
    }));
    setIsReviewPopupOpen(false);
  };

  const handleEditSchedule = () => {
    if (selectedSchedule) {
      // 일정 수정 로직
      console.log('일정 수정:', selectedSchedule);
    }
  };

  const handleDeleteSchedule = () => {
    if (selectedSchedule) {
      setSchedules(schedules.filter(schedule => schedule.id !== selectedSchedule.id));
      setSelectedSchedule(null);
    }
  };

  const handleEditReview = () => {
    if (selectedReview) {
      setIsEditReviewPopupOpen(true);
    }
  };

  const handleDeleteReview = () => {
    if (selectedReview) {
      dispatch(deleteReview(selectedReview.review_no));
      dispatch(setSelectedReview(null));
    }
  };

  const handleUpdateReview = (updatedReview) => {
    dispatch(updateReview({
      review_no: selectedReview.review_no,
      ...updatedReview
    }));
    dispatch(setSelectedReview(null));
    setIsEditReviewPopupOpen(false);
  };

  const toggleScheduleSelection = (schedule) => {
    if (selectedSchedule?.id === schedule.id) {
      setSelectedSchedule(null);
    } else {
      setSelectedSchedule(schedule);
    }
  };

  const toggleReviewSelection = (review) => {
    if (selectedReview?.review_no === review.review_no) {
      dispatch(setSelectedReview(null));
    } else {
      dispatch(setSelectedReview(review));
    }
  };

  const handleViewReview = () => {
    if (selectedReview) {
      setIsViewReviewPopupOpen(true);
    }
  };

  return (
    <div className="mypage-container">
      <div className="profile-section">
        <div className="profile-background"></div>
        <div className="profile-image">
          <img src={profile} alt="Profile" />
        </div>
        <h2 className="user-id">{userEmail}</h2>
        <button 
          className="profile-manage-button"
          onClick={() => setIsProfileModalOpen(true)}
        >
          프로필 관리
        </button>
      </div>

      <div className="content-container">
        <div className="navigation-tabs">
          <button 
            className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            나의 일정
          </button>
          <button 
            className={`tab-button ${activeTab === 'review' ? 'active' : ''}`}
            onClick={() => setActiveTab('review')}
          >
            나의 리뷰
          </button>
        </div>

        <div className="content-section">
          {activeTab === 'schedule' ? (
            <div className="schedule-list-container">
              {schedules.map(schedule => (
                <div 
                  key={schedule.id} 
                  className={`schedule-list-item ${selectedSchedule?.id === schedule.id ? 'selected' : ''}`}
                  onClick={() => toggleScheduleSelection(schedule)}
                >
                  <h4>{schedule.name}</h4>
                  <p>{schedule.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="review-list-container">
              {userReviews.map(review => (
                <div 
                  key={review.review_no} 
                  className={`review-list-item ${selectedReview?.review_no === review.review_no ? 'selected' : ''}`}
                  onClick={() => toggleReviewSelection(review)}
                >
                  <h4>{review.title}</h4>
                  <p>{review.writing_date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="action-buttons">
        {activeTab === 'schedule' ? (
          <>
            <button onClick={handleEditSchedule}>일정 수정</button>
            <button onClick={handleDeleteSchedule}>일정 삭제</button>
            <button onClick={() => setIsReviewPopupOpen(true)}>리뷰 쓰기</button>
          </>
        ) : (
          <>
            <button onClick={handleViewReview}>리뷰 확인</button>
            <button onClick={handleEditReview}>리뷰 수정</button>
            <button onClick={handleDeleteReview}>리뷰 삭제</button>
          </>
        )}
      </div>

      {isReviewPopupOpen && (
        <AddReviewPopup
          schedule={selectedSchedule}
          onClose={() => setIsReviewPopupOpen(false)}
          onSubmit={handleAddReview}
        />
      )}

      {isEditReviewPopupOpen && selectedReview && (
        <AddReviewPopup
          review={selectedReview}
          onClose={() => setIsEditReviewPopupOpen(false)}
          onSubmit={handleUpdateReview}
          isEdit={true}
        />
      )}

      {isViewReviewPopupOpen && selectedReview && (
        <ReviewPopup
          review={selectedReview}
          onClose={() => setIsViewReviewPopupOpen(false)}
        />
      )}

      {isProfileModalOpen && (
        <ProfileManagePopup
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Mypage;
