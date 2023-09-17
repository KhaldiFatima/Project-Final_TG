// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Chat, Register, NotFound, Login } from './views/index';

import Auth from './Auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  Auth.init();

  return (
    <div id='main-container' className='container-fluid'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={Auth.auth() ? <Chat /> : <Navigate to='/login' />}
          ></Route>
          <Route
            path='/register'
            element={Auth.guest() ? <Register /> : <Navigate to='/' />}
          ></Route>
          <Route
            path='/login'
            element={Auth.guest() ? <Login /> : <Navigate to='/' />}
          ></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
