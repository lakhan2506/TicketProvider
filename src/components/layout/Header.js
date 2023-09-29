import React, { Fragment } from "react";
import classes from "./Header.module.css";


const Header = (props) => {
  // let istokendeleted = null;
  const logoutHandler=()=>{
    // console.log(token);
    localStorage.removeItem('LoginToken')
    // const token = localStorage.getItem('LoginToken');
    // console.log(localStorage.getItem('LoginToken'))
    const storageEvent = new StorageEvent('storage',{key:null})
    window.dispatchEvent(storageEvent) ;     
    //let istokendeleted = false;
    // props.onDeleteToken(false);
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <div>
          <h3>Ticket Provider</h3>
        </div>
        <div > 
          <button className={classes.logoutButton} onClick={logoutHandler}>Logout</button>
        </div>
        
      </header>
    </Fragment>
  );
};

export default Header;
