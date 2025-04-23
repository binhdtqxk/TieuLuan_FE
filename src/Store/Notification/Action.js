import { api } from "../../config/api";
import { CLEAR_NOTIFICATION_INDICATOR, GET_USER_NOTIFICATION_FAILURE, GET_USER_NOTIFICATION_SUCCESS, RECEIVE_NOTIFICATION } from "./ActionType";


export const getUserNotification =() => async(dispatch) =>{
    try {
      const {data}= await api.get(`/api/notifications`)
      console.log("get user notification: ",data);
      dispatch({type:GET_USER_NOTIFICATION_SUCCESS, payload:data})
    } catch (error) {
      console.log("error", error);
      dispatch({type: GET_USER_NOTIFICATION_FAILURE, payload: error.message})
    }
  }
  export const receiveNotification = notification => ({
    type: RECEIVE_NOTIFICATION,
    payload: notification
  });
  export const clearNotificationIndicator = () => ({
    type: CLEAR_NOTIFICATION_INDICATOR
  });