import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class SignUp extends Component {
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
      const endpoint = 'http://localhost:3300/api/register';
      const res = await axios.post(endpoint, this.state);
      localStorage.setItem('jwt', res.data.token);

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
    console.log('state =', this.state.username);
    return (
      <div>
        <h1>Sign-Up Here</h1>
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
            <button>Sign-Up</button>
          </div>
          <div>Already have an account?</div>
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
          <NavLink to="/jokes">
            <button>Jokes</button>
          </NavLink>
        </form>
      </div>
    );
  }
}

export default SignUp;
