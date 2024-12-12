import React, { useState } from 'react';
import './addreviewpopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { convertCityToProvince } from '../utils/locationMapping';

function AddReviewPopup({ schedule, review, onClose, onSubmit, isEdit }) {
  const [reviewData, setReviewData] = useState({
    review_no: isEdit ? review?.review_no : null,
    title: isEdit ? review?.title : '',
    region_title: isEdit ? review?.region_title : schedule?.name || '',
    review_writing: isEdit ? review?.review_writing : '',
    review_image: null,
    review_image_url: isEdit ? review?.review_image_url : null,
    writing_date: isEdit ? review?.writing_date : new Date().toISOString().split('T')[0],
    user_no: isEdit ? review?.user_no : null
  });

  const [previewImage, setPreviewImage] = useState(isEdit ? review?.review_image_url : null);

  if (!schedule && !isEdit) {
    alert('일정을 선택해주세요.');
    onClose();
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReviewData({ ...reviewData, review_image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reviewData);
    onClose();
  };

  return (
    <div className="add-review-popup-overlay">
      <div className="add-review-popup">
        <div className="add-review-header">
          <div className="add-review-user-info">
            <span className="add-review-user-icon">👤</span>
            <div>
              <span className="add-review-title">{isEdit ? '리뷰 수정' : '리뷰 작성'}</span>
              <span className="add-review-location-info">{reviewData.region_title}</span>
            </div>
          </div>
          <button className="add-review-close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-review-form">
          <div className="add-review-content">
            <div className="add-review-image-section">
              <label className="add-review-image-label">
                {previewImage ? (
                  <>
                    <img src={previewImage} alt="Preview" className="add-review-image"/>
                    <div className="add-review-details">
                      <span className="add-review-date">{reviewData.writing_date}</span>
                    </div>
                  </>
                ) : (
                  <div className="add-review-upload-placeholder">
                    <span>클릭하여 이미지 업로드</span>
                    <span className="add-review-upload-icon">📸</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="add-review-image-input"
                  required={!isEdit || !reviewData.review_image_url}
                />
              </label>
            </div>

            <div className="add-review-right">
              <div className="add-review-form-group">
                <input 
                  type="text" 
                  value={reviewData.title}
                  onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                  placeholder="리뷰 제목을 입력하세요..."
                  required
                  className="add-review-title-input"
                />
                <textarea
                  value={reviewData.review_writing}
                  onChange={(e) => setReviewData({...reviewData, review_writing: e.target.value})}
                  placeholder="여행 경험을 공유해주세요..."
                  required
                  className="add-review-message"
                />
              </div>
            </div>
          </div>
          <div className="add-review-footer">
            <button type="submit" className="add-review-submit-button">
              {isEdit ? '리뷰 수정' : '리뷰 등록'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReviewPopup;
