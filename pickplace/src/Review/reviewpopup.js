import React from 'react';
import './reviewpopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ReviewPopup({ review, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-review-popup">
        <div className="popup-header">
          <div className="popup-user-info">
            <span className="popup-user-icon">👤</span>
            <div>
              <span className="popup-review-title">{review.title}</span>
              <span className="popup-location-info">{review.region_title}</span>
            </div>
          </div>
          <button className="popup-close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="popup-content">
          <div className="popup-image-section">
            <img src={review.review_image_url} alt={review.title} className="popup-review-image" />
            <div className="popup-review-details">
              <span className="popup-likes">♥ {review.recommand_count}</span>
              <span className="popup-date">{review.writing_date}</span>
            </div>
          </div>
          <p className="popup-review-message">{review.review_writing}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewPopup;
