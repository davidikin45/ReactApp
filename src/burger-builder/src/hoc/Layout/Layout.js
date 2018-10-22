import React, { Component } from 'react';
import Aux from '../Aux'

import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideMenu from '../../components/Navigation/SideMenu/SideMenu'

class Layout extends Component {
    state = {
        showSideMenu: true
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
            <Toolbar sideMenuToggleClicked={this.sideMenuToggleHandler}  />
            <SideMenu open={this.state.showSideMenu} closed={this.sideMenuClosedHandler}  />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}
 
export default Layout;