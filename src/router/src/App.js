import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import Speakers from './components/speakers/Speakers'
import SpeakersRedux from './components/speakers/SpeakersRedux'

const Root = () => (
  <h2>Home component</h2>
)

const Search = () => (
  <h2>Search component</h2>
)

const List = () => (
  <h2>List component</h2>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/search'>Search</Link></li>
              <li><Link to='/list'>List</Link></li>
              <li><Link to='/speakers'>Speakers</Link></li>
              <li><Link to='/speakers-redux'>Speakers Redux</Link></li>
            </ul>
          <Switch>
              <Route exact path='/' component={Root} />
              <Route path='/search' component={Search} />
              <Route path='/list' component={List} />
              <Route exact path='/speakers' component={Speakers} />
              <Route exact path='/speakers-redux' component={SpeakersRedux} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
