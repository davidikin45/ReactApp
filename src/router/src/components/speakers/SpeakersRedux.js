import React, {Component} from 'react';

import SpeakersHeader from './SpeakersHeader';
import SpeakerList from './SpeakerList';
//import axios from 'axios';

import { connect } from 'react-redux';
import { speakersFetchData } from "../../redux/actions/speakers"

class SpeakersRedux extends Component {
    state = {
        isLoading: true,
        appData: []
    };

    componentDidMount() {
        this.props.speakersFetchData();
        // axios.get('/data/speakers.json')
        //     .then((result)=> {
        //          this.setState({
        //              appData: result.data,
        //              isLoading: false
        //          });
        //      })
        //      .catch(error => {
        //          if (error.response) {
        //              console.log(error.responderEnd);
        //          }
        //      });
    }

    render() {
        if (this.props.isLoading) {
             return <span><i>Loading...</i></span>
         }
         else if (this.props.hasErrored) {
            return <span><b>Failed to load data:{this.props.errorMessage}</b></span>
        }
         else {
            return (
                <div>
                    <SpeakersHeader/>
                    <SpeakerList speakers={this.props.speakers} />
                     {/*<span>{JSON.stringify(this.state.appData)}</span>*/}
                 </div>
             );
         }
    }
} 

const mapStateToProps = (state) => {
    return{
        speakers: state.speakers.data,
        hasErrored: state.speakers.hasErrored,
        isLoading: state.speakers.isLoading,
        errorMessage: state.speakers.errorMessage
    };
};

//export default SpeakersRedux;
export default connect(mapStateToProps,{speakersFetchData})(SpeakersRedux)