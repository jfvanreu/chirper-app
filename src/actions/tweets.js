import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

//action creator receiveTweets
export function receiveTweets (tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    }
}

//action creator toggleTweet
function toggleTweet ({ id, authedUser, hasLiked }) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked,
    }
}

//action create addTweet
function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet,
        }
}

//async action creator to save the tweet
export function handleAddTweet(text, replyingTo) {
    //using redux thunk, we will return a function which has 2 functions as arguments
    //we can use those functions to collect info (getState) from the state and dispatch
    //actions to the reducers.
    return (dispatch, getState) => {
        const { authedUser } = getState()
        
        dispatch(showLoading())
        return saveTweet({
            text,
            author:authedUser,
            replyingTo
        })
        .then((tweet) => dispatch(addTweet(tweet)))
        .then(() => dispatch(hideLoading()))
    }
}


//async action creator which will call toggleTweet above
export function handleToggleTweet(info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))
        
        return saveLikeToggle(info)
            .catch((e) => {
                console.warn('Error in the handleToggleTweet:', e)
                // toggle back to what it was initially in the UI since there was an error
                dispatch(toggleTweet(info))
                alert('There was an error liking the tweet. Try again.')
            })
    }

}