import React from 'react'
import { useSelector } from 'react-redux'
import Tweet from './Tweet'

export default function Dashboard() {

        const tweetIds = useSelector(({tweets}) => {
            return Object.keys(tweets)
                // sort tweets from more recent to least recent
                .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)})

        return (
            <div>
                <h3 className='center'>Your Timeline</h3>
                <ul className='dashboard-list'>
                    {tweetIds.map((id) => (
                        <li key={id}>
                            <Tweet id={id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
}
    