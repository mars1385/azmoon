// -----------------imports-----------------
require('colors');
const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const errorsHandler = require('./middleware/errorsHandler');
const { dbConnection } = require('./config/dataBase');
const session = require('express-session');
const connectRedis = require('connect-redis');
const Redis = require('ioredis');
const cors = require('cors');
const Room = require('./models/Room');
const Message = require('./models/Message');
const fileupload = require('express-fileupload');
// -----------------end---------------------
//env
if (process.env.NODE_ENV !== 'development') require('dotenv/config');

const app = express();

// connect to dataBase
dbConnection(process.env.DATA_BASE_URL);
// redis & session

const redisClient = new Redis(process.env.REDIS_URL);

const redisSessionStore = connectRedis(session);
app.use(
  session({
    name: process.env.COOKIE_NAME,
    store: new redisSessionStore({
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    },
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

// middleware
app.use(express.json());
app.use(fileupload());
app.use(cors());

// sending to routers
app.use('/user', require('./routers/userRoute'));
app.use('/room', require('./routers/roomRoute'));
app.use('/contact', require('./routers/contactsRoute'));
app.use('/message', require('./routers/messageRoute'));

// error
app.use(errorsHandler);

app.use('/', express.static(path.join(__dirname, '/uploads')));

const server = http.createServer(app);
const io = socketio(server);
// --------------- chat with socket -------------------------------
io.on('connection', async (socket) => {
  console.log('Client connected');

  socket.on('joinRoom', async ({ room }) => {
    console.log('joinRoom');
    socket.join(room);

    console.log(room);

    const roomInfo = await Room.findOne({ name: room });

    const roomMessages = await Message.find({ room: roomInfo.id });
    // Send users and room info
    io.to(room).emit('roomMessages', roomMessages);
  });
  socket.on('send-message', async (info) => {
    console.log('send-message');
    const roomInfo = await Room.findOne({ name: info.room });
    console.log(info);
    const messageInfo = await Message.create({
      message: info.message,
      sender: info.sender,
      type: info.type,
      senderName: info.senderName,
      room: roomInfo.id,
    });
    io.to(info.room).emit('message', {
      userName: messageInfo.sender,
      message: messageInfo.message,
      sender: info.sender,
      senderName: info.senderName,
      type: messageInfo.type,
    });
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// --------------- chat with socket -------------------------------
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server is running in ${process.env.NODE_ENV} mode and on prot : ${PORT}`.blue.underline.bold);
});
