import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuToggle from '../SideMenu/MenuToggle/MenuToggle';

const toolbar = (props) => {
    return ( 
        <header className={classes.Toolbar}>
            <MenuToggle clicked={props.sideMenuToggleClicked}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
             <NavigationItems/>
            </nav>
        </header>
     ); 
}
 
export default toolbar;