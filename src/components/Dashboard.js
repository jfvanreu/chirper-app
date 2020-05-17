import React, { Component } from 'react'
//import connect because it's a connected component (container)
import { connect } from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends Component {
    
    render() {
        return(
            <div>
                <h3 className='center'>Your Timeline</h3>
                <ul className='dashboard-list'>
                    {this.props.tweetIds.map((id) => (
                        <li key={id}>
                            <Tweet id={id}/>
                        </li>
                    ))}
                </ul>   
            </div>
        )
    }
}

function mapStateToProps( {tweets} ){
  return { 
    tweetIds: Object.keys(tweets) 
        // sort tweets from more recent to least recent
        .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

//special export because it's a connected component
export default connect(mapStateToProps)(Dashboard)