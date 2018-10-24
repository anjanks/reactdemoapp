import React, { Component } from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Signup} from './signupModule/Signup';
import {HomePage} from './layoutModule/HomePage';
import {Login} from './loginModule/Login';
import { Userhome } from './loginModule/Userhome';
import { Addtask } from './tasksModule/Addtask';
import { Viewtask } from './tasksModule/Viewtask';
import { Modifytask } from './tasksModule/Modifytask';

class App extends Component {

  render() {
    
      return (
        <Router>
          <div>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/userhome" component={Userhome}/>
          <Route exact path="/addtask" component={Addtask}/>
          <Route exact path="/viewtask" component={Viewtask}/>
          <Route exact path="/modifytask" component={Modifytask}/>

          </div>
        </Router>
    );
  }
}

export default App;
