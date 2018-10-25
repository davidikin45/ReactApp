# Getting Started with React Router

## React Routing Example
* Server needs to be setup to always return index.html as routing is done client siding.
* Set <BrowserRouter basename="/"> to allow routing from a subdirectory.
* this.props.history.push('/page'); changes routes. Can o nly access in container components.
* In stateless components or class components not directly used by the router use import {withRouter} from 'react-router-dom'; and export default withRouter(post);
* By default link will always go to absolute path. for exampe a page example.com/abc would go to example.com/new-post and not example.com/abc/new-post.
```
import {Route, Link} from 'react-router-dom';
<Link to="/new-post">New Post</Link>
<Link to={{pathname:this.props.match.url + '/new-post'}}>New Post</Link>
```
* NavLink will automatically add the active class. use exact attribute.
```

<NavLink exact activeClassName="my-active" activeStyle={{color:'#fa923f', textDecoration:'underline'}} to="/">Home</NavLink>
```
* Switch makes it ao the first route that matches is output. Order is important.

1. install react-router-dom (No need to also instal react-router)
```
npm install --save react-router-dom
```
2. Add the BrowserRouter as top level App component and a Switch component within
```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, NavLink, Switch, Route } from 'react-router-dom'

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
              <li><NavLink exact to='/'>Home</NavLink></li>
              <li><NavLink exact to='/search'>Search</NavLink></li>
              <li><NavLink exact to='/list'>List</NavLink></li>
            </ul>
          <Switch>
              {this.state.auth ? <Route exact path="/new-post" component={NewPost} /> : null}
              <Route exact path='/' component={Root} />
              <Route path='/search' component={Search} />
              <Route path='/list' component={List} />
              <Route exact path="/posts/:id" component={FullPost} />
              <Redirect from="/" to="/posts" />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

```
3. Within a list you can link the item by wrapping in a Link component
```
<Link to={'/'+ post.id} key={post.id}>
                    <Post
                    title={post.title} 
                    author={post.author} 
                    clicked={() => this.postSelectedHandler(post.id)}/>
                </Link>); 
```
4. Alternatively you can change routes programatically
```
postSelectedHandler = (id) => {
        this.props.history.push({pathname:'/'+ id});
        //this.props.history.push('/'+ id);
    }

 <Post key={post.id}
                    title={post.title} 
                    author={post.author} 
                    clicked={() => this.postSelectedHandler(post.id)}/>
```
5. Access route params in componentDidMount by looking at this.props.match.params
```
import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state={
        loadedPost : null
    }
    async  componentDidMount(){
        if(this.props.match.params.id)
        {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id))
            {
                var response = await axios.get('/posts/' + this.props.match.params.id);
                this.setState({loadedPost: response.data});
            }
        }
    }

    deletePostHandler = async () =>
    {
        var response = await axios.delete('/posts/' + this.props.match.params.id);
        console.log(response);
    }

    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        if(this.props.id)
        {
            post = <p style={{textAlign:'center'}}>Loading...!</p>;
        }
        if(this.state.loadedPost)
        {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
       
        return post;
    }
}

export default FullPost;
```
6. Nested Route
```
<Route exact path={this.props.match.url+ "/:id"} component={FullPost} />
```
7. Can redirect in components by importing Redirect from react-router-dom and rendering conditionally
```
  render () {
        let redirect = null;
        if(this.state.submitted)
        {
            redirect= <Redirect to="/posts"/>;
        }
  }
```
8. Can also redirect by calling methods on this.props.history. <Redirect/>  has the same functionality as this.props.history.replace('/posts').
```
this.props.history.replace('/posts'); \\Replaces current page and cant go back.
this.props.history.push('/posts'); \\Adds to history so can go back.
this.props.history.goBack();
```

## Navigation guards
* Guards in React are implemented by not rendering the Route with Redirect.
```
<Switch>
              {this.state.auth ? <Route exact path="/new-post" component={NewPost} /> : null}
              <Route exact path='/' component={Root} />
              <Route path='/search' component={Search} />
              <Route path='/list' component={List} />
              <Route exact path="/posts/:id" component={FullPost} />
              <Redirect from="/" to="/posts" />
 </Switch>
 ```

 ## Navigation 404
* Create a catch all route
```
<Switch>
              {this.state.auth ? <Route exact path="/new-post" component={NewPost} /> : null}
              <Route exact path='/' component={Root} />
              <Route path='/search' component={Search} />
              <Route path='/list' component={List} />
              <Route exact path="/posts/:id" component={FullPost} />
              <Route render={()=><h1>Not found</h1>} />
 </Switch>
 ```

 ## Lazy Loading
 1. Create a new file hoc\asyncComponent.js
 ```
 import React, { Component } from 'react';

const asyncComponent = (importComponent) =>{
    return class extends Component {
        state = {  
            component: null
        }

        async componentDidMount(){
           const cmp = await importComponent();
            this.setState({component: cmp.default});
        }

        render() { 
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }

}
 
export default asyncComponent;
 ```
 2. In App.js
  ```
 import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => 
{
    return import('./NewPost/NewPost');
});

<Route exact path="/new-post" component={AsyncNewPost} />
 ```


## Authors

* **David Ikin**