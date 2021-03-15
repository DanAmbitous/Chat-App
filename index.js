const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 5815;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const idComponents = ['a', 'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',1,2,3,4,5,6,7,8,9,0];

const idGenerator = () => {
  let userId = "";

  while (userId.length < 6) {
    userId += idComponents[Math.floor(Math.random() * idComponents.length)];
  }
  
  return `#${userId}`
}

io.on('connection', (socket) => {
  socket.on('register', (username) => {
    if (username === null || username.length === 0) {
      username = idGenerator();
    }
    console.log(`${username} has joined the chat`);
    io.emit('public message', `${username} has joined the chat`);
  })

  socket.on('public message', (msg) => {
    console.log(msg);
    io.emit('public message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});