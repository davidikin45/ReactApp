import React from 'react';

import classes from './Logo.module.css';

import appLogo from '../../assets/images/logo.png';

const logo = (props) => {
    return ( 
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={appLogo} alt="MyBurger"/>
        </div>
     );
}
 
export default logo;