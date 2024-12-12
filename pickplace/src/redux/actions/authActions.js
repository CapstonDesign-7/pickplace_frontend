import { LOGIN_SUCCESS, LOGOUT } from '../actionTypes';

export const loginSuccess = (userData) => ({
  type: 'LOGIN_SUCCESS',
  payload: {
    email: userData.email,
    token: userData.token,
    name: userData.name,
    phone: userData.phone
  }
});

export function logout() {
  return async dispatch => {
    // perform async operations
    dispatch({ type: 'LOGOUT' });
  };
}