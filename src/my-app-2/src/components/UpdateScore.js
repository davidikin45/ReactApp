import React, { Component } from 'react';
import { connect } from 'react-redux';
 
class UpdateScore extends Component {
    state = {  }
    render() { 
        return (<div></div>);
    }
}
 
export default connect((state, props) =>{
    console.log('connect state', state);
    console.log('connect props', props);

    //return new props
    return {
        originAmount: state.originAmount
    }
})(UpdateScore);