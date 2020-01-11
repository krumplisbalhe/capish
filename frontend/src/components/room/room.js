import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import sha1 from 'crypto-js/sha1'
import io from 'socket.io-client'
import Create from '../create/create'
import Answer from '../answer/answer'
import Share from '../share/share'
import Result from '../result/result'
import Loading from '../loading/loading'
import './room.css'

const currentUser = localStorage.getItem('userId')
const hashedUserId = sha1(currentUser).toString()
let socket = null
let roomId = ''

const Room = () => {
  // its a roomid or empty string
  roomId = useParams().roomId || roomId
  const history = useHistory()

  const [roomData, setRoomData] = useState({
    creator: '',
    id: '',
    isEditing: false,
    isAnswering: false,
    question: '',
    result: {},
    numberOfOptions: 0
  })
  const [answer, setAnswer] = useState(0)

  const isAdmin = hashedUserId === roomData.creator
  let hasVoted = false

  for (let option in roomData.result) {
    if (roomData.result[option].includes(currentUser)) {
      hasVoted = true
    }
  }

  const onClickCreateButton = () => {
    setRoomData({...roomData, isEditing: true})
  }

  const onClickCapishButton = (value, numberOfOptions) => {
    const newData = {
      ...roomData,
      question: value,
      result: {},
      isEditing: false,
      isAnswering: true,
      numberOfOptions
    }
    for (let i = 1; i <= numberOfOptions; i += 1) {
      newData.result[`option${i}`] = []
    }
    setRoomData(newData)
    socket.emit('update', newData)
  }

  const onClickStopVotingButton = () => {
    const newData = {
      ...roomData,
      isEditing: false,
      isAnswering: false
    }
    setRoomData(newData)
    socket.emit('update', newData)
  }

  const onClickVote = vote => {
    setAnswer(vote)
    const result = roomData.result
    result[`option${vote}`].push(currentUser)
    setRoomData({...roomData, result})
    socket.emit('vote', {
      roomId,
      answer: `option${vote}`,
      user: currentUser
    })
  }

  const onAddNewQuestion = () => {
    const newData = {
      ...roomData,
      isEditing: true,
      isAnswering: false
    }
    setRoomData(newData)
    socket.emit('update', newData)
  }

  useEffect(() => {
    // connect to the server, initiate the socket - if no roomId, goes to create, at the bottom
    socket = io('http://172.24.1.128:8080', {query: {roomId: roomId || ''}})
    socket.on('roomCreated', data => {
      console.log('roomCreated', data)
      data.result = JSON.parse(data.result)
      history.push(`/room/${data.roomId}`)
      setRoomData(data)
    })
    socket.on('roomUpdated', data => {
      if (data.result) {
        data.result = JSON.parse(data.result)
      }

      console.log('roomUpdated', data)
      if (data.roomId === roomId) setRoomData(data)
    })
    !roomId && socket.emit('create', hashedUserId)
  }, [])

  return (
    <div className="room">
      {/* This is room {roomId} the user is {currentUser} and {hashedUserId} and {isAdmin}.
      {JSON.stringify(roomData)} */}
      {Boolean(
        isAdmin &&
        roomData.question === '' &&
        !roomData.isEditing &&
        !roomData.isAnswering
      ) && (
        <Share
          roomId={roomId}
          onClickCreateButton={onClickCreateButton}
        />
      )}
      {Boolean(
        !isAdmin &&
        roomData.question === '' &&
        !roomData.isEditing
      ) && <Loading isAdmin={isAdmin} isFirstQuestion />}
      {Boolean(
        isAdmin &&
        roomData.isEditing &&
        !roomData.isAnswering
      ) &&
        <Create onClickCapishButton={onClickCapishButton} />}
      {Boolean(
        isAdmin &&
        !roomData.isEditing &&
        roomData.isAnswering
      ) && (
        <Loading
          isAdmin={isAdmin}
          onClickStopVotingButton={onClickStopVotingButton}
        />
      )}
      {Boolean(
        !isAdmin &&
        !roomData.isEditing &&
        roomData.isAnswering &&
        !hasVoted
      ) && (
        <Answer
          onClickVote={onClickVote}
          question={roomData.question}
          numberOfOptions={roomData.numberOfOptions}
        />
      )}
      {Boolean(
        isAdmin &&
        !roomData.isEditing &&
        !roomData.isAnswering &&
        roomData.question !== ''
      ) && (
        <Result
          question={roomData.question}
          result={roomData.result}
          numberOfOptions={roomData.numberOfOptions}
          onAddNewQuestion={onAddNewQuestion}
        />
      )}
      {Boolean(
        !isAdmin &&
        roomData.question !== '' &&
        (hasVoted || !roomData.isAnswering)
      ) && <Loading isAdmin={isAdmin} isFirstQuestion={false} />}
    </div>
  )
}

export default Room
