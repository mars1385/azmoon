import { GET_USER_PRIVATE_ROOMS, GET_USER_PUBLIC_ROOMS } from '../types';
import axios from 'axios';

export const addPublicRoom = ({ name }) => async (dispatch) => {
  try {
    await axios.post('/room/public/join', { name });
    dispatch(getPublicRooms());
  } catch (error) {
    console.log(error.message);
  }
};

export const createPublicRoom = ({ name }) => async (dispatch) => {
  try {
    await axios.post('/room/public', { name });
    dispatch(getPublicRooms());
  } catch (error) {
    console.log(error.message);
  }
};

export const createPrivateRoom = ({ email }) => async (dispatch) => {
  try {
    await axios.post('/room/private', { email });
    dispatch(getPrivateRooms());
  } catch (error) {
    console.log(error.message);
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
