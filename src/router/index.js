import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '@pages/main';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Main}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
