import axios from 'axios';
import { api, API_BASE_URL } from '../../config/api';
import { setError } from './errorActions';
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

export const loginUser = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    if (data.jwt) {
      console.log('login user', data.jwt);
      localStorage.setItem('jwt', data.jwt);
    }
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log('error', error);
    dispatch(setError(error.response?.data?.message || 'Lỗi đăng nhập', 'login'));
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
    if (data.jwt) {
      localStorage.setItem('jwt', data.jwt);
      console.log('signup user');
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log('error', error);
    dispatch(setError(error.response?.data?.message || 'Lỗi đăng ký', 'register'));
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log('error', error);
    dispatch(setError(error.response?.data?.message || 'Lỗi lấy thông tin hồ sơ', 'getProfile'));
  }
};

export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/users/${userId}`);
    console.log('find user by id: ', data);
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.log('error', error);
    dispatch(setError(error.response?.data?.message || 'Lỗi tìm người dùng', 'findUser'));
    throw error;
  }
};

export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`, reqData);
    console.log('update user: ', data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log('error', error);
    dispatch(setError(error.response?.data?.message || 'Lỗi cập nhật hồ sơ', 'updateProfile'));
  }
};

export const followUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`);
    console.log('followed user: ' + data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log('error', error);
    dispatch(setError(error.response?.data?.message || 'Lỗi theo dõi người dùng', 'followUser'));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('jwt');
  dispatch({ type: LOGOUT, payload: null });
};

export const checkEmailExisted = (email) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/check-email`, email, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    const isEmailExisted = response.data;
    console.log('check email existed: ' + isEmailExisted);
    dispatch({ type: CHECK_EMAIL_EXISTED_SUCCESS, payload: isEmailExisted });
  } catch (error) {
    console.log('error ' + error);
    dispatch(setError(error.response?.data?.message || 'Lỗi kiểm tra email', 'checkEmail'));
  }
};

export const sendVerificationCode = (email) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/sendVerificationCode`, email, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    dispatch({ type: SEND_EMAIL_VERIFICATION_SUCCESS, payload: data });
  } catch (error) {
    console.log('error: ' + error);
    dispatch(setError(error.response?.data?.message || 'Lỗi gửi mã xác thực', 'sendVerification'));
  }
};

export const changePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    const { data } = await api.put('api/users/password', passwordData);
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error('Error changing password:', error);
    dispatch(setError(error.response?.data?.message || 'Lỗi đổi mật khẩu', 'changePassword'));
    throw error;
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post(`${API_BASE_URL}/auth/sendNewPassword?email=${email}`);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    console.log('error', error);
    dispatch(setError(error.response?.data?.message || 'Lỗi gửi yêu cầu quên mật khẩu', 'forgotPassword'));
  }
};

export const getUser = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/users/${userId}`);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log('error', error);
    dispatch(setError(error.response?.data?.message || 'Lỗi lấy thông tin người dùng', 'getUser'));
  }
};

export const loginWithGoogle = (credential) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/google`, { credential });
    if (data.jwt) {
      console.log('login with google', data.jwt);
      localStorage.setItem('jwt', data.jwt);
    }
    dispatch({ type: LOGIN_WITH_GOOGLE_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log('error', error);
    dispatch(setError(error.response?.data?.message || 'Lỗi đăng nhập bằng Google', 'loginGoogle'));
  }
};