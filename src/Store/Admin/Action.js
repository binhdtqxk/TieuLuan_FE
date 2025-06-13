import { api } from "../../config/api";
import { 
    GET_DASHBOARD_ANALYTICS_SUCCESS,
    GET_TWEET_ANALYTICS_SUCCESS,
    GET_LIKE_ANALYTICS_SUCCESS,
    GET_USER_ANALYTICS_SUCCESS,
    GET_ALL_USER_SUCCESS,
    BAN_USER_SUCCESS,
    UNBAN_USER_SUCCESS,
    GET_DASHBOARD_ANALYTICS_FAILURE,
    GET_TWEET_ANALYTICS_FAILURE,
    GET_LIKE_ANALYTICS_FAILURE,
    GET_USER_ANALYTICS_FAILURE,
    GET_ALL_USER_FAILURE,
    BAN_USER_FAILURE,
    UNBAN_USER_FAILURE,
    GET_DASHBOARD_ANALYTICS,
    GET_TWEET_ANALYTICS,
    GET_LIKE_ANALYTICS,
    GET_USER_ANALYTICS,
    GET_ALL_USER,
    BAN_USER,
    UNBAN_USER
} from "./ActionType";

export const getDashboardAnalytics = () => async (dispatch) => {
    try {
        dispatch({ type: GET_DASHBOARD_ANALYTICS });
        const { data } = await api.get("/admin/analytics/dashboard");
        dispatch({ type: GET_DASHBOARD_ANALYTICS_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching dashboard analytics:", error);
        dispatch({ type: GET_DASHBOARD_ANALYTICS_FAILURE, payload: error.message });
    }
};

export const getTweetAnalytics = () => async (dispatch) => {
    try {
        dispatch({ type: GET_TWEET_ANALYTICS });
        const { data } = await api.get("/admin/analytics/tweets");
        dispatch({ type: GET_TWEET_ANALYTICS_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching tweet analytics:", error);
        dispatch({ type: GET_TWEET_ANALYTICS_FAILURE, payload: error.message });
    }
};

export const getLikeAnalytics = () => async (dispatch) => {
    try {
        dispatch({ type: GET_LIKE_ANALYTICS });
        const { data } = await api.get("/admin/analytics/likes");
        dispatch({ type: GET_LIKE_ANALYTICS_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching like analytics:", error);
        dispatch({ type: GET_LIKE_ANALYTICS_FAILURE, payload: error.message });
    }
};

export const getUserAnalytics = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_ANALYTICS });
        const { data } = await api.get("/admin/analytics/users");
        dispatch({ type: GET_USER_ANALYTICS_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching user analytics:", error);
        dispatch({ type: GET_USER_ANALYTICS_FAILURE, payload: error.message });
    }
};

export const getAllUsers = (query = "", page = 0, size = 10) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_USER });
        let url = `/admin/users?page=${page}&size=${size}`;
        if (query) {
            url += `&query=${encodeURIComponent(query)}`;
        }
        const { data } = await api.get(url);
        console.log("users: "+data);
        dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching all users:", error);
        dispatch({ type: GET_ALL_USER_FAILURE, payload: error.message });
    }
};

export const banUser = (userId, reason) => async (dispatch) => {
    try {
        dispatch({ type: BAN_USER });
        const { data } = await api.post(`/admin/users/${userId}/ban`, { reason });
        dispatch({ type: BAN_USER_SUCCESS, payload: data });
        return data;
    } catch (error) {
        console.error("Error banning user:", error);
        dispatch({ type: BAN_USER_FAILURE, payload: error.message });
        throw error;
    }
};

export const unbanUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: UNBAN_USER });
        const { data } = await api.post(`/admin/users/${userId}/unban`);
        dispatch({ type: UNBAN_USER_SUCCESS, payload: data });
        return data;
    } catch (error) {
        console.error("Error unbanning user:", error);
        dispatch({ type: UNBAN_USER_FAILURE, payload: error.message });
        throw error;
    }
};