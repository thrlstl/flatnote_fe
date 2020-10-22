import React from 'react';
import './App.css';
import Note from './components/Note';
import { Switch, Route } from 'react-router-dom';
import NoteContainer from './components/NoteContainer';

function App() {
  return (
    <div className="App">
        <Switch>
          {/* <Route path='/note-details' component={Note} /> */}
          <Route path='/' component={NoteContainer} />
        </Switch>
    </div>
  );
}

export default App;
