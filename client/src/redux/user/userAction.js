import { SET_USER_INFO, AUTH_FAILED, LOGOUT_USER, CLEAR_ERROR } from '../types';
import axios from 'axios';
import setAuthHeader from '../../utils/setAuthHeader';

export const registerUser = (userInfo) => async (dispatch) => {
  try {
    const registerResponse = await axios.post('/user/register', userInfo);
    const { token } = registerResponse.data;

    localStorage.setItem('jwt_token', token);
    setAuthHeader(token);
    dispatch(getUserInfo());
  } catch (error) {
    dispatch({
      type: AUTH_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const loginUser = (userInfo) => async (dispatch) => {
  try {
    const login = await axios.post('/user/login', userInfo);
    const { token } = login.data;

    localStorage.setItem('jwt_token', token);
    setAuthHeader(token);
    dispatch(getUserInfo());
  } catch (error) {
    dispatch({
      type: AUTH_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    // await axios.post('/user/logout');
    localStorage.removeItem('jwt_token');
    setAuthHeader(false);
    dispatch({
      type: LOGOUT_USER,
    });
    // history.push('/login');
  } catch (error) {
    dispatch({
      type: AUTH_FAILED,
      payload: 'error logout',
    });
  }
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const userInfo = await axios.get('/user');
    dispatch({
      type: SET_USER_INFO,
      payload: userInfo.data.user,
    });
  } catch (error) {
    console.log('error');
  }
};

export const clearError = () => ({
  type: CLEAR_ERROR,
});
