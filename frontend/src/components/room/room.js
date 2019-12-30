import React from 'react'
import Create from '../create/create'
import Answer from '../answer/answer'
import Share from '../share/share'
import Result from '../result/result'
import {useParams, useHistory} from 'react-router-dom'
import sha1 from 'crypto-js/sha1'
import io from 'socket.io-client'

const data = {creator: 'R', id: '12345', active: false, question: '', result:{} }
const currentUser = localStorage.getItem('userId')
const hashedUserId = sha1(currentUser).toString()
const isAdmin = hashedUserId === data.creator

const Room = () => {
  const socket = io('http://localhost:8080')
  const history = useHistory()
  socket.on('roomCreated', roomId => {
    console.log(roomId)
    history.push(`/room/${roomId}`)
  })
  let {roomId} = useParams()
  !roomId && socket.emit('create', hashedUserId)

	return (
      <div className="room">
        This is room {roomId} the user is {currentUser} and {isAdmin}.
        {isAdmin && data.question === '' &&
          <Share roomId={roomId} />
        }
        {isAdmin && data.active === false &&
          <Create />
        }
        {isAdmin && data.active === true &&
          <Result />
        }
        {!isAdmin &&
          <Answer />
        }
      </div>
  )
}

export default Room
