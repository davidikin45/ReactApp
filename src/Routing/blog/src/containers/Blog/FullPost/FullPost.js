import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state={
        loadedPost : null
    }
    async componentDidMount(){
        await this.loadData();
    }

    async componentDidUpdate(){
        await this.loadData();
    }

    async loadData()
    {
        if(this.props.match.params.id)
        {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != this.props.match.params.id))
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
        if(this.props.match.params.id)
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