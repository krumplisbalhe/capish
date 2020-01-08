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
  if(roomId){
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
    }).then()
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
        socket.emit('roomUpdated', roomData)
      })
    })
    // knex('rooms').where({roomId: roomId}).update(data).then(res => {
    //   socket.broadcast.emit('roomUpdated', data)
    //   console.log(data)
    // })
  })
  socket.on('disconnect', () => {
    console.log('a user left')
  })
})

server.listen(8080, () => {
  console.log('listening on *:8080');
})
