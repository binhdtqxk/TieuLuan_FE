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

const initialState = {
    dashboard: null,
    tweetAnalytics: null,
    likeAnalytics: null,
    userAnalytics: null,
    users: [],
    loading: {
        dashboard: false,
        tweet: false,
        like: false,
        user: false,
        allUsers: false,
        banUser: false,
        unbanUser: false
    },
    error: {
        dashboard: null,
        tweet: null,
        like: null,
        user: null,
        allUsers: null,
        banUser: null,
        unbanUser: null
    }
};

export const adminReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        // Dashboard Analytics
        case GET_DASHBOARD_ANALYTICS:
            return {
                ...state,
                loading: { ...state.loading, dashboard: true },
                error: { ...state.error, dashboard: null }
            };
        case GET_DASHBOARD_ANALYTICS_SUCCESS:
            return {
                ...state,
                dashboard: payload,
                loading: { ...state.loading, dashboard: false }
            };
        case GET_DASHBOARD_ANALYTICS_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, dashboard: false },
                error: { ...state.error, dashboard: payload }
            };

        // Tweet Analytics
        case GET_TWEET_ANALYTICS:
            return {
                ...state,
                loading: { ...state.loading, tweet: true },
                error: { ...state.error, tweet: null }
            };
        case GET_TWEET_ANALYTICS_SUCCESS:
            return {
                ...state,
                tweetAnalytics: payload,
                loading: { ...state.loading, tweet: false }
            };
        case GET_TWEET_ANALYTICS_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, tweet: false },
                error: { ...state.error, tweet: payload }
            };

        // Like Analytics
        case GET_LIKE_ANALYTICS:
            return {
                ...state,
                loading: { ...state.loading, like: true },
                error: { ...state.error, like: null }
            };
        case GET_LIKE_ANALYTICS_SUCCESS:
            return {
                ...state,
                likeAnalytics: payload,
                loading: { ...state.loading, like: false }
            };
        case GET_LIKE_ANALYTICS_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, like: false },
                error: { ...state.error, like: payload }
            };

        // User Analytics
        case GET_USER_ANALYTICS:
            return {
                ...state,
                loading: { ...state.loading, user: true },
                error: { ...state.error, user: null }
            };
        case GET_USER_ANALYTICS_SUCCESS:
            return {
                ...state,
                userAnalytics: payload,
                loading: { ...state.loading, user: false }
            };
        case GET_USER_ANALYTICS_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, user: false },
                error: { ...state.error, user: payload }
            };

        // All Users
        case GET_ALL_USER:
            return {
                ...state,
                loading: { ...state.loading, allUsers: true },
                error: { ...state.error, allUsers: null }
            };
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                users: payload,
                loading: { ...state.loading, allUsers: false }
            };
        case GET_ALL_USER_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, allUsers: false },
                error: { ...state.error, allUsers: payload }
            };

        // Ban User
        case BAN_USER:
            return {
                ...state,
                loading: { ...state.loading, banUser: true },
                error: { ...state.error, banUser: null }
            };
        case BAN_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map(user => 
                    user.id === payload.id ? payload : user
                ),
                loading: { ...state.loading, banUser: false }
            };
        case BAN_USER_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, banUser: false },
                error: { ...state.error, banUser: payload }
            };

        // Unban User
        case UNBAN_USER:
            return {
                ...state,
                loading: { ...state.loading, unbanUser: true },
                error: { ...state.error, unbanUser: null }
            };
        case UNBAN_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map(user => 
                    user.id === payload.id ? payload : user
                ),
                loading: { ...state.loading, unbanUser: false }
            };
        case UNBAN_USER_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, unbanUser: false },
                error: { ...state.error, unbanUser: payload }
            };

        default:
            return state;
    }
};