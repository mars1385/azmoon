import { GET_USER_PRIVATE_ROOMS, GET_USER_PUBLIC_ROOMS, ROOM_ERROR } from '../types';
import axios from 'axios';

export const addPublicRoom = ({ name }) => async (dispatch) => {
  try {
    await axios.post('/room/public/join', { name });
    dispatch(getPublicRooms());
  } catch (error) {
    dispatch({
      type: ROOM_ERROR,
      payload: error.response.data.errors,
    });
  }
};

export const createPublicRoom = ({ name }) => async (dispatch) => {
  try {
    await axios.post('/room/public', { name });
    dispatch(getPublicRooms());
  } catch (error) {
    dispatch({
      type: ROOM_ERROR,
      payload: error.response.data.errors,
    });
  }
};

export const createPrivateRoom = ({ email }) => async (dispatch) => {
  try {
    await axios.post('/room/private', { email });
    dispatch(getPrivateRooms());
  } catch (error) {
    dispatch({
      type: ROOM_ERROR,
      payload: error.response.data.errors,
    });
  }
};

export const getPublicRooms = () => async (dispatch) => {
  try {
    const rooms = await axios.get('/room/public');
    dispatch({
      type: GET_USER_PUBLIC_ROOMS,
      payload: rooms.data.yourPublicRooms,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PUBLIC_ROOMS,
      payload: null,
    });
  }
};

export const getPrivateRooms = () => async (dispatch) => {
  try {
    const rooms = await axios.get('/room/private');
    dispatch({
      type: GET_USER_PRIVATE_ROOMS,
      payload: rooms.data.privateRoom,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PRIVATE_ROOMS,
      payload: null,
    });
  }
};
