import classes from './HeaderSignUpButton.module.css'
import React from 'react'

const HeaderSignUpButton = (props) =>{
    return(
        <button onClick={props.onClick} className={classes.signUpButton}>SignUP</button>
    );
};

export default HeaderSignUpButton;