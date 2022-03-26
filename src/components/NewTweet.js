import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet} from '../actions/tweets'
import { Navigate } from 'react-router-dom'

class NewTweet extends Component {
    // we create a state for our component because the button status will changed if we enter text in the input field.
    // no need to share this state beyond this component.
    state = {
        text: '',
        toHome: false,
    }

    handleChange = (e) => {
        const text = e.target.value
        this.setState(() => ({text}))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { text } = this.state
        const { dispatch, id } = this.props
        
        dispatch(handleAddTweet(text, id))

        // reset the state to an empty string once we have submitted the new tweet.
        this.setState(() => ({
            text:'', 
            toHome: id ? false : true}))    //we want to head back to Home if we're in the NewTweet Page only.
    }
    render() {
        const {text, toHome} = this.state

        if (toHome === true) {
            return <Navigate to="/" />
        }
        const tweetLeft = 280 - text.length

        return (
            <div>
                <h3 className='center'>Compose New Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea placeholder="What's happening?" value={text} onChange={this.handleChange} className='textarea' maxLength={280}/>
                {tweetLeft <= 100 && (
                    <div className='tweet-length'>
                        {tweetLeft}
                    </div>
                )}
                <button className='btn' type='submit' disabled={text === '' }>
                    Submit
                </button>
                </form>

            </div>

        )
    }
}

export default connect()(NewTweet)