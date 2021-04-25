import { SET_USER_INFO, AUTH_FAILED, LOGOUT_USER, CURRENT_CHAT_ROOM } from '../types';
import axios from 'axios';

export const registerUser = (userInfo) => async (dispatch) => {
  try {
    await axios.post('/user/register', userInfo);
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
    await axios.post('/user/login', userInfo);

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
    await axios.post('/user/logout');
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
    dispatch({
      type: AUTH_FAILED,
      payload: error.response.data.errors,
    });
  }
};
