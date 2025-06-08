import axios from "axios";
import React from "react";
import { api, API_BASE_URL } from "../../config/api";
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGOUT,
  FIND_USER_BY_ID_SUCCESS,
  FIND_USER_BY_ID_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  CHECK_EMAIL_EXISTED_SUCCESS,
  CHECK_EMAIL_EXISTED_FAILURE,
  SEND_EMAIL_VERIFICATION_SUCCESS,
  SEND_EMAIL_VERIFICATION_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./Actiontype";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    if (data.jwt) {
      console.log("login user", data.jwt);
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      console.log("signup user");
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};

export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/users/${userId}`);
    console.log("find user by id: ", data);
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
    throw error;
  }
};

export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`, reqData);
    console.log("update user: ", data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

export const followUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`);
    console.log("followed user: " + data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
};
export const checkEmailExisted = (email) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/check-email`, email, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    const isEmailExisted = response.data;
    console.log("check email existed: " + isEmailExisted);
    dispatch({ type: CHECK_EMAIL_EXISTED_SUCCESS, payload: isEmailExisted });
  } catch (error) {
    console.log("error " + error);
    dispatch({ type: CHECK_EMAIL_EXISTED_FAILURE, payload: error });
  }
};
export const sendVerificationCode = (email) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/sendVerificationCode`,
      email,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    dispatch({ type: SEND_EMAIL_VERIFICATION_SUCCESS, payload: data });
  } catch (error) {
    console.log("error: " + error);
    dispatch({ type: SEND_EMAIL_VERIFICATION_FAILURE, payload: error });
  }
};
export const changePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });

    const { data } = await api.put("api/users/password", passwordData);

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    console.error("Error changing password:", error);

    dispatch({
      type: CHANGE_PASSWORD_FAILURE,
      payload: error.response?.data?.message || "Password change failed",
    });

    throw error;
  }
};
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({type: FORGOT_PASSWORD_REQUEST});
    const { data } = await axios.post(`${API_BASE_URL}/auth/sendNewPassword?email=${email}`);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
  }
};
export const getUser = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/users/${userId}`);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};
