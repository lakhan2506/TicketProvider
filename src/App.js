import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import Header from "./components/layout/Header";
import LoginPage from "./components/login&signUp/LoginPage";

function App(props) {
  const [UserLogin, setUserLogin] = useState(null);
  // added line for git push
  // added line for vs code
  // const token = localStorage.getItem("LoginToken");
  // const isUserLoggedIn = () => {
  //   if (!token) {
  //     setUserLogin(false);
  //   } else {
  //     setUserLogin(true);
  //   }
  // };
  // const removeTokenHandler=(data)=>{
  //   setUserLogin(data)
  // }

  useEffect(() => {
    // isUserLoggedIn();
    window.addEventListener('storage',(event)=>{
      // console.log("Storage Event Detected",event);
      // console.log("Event Key",event.key);
      if(event.key!==null){
        setUserLogin(true);
      }
      else{
        setUserLogin(false);
      }
    });
    //return ()=>window.removeEventListener('storage',handleStorage())
  },[]);



  return (
    <Fragment>
      {UserLogin && <Header  />}
      {!UserLogin && <LoginPage />}
    </Fragment>
  );
}

export default App;
