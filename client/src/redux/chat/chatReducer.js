import { SEND_CHAT, SEND_FAILED, CURRENT_CHAT_ROOM, LOGOUT_USER, CLEAR_CHAT } from '../types';

const initialState = {
  messages: [],
  error: null,
  room: 'public-room',
};

const addMessageToChatRoom = (messages, message) => {
  let newMsg = [...messages];
  console.log(message);
  if (message.length > 0) {
    console.log('object2');
    message.forEach((msg) => {
      newMsg.push(msg);
    });
  } else {
    console.log('object');
    newMsg.push(message);
  }
  return newMsg;
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_CHAT_ROOM:
      return { ...state, room: action.payload, messages: [] };
    case SEND_CHAT:
      return { ...state, messages: addMessageToChatRoom(state.messages, action.payload), error: null };
    case SEND_FAILED:
      return { ...state, messages: [], error: action.payload };
    case LOGOUT_USER:
      return { ...state, messages: [], error: null, room: 'public-room' };
    case CLEAR_CHAT:
      return { ...state, messages: [], error: null };
    default:
      return state;
  }
};

export default chatReducer;
