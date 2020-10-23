import React from 'react';
import { connect } from 'react-redux';
import { loginSuccess } from '../actions/auth'


class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: null
  }

  handleInputChange = (e) => { 
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(this.state)
    }

    fetch('http://localhost:3001/api/v1/auth', reqObj)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
      if (data.error) {
        this.setState({
          error: data.error
        })
      } else {
        this.props.loginSuccess(data)
        this.props.history.push('/dashboard')

        // update our store with the user
        // redirect to the dashboard page
      }
    })


  }

  render(){
    return (
      <div className='login-container'>
          <div className='logo'></div>
       { this.state.error && <h4 style={{ color: 'red'}}>{this.state.error}</h4> }
        <form className='login' onSubmit={this.handleSubmit}>
          <input className='login-username' name={'username'} onChange={this.handleInputChange} placeholder='Username' />
          <input className='password' name={'password'} onChange={this.handleInputChange} placeholder='Password' />
          <input className='login-button' type='submit' value='LOGIN' />
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth
//   }
// }


const mapDispatchToProps = {
  loginSuccess
}


export default connect(null, mapDispatchToProps)(Login)
