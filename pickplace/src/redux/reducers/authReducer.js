import { LOGIN_SUCCESS, LOGOUT } from '../actionTypes';

const initialState = {
  isLoggedIn: false,
  user: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: {
          email: action.payload.email,
          token: action.payload.token,
          name: action.payload.name,
          phone: action.payload.phone
        }
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
}