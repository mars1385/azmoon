import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ChatRome from './pages/ChatRome';
import { getUserInfo, logoutUser } from './redux/user/userAction';
import setAuthHeader from './utils/setAuthHeader';
import jwt_decode from 'jwt-decode';

function App() {
  React.useEffect(() => {
    // store.dispatch(getUserInfo());
    if (localStorage.jwt_token) {
      setAuthHeader(localStorage.jwt_token);

      store.dispatch(getUserInfo());
      const decodedToken = jwt_decode(localStorage.jwt_token);

      const now = Date.now() / 1000;
      if (decodedToken.exp < now) {
        store.dispatch(logoutUser());

        window.location.href = '/login';
      }
    }
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/chatroom' component={ChatRome} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
