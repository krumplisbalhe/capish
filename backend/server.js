const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

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
  table.json('result')
  table.boolean('isActive')
}).then()

// knex('rooms').insert({
//   question: 'Slaughterhouse Five',
//   creator: 'Stefan',
//   roomId:'jkjk67',
//   result: JSON.stringify({
//     'gfh78': '1'
//   }),
//   isActive: false
// }).then(res => {
//   console.log(res)
// })

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
      isActive: false,
      question: '',
      result: {}
    }
    knex('rooms').insert(data).then(res => {
      console.log(res)
      socket.emit('roomCreated', data)
    })
  })
  socket.on('update', data => {
    data.result = JSON.stringify(data.result)
    knex('rooms').where({roomId: roomId}).update(data).then(res => {
      socket.broadcast.emit('roomUpdated', data)
      console.log(data)
    })
  })
  socket.on('vote', voteData => {
    knex('rooms').where({roomId: roomId}).then(roomData=>{
      roomData = roomData[0]
      roomData.result = JSON.parse(roomData.result)
      roomData.result[voteData.answer].push(voteData.user)
      roomData.result = JSON.stringify(roomData.result)
      knex('rooms').where({roomId: roomId}).update({result: roomData.result}).then( res => {
        console.log(`${voteData.user} voted for ${voteData.answer}`)
        socket.broadcast.emit('roomUpdated', roomData)
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

http.listen(8080, () => {
  console.log('listening on *:8080');
})
