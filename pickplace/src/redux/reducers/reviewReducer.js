import {
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  TOGGLE_LIKE,
  SET_SELECTED_REVIEW,
  SET_FILTER,
  SET_SORT
} from '../actionTypes';

const initialState = {
  reviews: [
    {
      review_no: 1,
      title: '맛있는 레스토랑',
      review_image_url: 'https://via.placeholder.com/300x200',
      recommand_count: 10,
      liked: false,
      region_title: '서울',
      writing_date: '2023-10-01',
      review_writing: '정말 맛있어요!',
      user_no: 'user1'
    }
  ],
  selectedReview: null,
  filter: {
    location: '전체',
    searchTerm: ''
  },
  sortOrder: 'latest'
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      const newReview = {
        review_no: state.reviews.length + 1,
        title: action.payload.title,
        review_writing: action.payload.review_writing,
        region_title: action.payload.region_title,
        review_image_url: action.payload.review_image ? URL.createObjectURL(action.payload.review_image) : null,
        recommand_count: 0,
        liked: false,
        user_no: action.payload.user_no,
        writing_date: action.payload.writing_date
      };

      return {
        ...state,
        reviews: [...state.reviews, newReview]
      };

    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.review_no === action.payload.review_no
            ? {
                ...review,
                title: action.payload.title,
                review_writing: action.payload.review_writing,
                review_image_url: action.payload.review_image 
                  ? URL.createObjectURL(action.payload.review_image) 
                  : action.payload.review_image_url
              }
            : review
        ),
        selectedReview: null
      };

    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review.review_no !== action.payload),
        selectedReview: null
      };

    case TOGGLE_LIKE:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review.review_no === action.payload
            ? {
                ...review,
                liked: !review.liked,
                recommand_count: review.liked ? review.recommand_count - 1 : review.recommand_count + 1
              }
            : review
        )
      };

    case SET_SELECTED_REVIEW:
      return {
        ...state,
        selectedReview: action.payload
      };

    case SET_FILTER:
      return {
        ...state,
        filter: { ...state.filter, ...action.payload }
      };

    case SET_SORT:
      return {
        ...state,
        sortOrder: action.payload
      };

    default:
      return state;
  }
};

export default reviewReducer;
