import React, {useState, useEffect} from 'react'
import Create from '../create/create'
import Answer from '../answer/answer'
import Share from '../share/share'
import Result from '../result/result'
import Loading from '../loading/loading'
import {useParams, useHistory} from 'react-router-dom'
import sha1 from 'crypto-js/sha1'
import io from 'socket.io-client'
import './room.css'

const currentUser = localStorage.getItem('userId')
const hashedUserId = sha1(currentUser).toString()
let socket = null
let roomId = ''

const Room = ({liftStateForCss}) => {
  roomId = useParams().roomId || roomId
  const history = useHistory()

  const [roomData, setRoomData] = useState({creator: '', id: '', isEditing: false, isAnswering: false, question: '',result:{}, numberOfOptions: 0 })
  const [answer, setAnswer] = useState(0)

  const isAdmin = hashedUserId === roomData.creator

  const onClickCreateButton = () => {
    setRoomData({...roomData, isEditing: true})
  }

  const onClickCapishButton = (value, numberOfOptions) => {
    const newData = {...roomData, question: value, result: {}, isEditing: false, isAnswering: true, numberOfOptions: numberOfOptions}
    for(let i=1; i <= numberOfOptions; i++){
      newData.result[`option${i}`] = []
    }
    setRoomData(newData)
    socket.emit('update', newData)
  }

  const onClickStopVotingButton = () => {
    const newData= {...roomData, isEditing: false, isAnswering: false}
    console.log(newData, 'stop voting')
    setRoomData(newData)
    socket.emit('update', newData)
  }

  const onClickVote = (vote) =>{
    setAnswer(vote)
    socket.emit('vote', {roomId: roomId, answer: `option${vote}`, user: currentUser})
  }

  const onAddNewQuestion = () => {
    const newData= {...roomData, isEditing: true, isAnswering: false}
    setRoomData(newData)
    socket.emit('update', newData)
  }

  useEffect(() => {
    socket = io(`http://172.24.1.128:8080`, {query: {roomId: roomId || ''}})
    socket.on('roomCreated', data => {
      console.log('roomCreated', data)
      data.result = JSON.parse(data.result)
      history.push(`/room/${data.roomId}`)
      setRoomData(data)
    })
    socket.on('roomUpdated', data => {
      data.result = JSON.parse(data.result)
      console.log('roomUpdated', data)
      console.log(data.roomId, roomId)
      if (data.roomId === roomId) setRoomData(data)
    })
    !roomId && socket.emit('create', hashedUserId)
  }, [])

  if((!isAdmin && !roomData.isEditing && roomData.isAnswering)){
    liftStateForCss()
  }

	return (
      <div className="room">
        This is room {roomId} the user is {currentUser} and {hashedUserId} and {isAdmin}.
        {JSON.stringify(roomData)}
        {(isAdmin && roomData.question === '' && !roomData.isEditing && !roomData.isAnswering) &&
          <Share roomId={roomId} onClickCreateButton={onClickCreateButton} />
        }
        {(!isAdmin && roomData.question === '' && !roomData.isEditing && !roomData.isAnswering) &&
          "USER IS WAITING FOR QUESTION"
        }
        {(isAdmin && roomData.isEditing && !roomData.isAnswering) &&
          <Create onClickCapishButton={onClickCapishButton} />
        }
        {(isAdmin && !roomData.isEditing && roomData.isAnswering) &&
          <Loading isAdmin={isAdmin} onClickStopVotingButton={onClickStopVotingButton} />
        }
        {(!isAdmin && !roomData.isEditing && roomData.isAnswering) &&
          <Answer onClickVote={onClickVote} question={roomData.question} numberOfOptions={roomData.numberOfOptions} />
        }
        {(isAdmin && !roomData.isEditing && !roomData.isAnswering && roomData.question !== '') &&
          <Result question={roomData.question} result={roomData.result} numberOfOptions={roomData.numberOfOptions} onAddNewQuestion={onAddNewQuestion} />
        }
        {(!isAdmin && !roomData.isEditing && !roomData.isAnswering && !roomData.question === '') &&
          'USER IS WAITING'
        }
      </div>
  )
}

export default Room
