const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: "./db.sqlite"
  }
})

knex.schema.createTable('rooms', table => {
  table.increments()
  table.string('creator')
  table.string('roomId')
  table.string('question')
  table.string('result')
  table.integer('numberOfOptions')
  table.boolean('isEditing')
  table.boolean('isAnswering')
}).then()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

io.on('connection', socket => {
  const roomId = socket.handshake.query.roomId
  console.log('a user connected', roomId)
  //if we already have a roomId, for example a new person joins to the room
  if(roomId){
    //we need the first element of the array because we get it back the data from the db as an array
    knex('rooms').where({roomId: roomId}).then(data=>{
      socket.emit('roomUpdated', data[0])
    })
  }
  socket.on('create', hashedUser => {
    console.log(hashedUser)
    const randomRoomId = Math.random().toString(36).substring(2,7)
    const data = {
      creator: hashedUser,
      roomId: randomRoomId,
      isEditing: false,
      isAnswering: false,
      question: '',
      result: '{}',
      numberOfOptions: 0
    }
    //we put it inside the then so it happens after its inserrted into the db
    knex('rooms').insert(data).then(res => {
      socket.emit('roomCreated', data)
    })
  })
  socket.on('update', data => {
    data.result = JSON.stringify(data.result)
    console.log(data.roomId, data)
    knex('rooms').where('roomId', data.roomId).update({
      isEditing: data.isEditing,
      isAnswering: data.isAnswering,
      question: data.question,
      result: data.result,
      numberOfOptions: data.numberOfOptions
    }).then(() => {
      //when the admin makes changes, he just saves it locally and broadcasts the data to everyone else
      knex('rooms').where('roomId', data.roomId).then(newData => {
        socket.broadcast.emit('roomUpdated', newData[0])
        console.log(newData)
      })
    })
    socket.broadcast.emit('roomUpdated', data)
  })
  socket.on('vote', voteData => {
    console.log(voteData)
    knex('rooms').where('roomId', voteData.roomId).then(roomData=>{
      roomData = roomData[0]
      roomData.result = JSON.parse(roomData.result)
      roomData.result[voteData.answer].push(voteData.user)
      roomData.result = JSON.stringify(roomData.result)
      knex('rooms').where('roomId', voteData.roomId).update({result: roomData.result}).then( res => {
        console.log(`${voteData.user} voted for ${voteData.answer}`)
        socket.broadcast.emit('roomUpdated', roomData)
      })
    })
  })
  socket.on('disconnect', () => {
    console.log('a user left')
  })
})

server.listen(8080, () => {
  console.log('listening on *:8080');
})
