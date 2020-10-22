import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadNotes } from '../actions/notes';
import Note from './Note';
import CreateNote from './CreateNote'

class NoteContainer extends React.Component {

    componentDidMount(){
        fetch('http://localhost:3001/notes')
        .then(resp => resp.json())
        .then(notes => {
            this.props.loadNotes(notes)
        })
    }

    renderNotes = () => {
        return this.props.notes.map(note =>
            <Note key={note.id} {...note} />
        )
    }

    render(){
        return(
            <div className='note-container'>
            <CreateNote />
            {this.renderNotes()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

const mapDispatchToProps = {
    loadNotes
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
