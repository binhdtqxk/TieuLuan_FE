import axios from "axios"
import { api } from "../../config/api"
import { FIND_TWEET_BY_ID_FAILURE, FIND_TWEET_BY_ID_SUCCESS, GET_ALL_TWEETS_FAILURE, GET_ALL_TWEETS_REQUEST, GET_ALL_TWEETS_SUCCESS, GET_USER_LIKED_TWIT_FAILURE, GET_USER_LIKED_TWIT_SUCCESS, GET_USER_REPLIED_TWIT_FAILURE, GET_USER_REPLIED_TWIT_SUCCESS, GET_USERS_TWEET_FAILURE, GET_USERS_TWEET_SUCCESS, LIKE_TWEET_FAILURE, LIKE_TWEET_SUCCESS, REPLY_TWEET_FAILURE, REPLY_TWEET_SUCCESS, RETWEET_FAILURE, RETWEET_REQUEST, RETWEET_SUCCESS, TWEET_CREATE_FAILURE, TWEET_CREATE_SUCCESS, TWEET_DELETE_FAILURE, TWEET_DELETE_SUCCESS, USER_LIKE_TWEET_FAILURE, USER_LIKE_TWEET_SUCCESS} from "./ActionType"

export const getAllTweets=()=>async(dispatch)=>{
    try{
        const {data}=await api.get("/api/twits/")
        console.log("jwt: "+localStorage.getItem("jwt"))
        console.log("get all twits : ",data)
        dispatch({type: GET_ALL_TWEETS_SUCCESS,payload:data})
    }catch(error){
        console.log("catch error - ", error)
        dispatch({type:GET_ALL_TWEETS_FAILURE,payload:error.message})
    }
}
export const getUserstweet=(userId)=>async(dispatch)=>{
    try{
        const {data}=await api.get(`/api/twits/user/${userId}`)
        console.log("user id: "+userId)
        console.log("get users twit : ",data)
        dispatch({type: GET_USERS_TWEET_SUCCESS,payload:data})
    }catch(error){
        console.log("catch error - ", error)
        dispatch({type:GET_USERS_TWEET_FAILURE,payload:error.message})
    }
}
export const findTwitsByLikeContainUser=(userId)=>async(dispatch)=>{
    try{
        const {data}=await api.get(`/api/twits/user/${userId}/likes`)
        console.log("users liked twit : ",data)
        dispatch({type: USER_LIKE_TWEET_SUCCESS,payload:data})
    }catch(error){
        console.log("catch error - ", error)
        dispatch({type:USER_LIKE_TWEET_FAILURE,payload:error.message})
    }
}
export const findTwitsById=(twitId)=>async(dispatch)=>{
    try{
        const {data}=await api.get(`/api/twits/${twitId}`)
        console.log("find twits by id : ",data)
        dispatch({type: FIND_TWEET_BY_ID_SUCCESS,payload:data})
    }catch(error){
        console.log("catch error - ", error)
        dispatch({type:FIND_TWEET_BY_ID_FAILURE,payload:error.message})
    }
}
export const createTweet=(tweetData)=>async(dispatch)=>{
    try{
        const {data}=await api.post(`/api/twits/create`,tweetData)
        console.log("created tweet : ",data)
        dispatch({type: TWEET_CREATE_SUCCESS,payload:data})
    }catch(error){
        console.log("catch error - ", error)
        dispatch({type:TWEET_CREATE_FAILURE,payload:error.message})
    }
}
export const createTweetReply=(tweetData)=>async(dispatch)=>{
    try{
        const {data}=await api.post(`/api/twits/reply`,tweetData)
        console.log("reply tweet : ",data)
        dispatch({type: REPLY_TWEET_SUCCESS,payload:data})
    }catch(error){
        console.log("catch error - ", error)
        dispatch({type:REPLY_TWEET_FAILURE,payload:error.message})
    }
}
export const createReTweet=(twitId)=>async(dispatch)=>{
    try{
        const {data}=await api.put(`/api/twits/${twitId}/retwit`)
        console.log("Retweet : ",data)
        dispatch({type: RETWEET_SUCCESS,payload:data})
    }catch(error){
        console.log("catch error - ", error)
        dispatch({type:RETWEET_FAILURE,payload:error.message})
    }
}
export const likeweet=(twitId)=>async(dispatch)=>{
    try{
        const {data}=await api.post(`/api/${twitId}/likes `)
        console.log("like tweet : ",data)
        dispatch({type: LIKE_TWEET_SUCCESS,payload:data})
    }catch(error){
        console.log("catch error - ", error)
        dispatch({type:LIKE_TWEET_FAILURE,payload:error.message})
    }
}
export const deleteTweet=(twitId)=>async(dispatch)=>{
    try{
        const {data}=await api.post(`/api/twits/${twitId}`)
        console.log("delete tweet : ",data)
        dispatch({type: TWEET_DELETE_SUCCESS,payload:twitId})
    }catch(error){
        console.log("catch error - ", error)
        dispatch({type:TWEET_DELETE_FAILURE,payload:error.message})
    }
}
export const getUserLikedTwit=(userId)=>async(dispatch)=>{
    try {
        const {data}=await api.get(`api/twits/user/${userId}/likes`)
        console.log("get liked tweet: ",data)
        dispatch({type: GET_USER_LIKED_TWIT_SUCCESS,payload:data})
    } catch (error) {
        console.log("catch error - ", error)
        dispatch({type:GET_USER_LIKED_TWIT_FAILURE,payload:error.message})
    }
}
export const getUserRepliedtwit=(userId)=>async(dispatch)=>{
    try {
        const {data}=await api.get(`api/twits/user/${userId}/replied`)
        console.log("get replied tweet: ",data)
        dispatch({type: GET_USER_REPLIED_TWIT_SUCCESS,payload:data})
    } catch (error) {
        console.log("catch error - ", error)
        dispatch({type:GET_USER_REPLIED_TWIT_FAILURE,payload:error.message})
    }
}