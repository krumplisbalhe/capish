import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
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

  const [stateForCss, setStateForCss] = useState('')

  const liftStateForCss = () => {
    setStateForCss('white')
  }

  return (
    <Router>
      <div className="app">
        <div className="header">
          <div className="logo">capish?</div>
        </div>
        <div className={`content ${stateForCss}`}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <LandingPage />}
            />
            <Route
              path="/room/:roomId?"
              render={() => <Room liftStateForCss={liftStateForCss} />}
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
