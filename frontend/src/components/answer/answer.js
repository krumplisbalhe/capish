import React from 'react'
// import {BrowserRouter as Link} from 'react-router-dom'
import './answer.css'
import {type2, type3, type4} from '../emojis/emojis'

const Answer = ({onClickVote, question, numberOfOptions}) => (
  <div className="answer">
    <div className="questionToAnswer">
      <h1>{question}</h1>
    </div>
    <div className="submitAnswer">
      {numberOfOptions === 2 && (
        <>
          <div className="emojiImage" style={{backgroundImage: `url(${type2[0]})`}} onClick={() => onClickVote(1)} />
          <div className="emojiImage" style={{backgroundImage: `url(${type2[1]})`}} onClick={() => onClickVote(2)} />
        </>
      )}
      {numberOfOptions === 3 && (
        <>
          <div className="emojiImage" style={{backgroundImage: `url(${type3[0]})`}} onClick={() => onClickVote(1)} />
          <div className="emojiImage" style={{backgroundImage: `url(${type3[1]})`}} onClick={() => onClickVote(2)} />
          <div className="emojiImage" style={{backgroundImage: `url(${type3[2]})`}} onClick={() => onClickVote(3)} />
        </>
      )}
      {numberOfOptions === 4 && (
        <>
          <div className="emojiImage" style={{backgroundImage: `url(${type4[0]})`}} onClick={() => onClickVote(1)} />
          <div className="emojiImage" style={{backgroundImage: `url(${type4[1]})`}} onClick={() => onClickVote(2)} />
          <div className="emojiImage" style={{backgroundImage: `url(${type4[2]})`}} onClick={() => onClickVote(3)} />
          <div className="emojiImage" style={{backgroundImage: `url(${type4[3]})`}} onClick={() => onClickVote(4)} />
        </>
      )}
    </div>
  </div>
)

export default Answer
