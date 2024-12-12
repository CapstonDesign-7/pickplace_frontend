import React, { useState, useEffect, useRef } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import './review.css';
import { useDispatch, useSelector } from 'react-redux';
import ReviewPopup from '../Review/reviewpopup';
import { locations, convertCityToProvince } from '../utils/locationMapping';
import {
  toggleLike,
  setSelectedReview,
  setFilter,
  setSort
} from '../redux/actions/reviewActions';

function Review() {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews?.reviews || []);
  const filter = useSelector(state => state.reviews?.filter || { location: '전체', searchTerm: '' });
  const sortOrder = useSelector(state => state.reviews?.sortOrder || 'latest');
  const selectedReview = useSelector(state => state.reviews?.selectedReview);
  const isLoggedIn = useSelector(state => state.auth?.isLoggedIn);

  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef(null);
  const reviewsPerPage = 6;

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedReview]);

  const handleLike = (review_no) => {
    if (!isLoggedIn) {
      alert('로그인을 해주시기 바랍니다.');
      return;
    }
    dispatch(toggleLike(review_no));
  };

  const handleSearch = (e) => {
    dispatch(setFilter({ searchTerm: e.target.value.toLowerCase() }));
    setCurrentPage(1);
  };

  const handleLocationChange = (location) => {
    dispatch(setFilter({ location }));
    setCurrentPage(1);
  };

  const handleSortChange = (order) => {
    dispatch(setSort(order));
  };

  const handleReviewClick = (review) => {
    dispatch(setSelectedReview(review));
  };

  const handleClosePopup = () => {
    dispatch(setSelectedReview(null));
  };

  const filteredReviews = reviews
    .filter(review => {
      const reviewProvince = convertCityToProvince(review.region_title);
      return (
        (filter.location === '전체' || reviewProvince === filter.location) &&
        (review.title.toLowerCase().includes(filter.searchTerm) ||
         review.review_writing.toLowerCase().includes(filter.searchTerm))
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'latest') {
        return new Date(b.writing_date) - new Date(a.writing_date);
      } else if (sortOrder === 'popular') {
        return b.recommand_count - a.recommand_count;
      }
      return 0;
    });

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="review-container">
      <div className="search-container">
        <input
          ref={searchInputRef}
          type="text"
          className="search-input"
          placeholder="리뷰 검색..."
          onChange={handleSearch}
        />
      </div>

      <div className="review-filters">
        <ButtonGroup className="location-buttons">
          {locations.map(location => (
            <Button
              key={location}
              variant={filter.location === location ? 'primary' : 'outline-primary'}
              onClick={() => handleLocationChange(location)}
            >
              {location}
            </Button>
          ))}
        </ButtonGroup>

        <div className="sort-options">
          <ButtonGroup>
            <Button 
              variant={sortOrder === 'latest' ? 'primary' : 'outline-primary'} 
              onClick={() => handleSortChange('latest')}
            >
              최신순
            </Button>
            <Button 
              variant={sortOrder === 'popular' ? 'primary' : 'outline-primary'} 
              onClick={() => handleSortChange('popular')}
            >
              인기순
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="reviews-grid">
        {currentReviews.map(review => (
          <div key={review.review_no} className="review-card" onClick={() => handleReviewClick(review)}>
            <img 
              src={review.review_image_url}
              alt={review.title} 
              className="review-image"
            />
            <h3 className="review-title">{review.title}</h3>
            <button 
              className={`like-button ${review.liked ? 'liked' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleLike(review.review_no);
              }}
            >
              ♥ {review.recommand_count}
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredReviews.length / reviewsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {selectedReview && (
        <ReviewPopup review={selectedReview} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default Review;
