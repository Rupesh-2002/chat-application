const {Server} = require('socket.io')
const http = require('http')
// const cors = require('cors')
const httpserver = http.createServer()
const io = new Server(httpserver,{
    cors : "*"
})
const users = {}

io.on("connection", (socket)=>{
    socket.on('new-user-joined', (name)=>{
        socket.broadcast.emit('user-joined',name);
        socket.emit('joined',`welcome ${name}`);
        users[socket.id]= name;
    })

    socket.on('send',(data)=>{
        socket.broadcast.emit('receive',`${users[socket.id]}: ${data}`);
    })

} )

httpserver.listen(3000);