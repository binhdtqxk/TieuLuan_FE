import {
  CLEAR_NOTIFICATION_INDICATOR,
  GET_USER_NOTIFICATION_FAILURE,
  GET_USER_NOTIFICATION_REQUEST,
  GET_USER_NOTIFICATION_SUCCESS,
  RECEIVE_NOTIFICATION,
} from "./ActionType";

const initialState = {
  notificationList: [],
  loading: false,
  error: null,
  haveNoti: false,
};
export const notiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationList: action.payload,
        loading: false,
        haveNoti: state.haveNoti,
      };
    case GET_USER_NOTIFICATION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_USER_NOTIFICATION_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_NOTIFICATION:
      return {
        ...state,
        notificationList: [action.payload, ...state.notificationList],
        haveNoti: true,
        loading: false,
      };
    case CLEAR_NOTIFICATION_INDICATOR:
      return { ...state, haveNoti: false };
    default:
      return initialState;
  }
};
