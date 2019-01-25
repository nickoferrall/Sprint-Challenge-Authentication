import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class SignIn extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    try {
      event.preventDefault();
      const loginEndpoint = 'http://localhost:3300/api/login';
      const loginRes = await axios.post(loginEndpoint, this.state);
      localStorage.setItem('jwt', loginRes.data.token);
      this.props.history.push('/jokes');
      console.log('End of handlesubmit!', loginRes);
    } catch (error) {
      console.log('Error!', error);
    }
  };

  render() {
    return (
      <div>
        <h1>Sign-In</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="username"
              placeholder="Enter username..."
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <input
              name="password"
              placeholder="Enter password..."
              value={this.state.password}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <button>Login</button>
          </div>
          <div>Don't have an account?</div>
          <NavLink to="/">
            <button>Sign-Up</button>
          </NavLink>
        </form>
      </div>
    );
  }
}

export default SignIn;
