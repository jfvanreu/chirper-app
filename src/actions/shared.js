import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import {receiveTweets } from '../actions/tweets'
import {setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

// we hardcode the name of the user. In theory this would come from an authentication.
const AUTH_ID = 'tylermcginnis'

export function handleInitialData () {
    
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({tweets, users}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))
                dispatch(setAuthedUser(AUTH_ID))
                dispatch(hideLoading())
            })
    }

}