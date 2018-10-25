import React, { Component } from 'react';
import api from '../../../api';

import Post from '../../../components/Post/Post';
import './Posts.css';

import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state={
        posts: []
    }

    async componentDidMount(){
        try
        {
            var response = await api.get('/posts');
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post=>{
                return {...post, author:'Max'};
            });
            this.setState({posts: updatedPosts});
        }
        catch(err)
        {
            console.log(err);
        }
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/'+ id);
    }

    render() { 
        let posts = <p style={{textAlign:'center'}}>Something went wrong!</p>
        if(!this.state.error)
        {
             posts = this.state.posts.map(post=>{
                return (
                //<Link to={'/'+ post.id}>
                    <Post key={post.id}
                    title={post.title} 
                    author={post.author} 
                    clicked={() => this.postSelectedHandler(post.id)}/>
               // </Link>
               );
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                 <Route exact path={this.props.match.url+ "/:id"} component={FullPost} />
            </div>
          );
    }
}
 
export default Posts;