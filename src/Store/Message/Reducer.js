import { GET_CONVERSATION_MESSAGES, GET_CONVERSATIONS, SEND_MESSAGE } from "./ActionType";


const initialState = {
  conversations: [],
  conversation: [],
  loading: false,
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };
    case GET_CONVERSATION_MESSAGES:
      return {
        ...state,
        conversation: action.payload,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        conversation: [...state.conversation,action.payload]
      };
    default:
      return state;
  }
};
