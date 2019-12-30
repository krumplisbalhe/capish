import React from 'react'
import {Link} from 'react-router-dom'
// import {BrowserRouter as Link} from 'react-router-dom'
import './result.css'
import {type2, type3, type4} from '../emojis/emojis'
import Loader from '../emojis/eyeslookingaround.gif'

const Result = ({question = 'What the fuck?',type=4, results=[7, 12, 56, 45], isFetching=false}) => {
  const totalOfResults = results.reduce((a, b) => a + b, 0)
  const showNumberInPercentage = (number) => {
    const numberInPercentage = ((number/totalOfResults) * 100)
    return numberInPercentage
  }

  const typeOfArray = (t) => {
    if(type===2){
      return type2
    }
    if(type===3){
      return type3
    }
    if(type===4){
      return type4
    }
  }

	return (
    !isFetching ? (
      <div className="result">
        <h1 className="question">{question}</h1>
        <div className="resultItems">
          {results.map( (item, index) => (
            <div className="item">
              <img src={typeOfArray(type)[index]} height="42" width="42"></img>
              <span className="percentageNumber" index={index}>
                {`${showNumberInPercentage(item).toFixed(1)}%`}
              </span>
              <div className="barContainer">
                <div
                  className="bar"
                  style={{gridColumnEnd: Math.round(showNumberInPercentage(item))}}
                >
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link class="restartButton" to="/create">
          <button>
            New question
          </button>
        </Link>
      </div>
    )
    :
    (
      <div className="loaderContainer">
        <img src={Loader} height="70" width="70"></img>
      </div>
    )
  )
}

export default Result
