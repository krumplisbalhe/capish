import React from 'react'
// import {Link} from 'react-router-dom'
import './loading.css'

const Loading = ({isAdmin, onClickStopVotingButton}) => {
	return (
    <div className="loading">
			{isAdmin ? (
				<h1>Click the button to stop this Capish</h1>
			) :(
				<h1 className="loadingText">Please wait for the new question</h1>
			)
			}
			<div className="illustration"></div>
			{isAdmin && (
				<button className="buttonShowResults" onClick={onClickStopVotingButton}>
					Stop voting
				</button>
			)}
    </div>
  )
}

export default Loading
