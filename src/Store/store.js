import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { twitReducer } from "./twit/Reducer";
import { notiReducer } from "./Notification/Reducer";
import { messageReducer } from "./Message/Reducer";

const rootReducers=combineReducers({
    auth:authReducer,
    twit:twitReducer,
    noti:notiReducer,
    dm: messageReducer,
});

export const store=legacy_createStore(rootReducers,applyMiddleware(thunk))
