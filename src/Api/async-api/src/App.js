import React, { Component } from 'react';
import './App.css';

import api from './Api';

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

async componentDidMount() {
  try
  {
    var data = await api.getDataAsync();
    this.setState({ data: data });
  }
  catch (error) {
    console.log(error);
  }
 }

/* componentDidMount()
{
  api.getData()
  .then(data => this.setState({ data: data }));
} */

 
/* componentDidMount()
{
  api.getDataAsync()
  .then(data => this.setState({ data: data }))
  .catch(error => console.log(error));
} */

  render() {
    return (
      <div>
        <ul>
          {this.state.data.map(el => (
            <li>
              {el.name}: {el.price_usd}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;