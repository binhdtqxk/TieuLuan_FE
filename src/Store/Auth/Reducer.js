import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  FIND_USER_BY_ID_SUCCESS,
  UPDATE_USER_SUCCESS,
  FOLLOW_USER_SUCCESS,
  LOGOUT,
  CHECK_EMAIL_EXISTED_SUCCESS,
  SEND_EMAIL_VERIFICATION_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_SUCCESS,
  LOGIN_WITH_GOOGLE_SUCCESS,
} from './Actiontype';

const initialState = {
  user: null,
  loading: {
    general: false,
    changePassword: false,
    forgotPassword: false,
  },
  error: {
    login: null,
    register: null,
    getProfile: null,
    findUser: null,
    updateProfile: null,
    followUser: null,
    checkEmail: null,
    sendVerification: null,
    changePassword: null,
    forgotPassword: null,
    getUser: null,
    loginGoogle: null,
  },
  jwt: null,
  emailExisted: null,
  verificationCode: null,
  findUser: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.errorType]: action.payload.message,
        },
        loading: {
          ...state.loading,
          general: false,
          changePassword: action.payload.errorType === 'changePassword' ? false : state.loading.changePassword,
          forgotPassword: action.payload.errorType === 'forgotPassword' ? false : state.loading.forgotPassword,
        },
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.errorType]: null,
        },
      };
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, general: true },
        error: { ...state.error, [action.type.split('_')[0].toLowerCase()]: null },
      };
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOGIN_WITH_GOOGLE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, general: false },
        error: { ...state.error, login: null, register: null, loginGoogle: null },
        jwt: action.payload,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, general: false },
        error: { ...state.error, getProfile: null },
        user: action.payload,
      };
    case FIND_USER_BY_ID_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, general: false },
        error: {
          ...state.error,
          findUser: null,
          updateProfile: null,
          followUser: null,
        },
        findUser: action.payload,
      };
    case LOGOUT:
      return initialState;
    case CHECK_EMAIL_EXISTED_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, general: false },
        error: { ...state.error, checkEmail: null },
        emailExisted: action.payload,
      };
    case SEND_EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, general: false },
        error: { ...state.error, sendVerification: null },
        verificationCode: action.payload,
      };
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, changePassword: true },
        error: { ...state.error, changePassword: null },
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, changePassword: false },
        error: { ...state.error, changePassword: null },
        user: action.payload,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, forgotPassword: true },
        error: { ...state.error, forgotPassword: null },
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, forgotPassword: false },
        error: { ...state.error, forgotPassword: null },
        user: action.payload,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, general: false },
        error: { ...state.error, getUser: null },
        user: action.payload,
      };
    default:
      return state;
  }
};