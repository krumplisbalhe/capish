import React from 'react'
// import {Link} from 'react-router-dom'
import './loading.css'

const Loading = ({isAdmin, onClickStopVotingButton, isFirstQuestion}) => (
  <div className="loading">
    {isAdmin && (
      <h1 className="loadingText">Click the button to stop the voting process</h1>
    )}
    {!isAdmin && isFirstQuestion && (
        <h1 className="loadingText">Waiting for the question</h1>
    )}
    {!isAdmin && !isFirstQuestion && (
        <h1 className="loadingText">The results are on the board</h1>
    )}
    <div className="illustration" />
    {isAdmin ? (
      <button type="button" className="buttonShowResults" onClick={onClickStopVotingButton}>
        Stop
      </button>
    ) : (
      !isFirstQuestion && (
        <h1 className="buttonShowResults">Waiting for next question...</h1>
      )
    )}
  </div>
)

export default Loading
