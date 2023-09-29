import React, { Fragment } from 'react';
import classes from './HeaderLoginButton.module.css'



const HeaderLoginButton = (props) =>{
    return(
        <Fragment>
            <button onClick={props.onClick} className={classes.loginButton}>Login</button>
        </Fragment>
    );
};

export default HeaderLoginButton;