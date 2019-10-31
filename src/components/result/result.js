import React from 'react'
// import {BrowserRouter as Link} from 'react-router-dom'
import './result.css'
import {type2, type3, type4} from '../emojis/emojis'

const Result = ({question = 'What the fuck?',type=4, results=[25,65, 56, 45]}) => {
  const totalOfResults = results.reduce((a, b) => a + b, 0)
  const showNumberInPercentage = (number) => {
    const numberInPercentage = Math.round((number/totalOfResults) * 100)
    return numberInPercentage
  }
  const typeOfArray = (t) => {
    if(t==2){
      return type2
    }
    if(t==3){
      return type3
    }
    if(t==4){
      return type4
    }
  }

	return (
    <div className="result">
      <h1 className="question">{question}</h1>
      <div className="resultItems">
        {results.sort().reverse().map( (item, index) => (
          <div className="item">
            <img src={typeOfArray(type)[index]} height="42" width="42"></img>
            <span className="percentageNumber" index={index}>
              {`${showNumberInPercentage(item)}%`}
            </span>
            <div className="barContainer">
              <div
                className="bar"
                style={{gridColumnStart: 1, gridColumnEnd: showNumberInPercentage(item)}}
              >
              </div>
            </div>
          </div>
        ))}
      </div>
      <button class="restartButton blueButton">Restart</button>
    </div>
  )
}

export default Result
