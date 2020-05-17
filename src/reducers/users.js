// we import our const variable that we defined in actions/users.
import { RECEIVE_USERS } from '../actions/users'

// set a default value to state to avoid error when state is empty
export default function users (state = {}, action) {
    //switch statement over various action types
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                // use the spread operator to create new object
                ...state,
                ...action.users
            }
        default:
            return state
    }
}