// ------------imports---------------
import React, { memo, useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, makeStyles, Grid } from '@material-ui/core';

import { registerUser, clearError } from '../redux/user/userAction';
import { useDispatch, useSelector } from 'react-redux';
// ------------end imports-----------

// material ui style
const useStyles = makeStyles((theme) => ({
  register: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const Register = ({ history }) => {
  // state
  const classes = useStyles();
  const [email, setEmail] = useState('');

  const currentUser = useSelector((state) => state.user.currentUser);
  const errors = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      history.push('/chatroom');
    }
  }, [currentUser, history]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser({ email }));
  };
  // jsx
  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.register}>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                autoFocus
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {errors && (
                <Typography variant='subtitle1' color='error'>
                  {`* ${errors[0].message} !`}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default memo(Register);
