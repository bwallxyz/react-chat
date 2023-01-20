const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3002',
        methods: ['GET', 'POST'],
    },
})

const PORT = 3508

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    })

})

app.get('/', (req, res) => {
    res.send('Hello World')
})