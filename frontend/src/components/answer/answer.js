import React,{useState} from 'react'
// import {BrowserRouter as Link} from 'react-router-dom'
import './answer.css'

const Answer = ({onClickVote}) => {
	return (
    <div className="answer">
      ANSEWEEREEEGR
      <div className="questionToAnswer"></div>
      <div className="optionsContainer"></div>
      <div className="slider"></div>
      <div className="submitAnswer">
        <button onClick={()=>onClickVote(1)}>1</button>
        <button onClick={()=>onClickVote(2)}>2</button>
        <button onClick={()=>onClickVote(3)}>3</button>
      </div>
    </div>
  )
}

export default Answer
