import {
  GET_USER_PRIVATE_ROOMS,
  GET_USER_PUBLIC_ROOMS,
  LOGOUT_USER,
  ROOM_ERROR,
  CLEAR_ERROR,
} from '../types';

const initialState = {
  privateRooms: [],
  publicRooms: [],
  error: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PRIVATE_ROOMS:
      return { ...state, privateRooms: action.payload };
    case GET_USER_PUBLIC_ROOMS:
      return { ...state, publicRooms: action.payload };
    case LOGOUT_USER:
      return { ...state, privateRooms: [], publicRooms: [], error: null };
    case ROOM_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default roomReducer;
