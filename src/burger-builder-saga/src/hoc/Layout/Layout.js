import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../Wrap'

import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideMenu from '../../components/Navigation/SideMenu/SideMenu'

class Layout extends Component {
    state = {
        showSideMenu: false
    }
    
    sideMenuClosedHandler = () => {
        this.setState({showSideMenu: false});
    }

    sideMenuToggleHandler = () => {
        //this.setState({showSideMenu: !this.state.showSideMenu});
        this.setState((prevState) => {
            return {showSideMenu: !prevState.showSideMenu};
        });
    }

    render()
    {
        return (
        <Aux>
            <Toolbar 
            isAuth={this.props.isAuthenticated}
            sideMenuToggleClicked={this.sideMenuToggleHandler}  />
            <SideMenu 
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideMenu} closed={this.sideMenuClosedHandler}  />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return {
     
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Layout);