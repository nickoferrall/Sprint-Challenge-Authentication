import React, { Component } from 'react';
import axios from 'axios';

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

  render() {
    return (
      <div>
        <h1>Sign-Up Here</h1>
        <form>
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
        </form>
      </div>
    );
  }
}

export default SignUp;
