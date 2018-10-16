import React, {Component} from 'react';

import {Route, Switch} from 'react-router-dom';

import Speakers from "../../components/speakers/Speakers";
import SpeakersRedux from "../../components/speakers/SpeakersRedux";

const Root = () => (
    <h2>Home component</h2>
  )
  
  const Search = () => (
    <h2>Search component</h2>
  )
  
  const List = () => (
    <h2>List component</h2>
  )

class Routes extends Component {
    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
    }

    handler() {
        this.props.action();
    }

    render() {
        return (
            <div>
            <Switch>
                <Route exact path='/' component={Root} />
                <Route path='/search' component={Search} />
                <Route path='/list' component={List} />
                <Route exact path='/speakers' component={Speakers} />
                <Route exact path='/speakers-redux' component={SpeakersRedux} />
            </Switch>
            </div>
        );
    }
}

export default Routes;