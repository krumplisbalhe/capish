import React from 'react'
import {Link} from 'react-router-dom'
import './landingPage.css'

const LandingPage = () => {
	
	return (
    <div className="landingPage">
			<h1 className="landingText">Get/give <span>anonymous</span> feedback <span>fast</span></h1>
			<div className="illustration"></div>
				<Link className="buttonCreate" to="/room">
					<button>
						Create
					</button>
				</Link>
				<Link className="buttonJoin" to="/join">
					<button>
						Join
					</button>
				</Link>
    </div>
  )
}

export default LandingPage
