import React, {useState, useEffect} from 'react'
import Create from '../create/create'
import Answer from '../answer/answer'
import Share from '../share/share'
import Result from '../result/result'
import {useParams, useHistory} from 'react-router-dom'
import sha1 from 'crypto-js/sha1'
import io from 'socket.io-client'

const currentUser = localStorage.getItem('userId')
const hashedUserId = sha1(currentUser).toString()

const Room = () => {
  let {roomId} = useParams()
  const [dataFromServer, setDataFromServer] = useState({creator: '', id: '', active: false, question: '', result:{} })
  const isAdmin = hashedUserId === dataFromServer.creator ? 'ADMIN' : 'NOT ADMIN'
  const history = useHistory()
  const onClickCreateButton = () => {
    setDataFromServer({...dataFromServer, active: true})
  }
  useEffect(() => {
    const socket = io(`http://localhost:8080`, {query: {roomId: roomId || ''}})
    socket.on('roomCreated', data => {
      console.log(data)
      history.push(`/room/${data.roomId}`)
      setDataFromServer(data)
    })
    socket.on('roomUpdated', data => {
      setDataFromServer(data)
    })
    !roomId && socket.emit('create', hashedUserId)
  }, [])

	return (
      <div className="room">
        This is room {roomId} the user is {currentUser} and {hashedUserId} and {isAdmin}.
        {isAdmin && dataFromServer.question === '' &&
          <Share roomId={roomId} onClickCreateButton={onClickCreateButton} />
        }
        {isAdmin && dataFromServer.active === true &&
          <Create />
        }
        {isAdmin && dataFromServer.active === false &&
          <Result />
        }
        {!isAdmin &&
          <Answer />
        }
      </div>
  )
}

export default Room
