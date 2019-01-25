import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Jokes from './components/Jokes';

class App extends Component {
  render() {
    return (
      <div>
        <h1>The Home of Dad Jokes</h1>
        <main>
          <Route exact path="/" component={SignUp} />
          <Route path="/login" component={SignIn} />
          <Route path="/jokes" component={Jokes} />
        </main>
      </div>
    );
  }
}

export default App;
