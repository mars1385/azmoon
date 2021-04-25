import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, makeStyles, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/user/userAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  link: {
    color: '#fafafa',
    textAlign: 'center',
    textDecoration: 'none',
  },
  auth: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const Header = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const classes = useStyles();

  const handleLogoutUser = (event) => {
    dispatch(logoutUser());
  };

  // --
  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.link} to='/'>
              Chat App
            </Link>
          </Typography>
          {currentUser ? (
            <div className={classes.auth}>
              <Typography variant='subtitle1'>{`welcome ${currentUser.userName}`}</Typography>
              <Button color='inherit' onClick={() => handleLogoutUser()}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button color='inherit'>
                <Link className={classes.link} to='/login'>
                  Login
                </Link>
              </Button>
              <Button color='inherit'>
                <Link className={classes.link} to='/register'>
                  Register
                </Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default React.memo(Header);
