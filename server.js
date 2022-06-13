const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http) // giving http server

io.on('connection', (socket) => { // when client connected this will be called
    console.log('Connected...') // any browser connected to server
    socket.on('message', (msg) => { //listenign to event  from client 
         socket.broadcast.emit('message', msg)//it will give us messgae that comes from client. so now return this message to all clients or browsers conn to this socket or server
     })//broadcast means send to all except the one hat sent it because it is inserted in dom

})