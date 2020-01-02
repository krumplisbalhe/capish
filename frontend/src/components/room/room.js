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
let socket = null

const Room = () => {
  let {roomId} = useParams()
  const [dataFromServer, setDataFromServer] = useState({creator: '', id: '', isActive: false, question: '',result:{} })
  const [answer, setAnswer] = useState(0)
  const isAdmin = hashedUserId === dataFromServer.creator
  const history = useHistory()

  const onClickCreateButton = () => {
    setDataFromServer({...dataFromServer, isActive: true})
  }

  const onClickEditQuestionButton = (value, numberOfOptions) => {
    const newData = {...dataFromServer, question: value, result: {}}
    for(let i=1; i <= numberOfOptions; i++){
      newData.result[`option${i}`] = []
    }
    setDataFromServer(newData)
    socket.emit('update', newData)
  }

  const onClickVote = (vote) =>{
    setAnswer(vote)
    socket.emit('vote', {answer: `option${vote}`, user: currentUser})
  }

  useEffect(() => {
    socket = io(`http://172.24.1.128:8080`, {query: {roomId: roomId || ''}})
    socket.on('roomCreated', data => {
      console.log('roomCreated', data)
      history.push(`/room/${data.roomId}`)
      setDataFromServer(data)
    })
    socket.on('roomUpdated', data => {
      console.log('roomUpdated', data)
      data.result = JSON.parse(data.result)
      setDataFromServer(data)
    })
    !roomId && socket.emit('create', hashedUserId)
  }, [])

	return (
      <div className="room">
        This is room {roomId} the user is {currentUser} and {hashedUserId} and {isAdmin}.
        {JSON.stringify(dataFromServer)}
        {(isAdmin && dataFromServer.question === '') &&
          <Share roomId={roomId} onClickCreateButton={onClickCreateButton} />
        }
        {(isAdmin && dataFromServer.isActive) &&
          <Create onClickEditQuestionButton={onClickEditQuestionButton} />
        }
        {(isAdmin && dataFromServer.isActive && dataFromServer.question !== '') &&
          <Result />
        }
        {!isAdmin &&
          <Answer onClickVote={onClickVote} />
        }
      </div>
  )
}

export default Room
