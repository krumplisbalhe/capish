import React from 'react'
// import {BrowserRouter as Link} from 'react-router-dom'
import './create.css'

const Create = () => {
	return (
    <div className="create">
			<h1 className="question">Add your question:</h1>
			<input class="questionInput" />
			<div class="img1"></div>
			<div class="img2"></div>
			<div class="img3"></div>
			<button class="button blueButton">Create capish</button>
    </div>
  )
}

export default Create
