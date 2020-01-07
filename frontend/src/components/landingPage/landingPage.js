import React from 'react'
import {Link} from 'react-router-dom'
import './landingPage.css'

const LandingPage = () => (
  <div className="landingPage">
    <h1 className="landingText">Get/give <span>anonymous</span> feedback <span>fast</span></h1>
    <div className="illustration" />
    <Link className="buttonCreate" to="/room">
      <button type="button">
        Create
      </button>
    </Link>
    <Link className="buttonJoin" to="/join">
      <button type="button">
        Join
      </button>
    </Link>
  </div>
)

export default LandingPage
