import React, { Component } from 'react';
import logo from '../../assets/svg/logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
import Routes from './Routes';


class App extends Component {
    constructor(props){
      super(props);
      this.handler = this.handler.bind(this);
    }

  handler(val) {
      this.props.action();
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/search'>Search</Link></li>
              <li><Link to='/list'>List</Link></li>
              <li><Link to='/speakers'>Speakers Axios</Link></li>
              <li><Link to='/speakers-redux'>Speakers Redux</Link></li>
            </ul>
            <Routes action={this.handler}  />
        </div>
    );
  }
}

export default App;
