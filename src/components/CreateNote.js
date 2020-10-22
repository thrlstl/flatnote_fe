import React from 'react';
import resetButton from '../assets/images/reset-button.png';
import saveButton from '../assets/images/save-button.png';
import { connect } from 'react-redux';
import { createNote } from '../actions/notes';

class CreateNote extends React.Component {
    constructor(){
        super()
        this.state = {
            title: 'FLATNOTE',
            content: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleReset = () => {
        debugger
    }

    handleSubmit = () => {
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        fetch(`http://localhost:3001/notes`, reqObj)
        .then(resp => resp.json())
        .then(note => {
            console.log(note)
            this.props.createNote(note)
            this.setState({
                title: '',
                content: ''
            })
        })
    }

    renderCreateNote = () => {
        return(
            <>
                <form id='new-note-form' className='note-header'>
                {/* <Link to={`note-details`}>Note {this.props.id}</Link> */}
                    <textarea type='text' name='title' placeholder={this.state.title} onChange={this.handleChange}/>
                    <div className='header-bottom'>
                            <div className='user'>
                            </div>
                        <div className='buttons'>
                        <img src={resetButton} className='reset-button' onClick={this.handleReset} />
                        <img src={saveButton} type='submit' className='save-button' onClick={this.handleSubmit} />
                        </div>
                    </div>
                </form>
                <form className='note-content'>
                    <textarea id='note-content-text' type='text' name='content' onChange={this.handleChange} placeholder={this.state.content}/>
                </form>
            </>
        )
    }

    render(){
        return(
           <div className='note-item'>{this.renderCreateNote()}</div>
        );
    }
}

const mapDispatchToProps = {
    createNote
}

export default connect (null, mapDispatchToProps)(CreateNote);