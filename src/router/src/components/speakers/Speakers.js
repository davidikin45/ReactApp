import React, {Component} from 'react';

import SpeakersHeader from './SpeakersHeader';
import SpeakerList from './SpeakerList';
import axios from 'axios';

//import { connect } from 'react-redux';
//import { speakersFetchData } from ".././../../redux/actions/speakers";

class Speakers extends Component {
    state = {
        isLoading: true,
        appData: []
    };

    componentDidMount() {
        axios.get('/data/speakers.json')
            .then((result)=> {
                 this.setState({
                     appData: result.data,
                     isLoading: false
                 });
             })
             .catch(error => {
                 if (error.response) {
                     console.log(error.responderEnd);
                 }
             });
    }

    render() {
        if (this.state.isLoading) {
             return <span><i>Loading...</i></span>
         }
         else {
            return (
                <div>
                    <SpeakersHeader/>
                    <SpeakerList speakers={this.state.appData} />
                     {/*<span>{JSON.stringify(this.state.appData)}</span>*/}
                 </div>
             );
         }
    }
}

export default Speakers;