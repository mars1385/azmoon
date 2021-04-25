// ------------imports---------------
import React, { memo, useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, makeStyles, Grid } from '@material-ui/core';

import { loginUser } from '../redux/user/userAction';
import { useDispatch, useSelector } from 'react-redux';
// ------------end imports-----------

// material ui style
const useStyles = makeStyles((theme) => ({
  Login: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const Login = ({ history }) => {
  // state
  const classes = useStyles();
  const [email, setEmail] = useState('');

  const currentUser = useSelector((state) => state.user.currentUser);
  const errors = useSelector((state) => state.user.error);

  useEffect(() => {
    if (currentUser) {
      history.push('/chatroom');
    }
  }, [currentUser, history]);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email }));
  };
  // jsx
  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.Login}>
        <Typography component='h1' variant='h5'>
          Login
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
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default memo(Login);
