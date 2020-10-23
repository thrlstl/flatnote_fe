import React from 'react';
import resetButton from '../assets/images/reset-button.png';
import saveButton from '../assets/images/save-button.png';
import { connect } from 'react-redux';
import { createNote } from '../actions/notes';
import addNew from '../assets/images/plus.png';

class CreateNote extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: '',
            user_id: null
        }
    }

    componentDidMount() {
        this.setState({
            title:'♡',
            content:'',
            user_id: this.props.user.id
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleReset = (event) => {
        const titleForm = event.target.parentElement.parentElement.parentElement
        const contentForm = event.target.parentElement.parentElement.parentElement.nextElementSibling
        
        this.setState({
            title: '♡',
            content: '',
        })
        // titleForm.reset()
        // const noteCard = event.target.parentElement.parentElement.parentElement.parentElement
        // this.resetAnimation(noteCard)
        contentForm.reset()
        titleForm.reset()
    }

    handleSubmit = () => {
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },


            body: JSON.stringify({title: this.state.title, content:this.state.content, user_id: this.props.user.id})
        }
        fetch(`http://localhost:3001/api/v1/notes`, reqObj)
        .then(resp => resp.json())
        .then(note => {
            this.props.createNote(note)
        })
    }

    renderCreateNote = () => {
        return(
            <>
                <form id='new-note-form' className='note-header'>
                {/* <Link to={`note-details`}>Note {this.props.id}</Link> */}
                    <textarea type='text' name='title' placeholder={this.state.title} onChange={this.handleChange}/>
                    <div className='header-bottom'>
                        <div className='new-note-buttons'>
                        <img src={resetButton} className='reset-button' onClick={this.handleReset} />
                        <img src={saveButton} type='submit' className='save-button' onClick={this.handleSubmit} />
                        </div>
                    </div>
                </form>
                <form className='note-content'>
                    {/* <img src={addNew} className='add-new' /> */}
                    <textarea id='note-content-text' type='text' name='content' onChange={this.handleChange} placeholder={this.state.content}/>
                </form>
            </>
        )
    }

    render(){
        console.log(this.state)
        return(
           <div id='new-note-form' className='note-item'>{this.renderCreateNote()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    createNote
}

export default connect (mapStateToProps, mapDispatchToProps)(CreateNote);