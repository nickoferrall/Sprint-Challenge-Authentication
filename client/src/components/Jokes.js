import React, { Component } from 'react';
import axios from 'axios';

class Jokes extends Component {
  state = {
    jokes: []
  };

  async componentDidMount() {
    const endpoint = 'http://localhost:3300/api/jokes';
    try {
      const token = localStorage.getItem('jwt');
      const requestOptions = {
        headers: {
          authorization: token
        }
      };
      const response = await axios.get(endpoint, requestOptions);
      this.setState({
        jokes: response.data
      });
    } catch (error) {
      console.log('Unable to get the jokes!');
    }
  }

  render() {
    console.log('State jokes', this.state.jokes);
    return (
      <div>
        <h1>Jokaaa</h1>
        {this.state.jokes.map(item => (
          <li>{item.joke}</li>
        ))}
      </div>
    );
  }
}

export default Jokes;
