import React, { Component } from 'react';

export class Nonloginmenu extends Component {

 render() {
    
      return (
        
        <div >
         <nav className="nav">
            <a className="nav-link active" href="/">Home</a>
            <a className="nav-link" href="/signup">Sign up</a>
            <a className="nav-link" href="/login">Login</a>
            

            
        </nav>
          Welcome to Demo App of React for Ironhack!!
         
          </div>
        
    );
  }
}


