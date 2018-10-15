import React, { Component } from 'react';
import AppPresentaion from './app-presentation'

class App extends Component {
  state = {};

  componentDidMount(){
    //Good place to fetch data
    this.fetchHouses();
  }

  fetchHouses =() =>{
    fetch('/houses.json')
    .then(rsp => rsp.json()) 
    .then(allHouses => {
      this.allHouses = allHouses;
      console.log(allHouses);
      this.determineFeaturedHouse();
      this.determineUniqueCountries();
    })
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map(h => h.country)))
      : [];
    countries.unshift(null);
    this.setState({ countries });
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse =  this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    };
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  setActiveHouse = (house) => {
    this.setState({ activeHouse: house });
  }

  render() {
    return (
     <AppPresentaion country={this.state.country}
      filterhouses={this.state.filteredHouses}
      featuredHouse={this.state.featuredHouse}
      countries={this.state.countries} filteredHouses={this.filterHouses}
      activeHouse={this.state.activeHouse} setActiveHouse={this.setActiveHouse} />
    );
  }
}

export default App;
