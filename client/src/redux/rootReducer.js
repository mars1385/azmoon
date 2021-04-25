//import
import { combineReducers } from 'redux';

//reducers
import userReducer from './user/userReducer';
import chatReducer from './chat/chatReducer';
import roomReducer from './room/roomReducer';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  room: roomReducer,
});

export default rootReducer;
