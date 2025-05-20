import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
import { GET_CONVERSATION_MESSAGES, GET_CONVERSATIONS, SEND_MESSAGE } from "./ActionType";


export const getConversations = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/messages`);
    console.log("conversations: "+ data)
    dispatch({ type: GET_CONVERSATIONS, payload: data });
    return data;
  } catch (error) {
    console.log("Error fetching conversations:", error);
    throw error;
  }
};


export const sendMessage = (messageData) => async (dispatch) => {
  try {
    const { data } = await api.post(`${API_BASE_URL}/api/messages/${messageData.recipientId}`, messageData.messageRequest);
    dispatch({ type: SEND_MESSAGE, payload: data });
    return data;
  } catch (error) {
    console.log("Error sending message:", error);
    throw error;
  }
};


export const getConversationMessages = (recipientId) => async (dispatch) => {
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/messages/${recipientId}`);
    console.log("conversationMessage: "+ data);
    dispatch({ type: GET_CONVERSATION_MESSAGES, payload: data });
    return data;
  } catch (error) {
    console.log("Error fetching conversation messages:", error);
    throw error;
  }
};

