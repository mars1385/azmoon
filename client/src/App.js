import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ChatRome from './pages/ChatRome';
import { getUserInfo } from './redux/user/userAction';

function App() {
  React.useEffect(() => {
    store.dispatch(getUserInfo());
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
