import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDate, formatTweet} from '../utils/helpers'
import {TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index'
import { handleToggleTweet} from '../actions/tweets'
import { Link, useNavigate } from 'react-router-dom'

function createTweetInfoById(id) {
    const tweetInfo = useSelector(({tweets, users, authedUser}) => {
        const tweet = tweets[id]
        const parentTweet = tweet ? tweets[tweet.replyingTo] : null

        return {
            authedUser,
            tweet: tweet 
                ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
                : null
        }
    })
    return tweetInfo
}

export default function Tweet(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const toParent = (e, id) => {
        e.preventDefault()
        //we get access to this because we used withRouter
        navigate(`/tweet/${id}`)
    }

    const handleLike = (e, tweetInfo) => {
        e.preventDefault()
        //todo: handle click on like icon
        const { tweet, authedUser} = tweetInfo
        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))
    }
    
    const tweetInfo = createTweetInfoById(props.id)

    if (tweetInfo === null) {
        return (<p>This Tweet doesn't exist!</p>)
    }
    
    const {name, avatar, timestamp, text, hasLiked, likes, replies, parent, id} = tweetInfo.tweet

    return (
        <Link to={`/tweet/${id}`} className='tweet'>
            <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
            <div className='tweet-info'>
                <div>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {parent && (
                        <button className='replying-to' onClick={(e) => toParent(e,parent.id)}>
                            Replying to @{parent.author}
                        </button>
                    )}
                    <p>{text}</p>
                </div>
                <div className='tweet-icons'>
                    <TiArrowBackOutline className='tweet-icon' />
                    <span>{replies !==0 && replies}</span>
                    <button className='heart-button' onClick={(e) => handleLike(e, tweetInfo)}>
                    {hasLiked === true
                    ? <TiHeartFullOutline color="#e0245e" className='tweet-icon' />
                    : <TiHeartOutline className='tweet-icon' />}
                    </button>
                    <span>{likes !==0 && likes}</span>
                </div>
            </div>
        </Link>    
    )
}