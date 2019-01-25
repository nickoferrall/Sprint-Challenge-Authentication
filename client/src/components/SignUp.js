import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class SignUp extends Component {
  state = {
    username: 'Jay Elect',
    password: 'Test'
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
      const endpoint = 'http://localhost:3300/api/register';
      const res = await axios.post(endpoint, this.state);
      localStorage.setItem('jwt', res.data.token);
      console.log('Success!', res);
    } catch (error) {
      console.log('Error!', error);
    }
  };

  render() {
    console.log('state =', this.state.username);
    return (
      <div>
        <h1>Sign-Up Here</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label>Username</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <button>Sign-Up</button>
          </div>
          <div>Already have an account?</div>
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        </form>
      </div>
    );
  }
}

export default SignUp;
