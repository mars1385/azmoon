import { GET_USER_PRIVATE_ROOMS, GET_USER_PUBLIC_ROOMS, LOGOUT_USER } from '../types';

const initialState = {
  privateRooms: [],
  publicRooms: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PRIVATE_ROOMS:
      return { ...state, privateRooms: action.payload };
    case GET_USER_PUBLIC_ROOMS:
      return { ...state, publicRooms: action.payload };
    case LOGOUT_USER:
      return { ...state, privateRooms: [], publicRooms: [] };
    default:
      return state;
  }
};

export default roomReducer;
