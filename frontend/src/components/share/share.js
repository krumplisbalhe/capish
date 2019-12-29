import React from 'react'
// import {BrowserRouter as Link} from 'react-router-dom'
import './share.css'

const Share = () => {
	return (
    <div className="share">
			<h1 className="shareText">Join to this capish by typing in the key or reading the QR code</h1>
			<div class="key"></div>
			<div class="qrCode"></div>
			<button class="button blueButton">Use capish</button>
    </div>
  )
}

export default Share
