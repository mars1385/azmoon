import { SET_USER_INFO, AUTH_FAILED, LOGOUT_USER, CLEAR_ERROR } from '../types';

const initialState = {
  currentUser: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, currentUser: action.payload, error: null };
    case AUTH_FAILED:
      return { ...state, currentUser: null, error: action.payload };
    case LOGOUT_USER:
      return { ...state, currentUser: null, error: null };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default userReducer;
