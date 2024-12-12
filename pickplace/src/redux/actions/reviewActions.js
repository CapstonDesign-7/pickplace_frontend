import {
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  TOGGLE_LIKE,
  SET_SELECTED_REVIEW,
  SET_FILTER,
  SET_SORT
} from '../actionTypes';

export const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review
});

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  payload: review
});

export const deleteReview = (review_no) => ({
  type: DELETE_REVIEW,
  payload: review_no
});

export const toggleLike = (review_no) => ({
  type: TOGGLE_LIKE,
  payload: review_no
});

export const setSelectedReview = (review) => ({
  type: SET_SELECTED_REVIEW,
  payload: review
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

export const setSort = (sortOrder) => ({
  type: SET_SORT,
  payload: sortOrder
});
