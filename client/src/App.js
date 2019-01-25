import React, { Component } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Jokes from './components/Jokes';

class App extends Component {
  render() {
    return (
      <div>
        <h1>The Home of Dad Jokes</h1>
        <div>
          <SignUp />
        </div>
      </div>
    );
  }
}

export default App;
