// we import our const variables that we defined in actions/tweets.
import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

// set a default value to state to avoid error when state is empty
export default function tweets (state = {}, action) {
    //switch statement over various action types
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                // use the spread operator to create new object
                ...state,
                ...action.tweets
            }
        
        case TOGGLE_TWEET:
            // return a new object because of un-mutuable state
            return {
                // spread the state to create a copy
                ...state,
                // change action.id item to match the toggle operation
                [action.id]: {
                    ...state[action.id],
                    //check if the status for this item is liked by this user
                    likes: action.hasLiked === true
                    // remove authedUser from list of persons who like this tweet
                    ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
                    // add authedUser to list of users who like this tweet
                    : state[action.id].likes.concat([action.authedUser])
                }
            }
        
        case ADD_TWEET:
            const { tweet } = action
            
            let replyingTo = {}
            if (tweet.replyingTo !== null) {
                replyingTo = {
                    [tweet.replyingTo]: {
                        ...state[tweet.replyingTo],
                        replies:state[tweet.replyingTo].replies.concat([tweet.id])
                    }
                }
            }
            // return a new object when adding a tweets
            return {
                ...state,
                [action.tweet.id]: action.tweet,
                ...replyingTo,
            }
            
        default:
            return state
    }
}