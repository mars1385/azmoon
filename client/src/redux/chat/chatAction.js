import { SEND_CHAT, SEND_FAILED, CURRENT_CHAT_ROOM, SET_MESSAGE_INFO, CLEAR_CHAT } from '../types';

export const getMessages = (message) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_CHAT,
      payload: message,
    });
  } catch (error) {
    dispatch({
      type: SEND_FAILED,
      payload: 'error!',
    });
  }
};

export const setChatRoom = (room) => async (dispatch) => {
  try {
    dispatch({
      type: CURRENT_CHAT_ROOM,
      payload: room,
    });
  } catch (error) {
    dispatch({
      type: CURRENT_CHAT_ROOM,
      payload: 'public-room',
    });
  }
};

export const clear = () => ({
  type: CLEAR_CHAT,
});

// export const setMessageInfo = (info) => async (dispatch) => {
//   try {
//     dispatch({
//       type: SET_MESSAGE_INFO,
//       payload: info,
//     });
//   } catch (error) {
//     dispatch({
//       type: SET_MESSAGE_INFO,
//       payload: {},
//     });
//   }
// };
