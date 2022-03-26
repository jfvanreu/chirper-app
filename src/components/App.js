import React, { useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Nav from './Nav'

import { useSelector, useDispatch } from 'react-redux';

// useFetching fetches data via an action creator
const useFetching = (someFetchActionCreator) => {
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(someFetchActionCreator());
  }, [dispatch])
}

export default function App() {
  // fetch initial data
  useFetching(handleInitialData)
  const loading = useSelector(({ authedUser }) => authedUser === null)

  return (
    <Router>
      <Fragment>
        <LoadingBar/>
        <div className='container'>
          <Nav />
          {loading === true
            ? null
            : <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/tweet/:id' element={<TweetPage/>}/>
                <Route path='/new' element={<NewTweet/>} />
            </Routes>}  
        </div>
      </Fragment>
    </Router>
  )
}