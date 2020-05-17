import { combineReducers } from 'redux'
import authedUser from '../reducers/authedUser'
import users from '../reducers/users'
import tweets from '../reducers/tweets'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers ({
    authedUser,
    users,
    tweets,
    loadingBar: loadingBarReducer,
})

/* Note that the combineReducers syntax above is a ES6 shorthand.
It's equivalent to the following.
combineReducers({
  authedUser: authedUser,
  tweets: tweets,
  users: users
});
*/