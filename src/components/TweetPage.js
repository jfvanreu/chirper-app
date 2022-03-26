import React from 'react'
import Tweet from './Tweet'
import NewTweet from './NewTweet'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function TweetPage(props) {
    // access tweetID in the URL using useParams hook
    const {id} = useParams()
    // access tweets in Store using useSelector hook
    const replyTweets = useSelector(({tweets}) => {
        
        return {
        
        replies: !tweets[id]
            ? []
            : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)    // sorted chronologically
        }})
    
    return (
        <div>
            <Tweet id={id}/>
            <NewTweet id={id}/>
            {replyTweets.replies.length !==0 && <h3 className='center'>Replies</h3>}
            <ul>
                {replyTweets.replies.map((replyId) => (
                    <li key={replyId}>
                        <Tweet id={replyId} />
                    </li>
                ))}
            </ul>
        </div>
        )
}