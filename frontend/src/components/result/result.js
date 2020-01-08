import React from 'react'
import './result.css'
import {type2, type3, type4} from '../emojis/emojis'

const Result = ({question, numberOfOptions, result, onAddNewQuestion}) => {
  const finalResult = []
  for (const r in result) {
    finalResult.push(
      result[r].length
    )
  }
  const totalOfResults = finalResult.reduce((a, b) => a + b, 0)
  const showNumberInPercentage = number => {
    let numberInPercentage = ((number / totalOfResults) * 100)
    return numberInPercentage = numberInPercentage ? numberInPercentage : 0
  }
  const typeOfArray = type => {
    if (type === 2) {
      return type2
    }
    if (type === 3) {
      return type3
    }
    if (type === 4) {
      return type4
    }
  }

  const generateIdForKey = (index) => (`id${Math.random().toString(36).substr(index, 9)}`)

  return (
    <div className="result">
      <h1 className="question">{question}</h1>
      <div className="resultItems">
        {finalResult.map((item, index) => (
          <div className="item" key={generateIdForKey(index)}>
            <img alt="emojiImage" src={typeOfArray(numberOfOptions)[index]} height="42" width="42" />
            <span className="percentageNumber" index={index}>
              {`${showNumberInPercentage(item).toFixed(1)}%`}
            </span>
            <div className="barContainer">
              <div
                className="bar"
                style={{gridColumnEnd: Math.round(showNumberInPercentage(item))}}
              />
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="restartButton" onClick={onAddNewQuestion}>
        New question
      </button>
    </div>
  )
}

export default Result
