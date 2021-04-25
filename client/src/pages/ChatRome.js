import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {
  Container,
  makeStyles,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Fab,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { socket } from '../utils/socket';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, setChatRoom, clear } from '../redux/chat/chatAction';
import {
  getPrivateRooms,
  getPublicRooms,
  addPublicRoom,
  createPrivateRoom,
  createPublicRoom,
} from '../redux/room/roomAction';
// material ui style
const useStyles = makeStyles((theme) => ({
  chatroom: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(1),
  },
  container: {
    padding: 0,
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  borderLeft500: {
    borderLeft: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '60vh',
    overflowY: 'auto',
  },
}));

const ChatRome = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [message, setMassage] = useState('');
  const [search, setSearch] = useState('');
  const messages = useSelector((state) => state.chat.messages);

  const currentUser = useSelector((state) => state.user.currentUser);
  const currentChatRoom = useSelector((state) => state.chat.room);

  const privateRooms = useSelector((state) => state.room.privateRooms);
  const publicRooms = useSelector((state) => state.room.publicRooms);

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    } else {
      dispatch(getPublicRooms());
      dispatch(getPrivateRooms());
    }
  }, [currentUser, history]);

  useEffect(() => {
    if (currentChatRoom) {
      socket.emit('joinRoom', { room: currentChatRoom });

      socket.once('roomMessages', (messagesInfo) => {
        // const msgs = messagesInfo.map((info) => info.message);
        if (messagesInfo.length > 0) {
          dispatch(getMessages(messagesInfo));
        }
      });
    }

    socket.on('message', (messageInfo) => {
      console.log(messageInfo);
      const msgInfo = {
        message: messageInfo.message,
        type: messageInfo.type,
        sender: messageInfo.sender,
        senderName: messageInfo.senderName,
        room: messageInfo.room,
      };
      dispatch(getMessages(msgInfo));
    });

    return () => {
      socket.off('message');
      socket.off('send-message');
      socket.off('roomMessages');
      socket.off('joinRoom');
      dispatch(clear());
    };
  }, [currentChatRoom]);

  const sendMassage = () => {
    console.log(currentUser);
    const msgInfo = {
      message,
      type: 'text',
      sender: currentUser.userId,
      senderName: currentUser.userName,
      room: currentChatRoom,
    };
    socket.emit('send-message', msgInfo);
  };

  const sendFileHandler = (files) => {
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    files.forEach(async (file) => {
      let formData = new FormData();
      formData.append('file', file);
      const upload = await axios.post('/message/uploads', formData, config);
      const msgInfo = {
        message: upload.data.upload,
        type: upload.data.type,
        sender: currentUser.userId,
        senderName: currentUser.userName,
        room: currentChatRoom,
      };
      socket.emit('send-message', msgInfo);
    });
  };

  const onRoomClick = (data) => {
    console.log(data);
    dispatch(setChatRoom(data.name));
    // socket.emit('joinRoom', { room: currentChatRoom });
  };

  const privateSearch = () => {};
  const publicSearch = () => {
    console.log(search);
  };
  return (
    <Container component='main' className={classes.container}>
      <div className={classes.chatroom}>
        <Grid container style={{ marginBottom: 6 }}>
          <Grid item xs={9}>
            <TextField
              id='room'
              name='room'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              label='Search for publicRoom or privateContact'
              variant='outlined'
              style={{ marginRight: 12, width: '50%' }}
              placeholder='Search for publicRoom or privateContact'
            />
            <Button
              onClick={() => publicSearch()}
              color='primary'
              size='small'
              variant='contained'
              style={{ marginRight: 6 }}>
              Search Public
            </Button>
            <Button onClick={() => privateSearch()} color='primary' size='small' variant='contained'>
              Search Private
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h6' color='secondary'>
              {currentChatRoom}
            </Typography>
          </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={2} className={classes.borderRight500}>
            <List>
              {publicRooms &&
                publicRooms.map((room) => (
                  <ListItem button key={room._id}>
                    <ListItemText onClick={() => onRoomClick(room)} primary={room.name}></ListItemText>
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item xs={7}>
            <List className={classes.messageArea}>
              {messages &&
                messages.map((message, index) => {
                  if (message.type === 'text') {
                    return (
                      <ListItem button key={`${currentUser.id}${message.message}${index}`}>
                        <ListItemText>{message.message}</ListItemText>
                        <ListItemText>{`from ${message.senderName}`}</ListItemText>
                      </ListItem>
                    );
                  } else if (message.type.includes('image/')) {
                    return (
                      <ListItem button key={`${currentUser.id}${message.message}${index}`}>
                        <img
                          style={{ maxWidth: '200px' }}
                          src={`http://localhost:5000/${message.message}`}
                          alt='img'
                        />
                        <ListItemText>{`from ${message.senderName}`}</ListItemText>
                      </ListItem>
                    );
                  } else if (message.type.includes('video/')) {
                    return (
                      <ListItem button key={`${currentUser.id}${message.message}${index}`}>
                        <video
                          style={{ maxWidth: '200px' }}
                          src={`http://localhost:5000/${message.message}`}
                          alt='video'
                          type='video/mp4'
                          controls
                        />
                        <ListItemText>{`from ${message.senderName}`}</ListItemText>
                      </ListItem>
                    );
                  } else {
                    return (
                      <ListItem button key={`${currentUser.id}${message.message}${index}`}>
                        <a href={`http://localhost:5000/${message.message}`}>{message.message}</a>
                        <ListItemText>{`from ${message.senderName}`}</ListItemText>
                      </ListItem>
                    );
                  }
                })}
            </List>
            <Divider />
            <Grid container style={{ padding: '20px' }}>
              <Grid item xs={10}>
                <TextField
                  id='outlined-basic-email'
                  value={message}
                  onChange={(e) => {
                    setMassage(e.target.value);
                  }}
                  label='Type Something'
                  fullWidth
                />
              </Grid>
              <Grid item xs={1} align='right'>
                <Dropzone onDrop={sendFileHandler}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <IconButton color='primary' component='span'>
                          <AttachmentIcon />
                        </IconButton>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Grid>
              <Grid item xs={1} align='right'>
                <Fab color='primary' aria-label='add' onClick={() => sendMassage()}>
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} className={classes.borderLeft500}>
            <List>
              {privateRooms &&
                privateRooms.map((room) => (
                  <ListItem button key={room._id}>
                    <ListItemText onClick={() => onRoomClick(room)} primary={room.name}></ListItemText>
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ChatRome;
