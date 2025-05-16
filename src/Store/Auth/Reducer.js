import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGOUT,
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  CHECK_EMAIL_EXISTED_SUCCESS,
  CHECK_EMAIL_EXISTED_FAILURE,
  SEND_EMAIL_VERIFICATION_SUCCESS,
  SEND_EMAIL_VERIFICATION_FAILURE,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
} from "./Actiontype";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case UPDATE_USER_SUCCESS:
    case FIND_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };
    case LOGOUT:
      return initialState;
    case LOGIN_USER_FAILURE:
    case REGISTER_USER_FAILURE:
    case GET_USER_PROFILE_FAILURE:
    case CHECK_EMAIL_EXISTED_FAILURE:
    case SEND_EMAIL_VERIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHECK_EMAIL_EXISTED_SUCCESS:
      return {
        ...state,
        loading: false,
        emailExisted: action.payload,
      };
    case SEND_EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        verificationCode: action.payload,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: {
          ...state.loading,
          changePassword: false,
        },
      };
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          changePassword: true,
        },
        error: {
          ...state.error,
          changePassword: null,
        },
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          changePassword: false,
        },
        error: {
          ...state.error,
          changePassword: action.payload,
        },
      };
    default:
      return state;
  }
};
