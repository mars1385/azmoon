import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import {
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPrivateRoom } from '../redux/room/roomAction';
import { clearError } from '../redux/user/userAction';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    margin: '20px auto',
  },
  grid: {
    textAlign: 'center',
    alignItems: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    height: 250,
    width: 550,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const PrivateRoomModal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const serverError = useSelector((state) => state.room.error);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearError());
  };

  const createPrivateRoomHandler = () => {
    dispatch(createPrivateRoom({ email }));
  };
  return (
    <div>
      <Button
        variant='contained'
        color='secondary'
        size='small'
        aria-label='add'
        endIcon={<AddIcon />}
        onClick={handleOpen}>
        Private Conversation
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Container component='main' maxWidth='sm' className={classes.paper}>
            <Typography variant='h6' className={classes.title}>
              Add Conversation
            </Typography>

            {serverError && (
              <Typography variant='body1' color='error'>
                {`* ${serverError[0].message}`}
              </Typography>
            )}
            <Grid container spacing={1} className={classes.grid}>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='Email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='primary'
                  type='submit'
                  onClick={() => createPrivateRoomHandler()}
                  className={classes.add}
                  endIcon={<SendIcon />}>
                  Add Conversation
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
};

export default PrivateRoomModal;
