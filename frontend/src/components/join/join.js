import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './join.css'

const Join = () => {
  const [inputValue, setInputValue] = useState('')
  const history = useHistory()
  const joinRoom = () => {
    history.push(`/room/${inputValue}`)
  }
  return (
    <div className="join">
      <div className="textWrapper">
        <h1>Type in the capish key:</h1>
      </div>
      <div className="options">
        <div className="input">
          <input type="text" onChange={e => setInputValue(e.target.value)} />
          <button type="button" onClick={joinRoom}>Join</button>
        </div>
      </div>
    </div>
  )
}

export default Join
