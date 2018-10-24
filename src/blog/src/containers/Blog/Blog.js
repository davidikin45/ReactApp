import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './Blog.css';

import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => 
{
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state={
        auth: false
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink activeClassName="active" activeStyle={{color:'#fa923f', textDecoration:'underline'}} to="/posts">Posts</NavLink></li>
                            <li><NavLink activeClassName="active" exact to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                   <Route exact path="/new-post" component={AsyncNewPost} />
                    <Route path="/posts" component={Posts} /> 
                    <Route render={()=><h1>Not found</h1>} />
                 {/*    <Redirect from="/" to="/posts" /> */}
                   {/*  <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog; 