import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteNote } from '../actions/notes';
import { updateNotes } from '../actions/notes';
import deleteButton from '../assets/images/delete-button.png';
import resetButton from '../assets/images/reset-button.png';
import saveButton from '../assets/images/save-button.png'

class Note extends React.Component {
    constructor(){
        super()
        this.state = {
            title: '',
            content: ''
        }
    }

    componentDidMount() {
        // debugger
        this.setState({
            title: this.props.title,
            content: this.props.content
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // resetAnimation = (note) => {
    //     note.style.animationName = 'wobble-hor-bottom'
    //     note.style.animationDuration = '.8s'
    // }

    handleReset = (event) => {
        const titleForm = event.target.parentElement.parentElement.parentElement
        const contentForm = event.target.parentElement.parentElement.parentElement.nextElementSibling
        
        this.setState({
            title: this.props.title,
            content: this.props.content,
        })
        // titleForm.reset()
        // const noteCard = event.target.parentElement.parentElement.parentElement.parentElement
        // this.resetAnimation(noteCard)
        contentForm.reset()
        titleForm.reset()
    }

    deleteAnimation = (id, event) => {
        const noteCard = event.target.parentElement.parentElement.parentElement.parentElement
        noteCard.style.animationName = 'scale-out-horizontal'
        noteCard.style.animationDuration = '.5s'

        setTimeout(() => this.handleDelete(id, event), 500)
    }

    handleDelete = (id, event) => {
       fetch(`http://localhost:3001/api/v1/notes/${id}`, { method : 'DELETE'})
       .then(resp => resp.json())
       .then(note => {
        this.props.deleteNote(id)
       })
    }

    handleUpdate = () => {
        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        fetch(`http://localhost:3001/api/v1/notes/${this.props.id}`, reqObj)
        .then(resp => resp.json())
        .then(note => {
            this.props.updateNotes(note)
        })
        this.setState({
            title: this.props.title,
            content: this.props.content
        })
    }

    renderNote = () => {
        return(
            <>
                <form className='note-header' onSubmit={this.handleUpdate}>
                {/* <Link to={`note-details`}>Note {this.props.id}</Link> */}
                    <textarea type='text' name='title' placeholder={this.props.title} onChange={this.handleChange}/>
                    <div className='header-bottom'>
                            <div className='user'>
                                <div className='username'>{this.props.user.username}</div>
                            </div>
                        <div className='buttons'>
                        <img src={deleteButton} className='delete-button' onClick={(event) => this.deleteAnimation(this.props.id, event)} />
                        <img src={resetButton} className='reset-button' onClick={this.handleReset} />
                        <img src={saveButton} type='submit' className='save-button' onClick={this.handleUpdate} />
                        {/* <button type='reset' onClick={this.handleReset}>Reset</button> */}
                        {/* <input type='submit' src={saveButton} value=''/> */}
                        </div>
                    </div>
                </form>
                <form className='note-content'>
                    {/* <p className='note-content-text'>{this.props.content}</p> */}
                    {/* <p className='text-area-container'> */}
                    <textarea id='note-content-text' type='text' name='content' onChange={this.handleChange} defaultValue={this.props.content}/>
                    {/* {this.props.content}</textarea> */}
                    {/* </p> */}
                </form>
            </>
        )
    }

    render(){
        return(
           <div className='note-item'>{this.renderNote()}</div>
        );
    }
}

const mapDispatchToProps = {
    deleteNote,
    updateNotes
}

export default connect (null, mapDispatchToProps)(Note);
