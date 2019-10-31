import React from 'react'
import {BrowserRouter as Link} from 'react-router-dom'
import './landingPage.css'

const LandingPage = () => {
	return (
    <div className="landingPage">
			<div className="illustration"></div>
			<button className="buttonCreate blueButton">
				<Link to="/create">Create</Link>
			</button>
      <button className="buttonJoin blueButton">
				<Link to="/join">Join</Link>
			</button>
    </div>
  )
}

export default LandingPage
