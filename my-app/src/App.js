import {Navbar, NavbarBrand} from 'reactstrap';
import React, {Component} from 'react';
import Main from "./components/MainComponent";
import './App.css';

class App extends Component{


  render()
  {
    return (
        <div>
          <Main/>
        </div>
    );
  }
}

export default App;
