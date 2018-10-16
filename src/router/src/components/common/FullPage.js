import React, { Component } from 'react';
import './FullPage.css';


import CodeCampMenu from './CodeCampMenu';
import PageTop from './PageTop';
import Footer from './Footer';
import Routes from './Routes';

class FullPage extends Component {

    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
    }

    handler(val) {
        this.props.action();
    }


    render() {
        return (
            <div>
                <PageTop>
                    <CodeCampMenu />
                </PageTop>
                <Routes  action={this.handler}  />
                <Footer />
            </div>
        );
    }
}

export default FullPage;
