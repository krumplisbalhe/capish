import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import LandingPage from './components/landingPage/landingPage'
import Create from './components/create/create'
import Join from './components/join/join'
import Answer from './components/answer/answer'
import Share from './components/share/share'
import Result from './components/result/result'

function App() {
  return (
    <Router>
      <div className="app">
        <div className="header">
          <div className="logo">capish?</div>
        </div>
        <div className="content">
        <Switch>
          <Route
              exact path="/"
              render={() => <LandingPage />}
          />
          <Route
              path="/create"
              render={() => <Create />}
          />
          <Route
            path="/join"
            render={() => <Join />}
          />
          <Route
            path="/answer"
            render={() => <Answer />}
          />
          <Route
            path="/share"
            render={() => <Share />}
          />
          <Route
            path="/result"
            render={() => <Result />}
          />
        </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
