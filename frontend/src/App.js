import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import sha1 from 'crypto-js/sha1'
import LandingPage from './components/landingPage/landingPage'
import Room from './components/room/room'
import Join from './components/join/join'
import './vars.css'
import './App.css'

function App() {
  if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', sha1(Math.random().toString()).toString())
  }

  return (
    <Router>
      <div className="app">
        <div className="header">
          <Link to="/">
            <div className="logo">capish?</div>
          </Link>
        </div>
        <div className='content'>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <LandingPage />}
            />
            <Route
              path="/room/:roomId?"
              render={() => <Room />}
            />
            <Route
              path="/join"
              render={() => <Join />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
