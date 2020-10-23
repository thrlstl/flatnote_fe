import React from 'react';
import './App.css';
import Note from './components/Note';
import { Switch, Route } from 'react-router-dom';
import NoteContainer from './components/NoteContainer';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
        <Switch>
          {/* <Login /> */}
          <Route exact path='/' component={Login} />
          <Route exact path='/dashboard' component={NoteContainer} />
        </Switch>
    </div>
  );
}

export default App;
