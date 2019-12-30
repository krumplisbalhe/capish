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
  console.log('a user connected')
  socket.on('create', hashedUser => {
    console.log(hashedUser)
    const randomRoomId = Math.random().toString(36).substring(2,7)
    knex('rooms').insert({
      creator: hashedUser,
      roomId: randomRoomId,
      isActive: false
    }).then(res => {
      console.log(res)
      io.emit('roomCreated', randomRoomId)
    })
  })
  socket.on('disconnect', () => {
    console.log('a user left')
  })
})

http.listen(8080, () => {
  console.log('listening on *:8080');
})
