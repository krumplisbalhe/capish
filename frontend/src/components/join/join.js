import React from 'react'
// import {Link} from 'react-router-dom'
import './join.css'

const Join = ({joinLink = "https://www.npmjs.com/package/qrcode.react"}) => {
	return (
		<div className="join">
		<div className="textWrapper">
			<h1>Type in the capish key:</h1>
		</div>
    <div className="options">
			<div className="input">
				<input/>
				<button>Join</button>
			</div>
		</div>
		</div>
  )
}

export default Join
