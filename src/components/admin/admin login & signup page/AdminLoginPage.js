import React, { Fragment, useState } from "react";
import "./AdminLoginPage.css";
import useInput from "../../hooks/use-input";
import AdminSignUpPage from "./AdminSignUpPage";
import useHttp from '../../hooks/use-http';
import Header from "../../layout/Header";

const AdminLoginPage = (props) => {
  const [adminLoginCompleted,setAdminLoginCompleted] = useState(false);
  const [dontHaveAccount, setDontHaveAccount] = useState(false);
  const { isLoading, error, sendRequest: sendNewAdminRequest } = useHttp();


  const logingHandler = async () => {
    const createAdmin = (adminData) => {
      // console.log(JSON.stringify(adminData));\
      adminData.json().then((data)=>{
        const createdAdmin = {token:data.token};
        // console.log(createdAdmin.message);
        localStorage.setItem('LoginToken',JSON.stringify(createdAdmin.token));
        const storageEvent = new StorageEvent('storage',{key:createdAdmin.token})
        window.dispatchEvent(storageEvent) ; 
      })
      if(adminData.status === 200){
        setAdminLoginCompleted(true);
      }
      else{
        setAdminLoginCompleted(false);
      }    
    };
    sendNewAdminRequest(
      {
        url: "http://127.0.0.1:8080/admin/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify(adminDetails),
      },
      createAdmin
    );
  };

  
  const {
    value: enteredAdminName,
    hasError: isAdminNameInputHasError,
    valueChangeHandler: adminNameChangeHandler,
    inputBlurHandler: adminNameBlurHandler,
    reset: resetAdminNameInput,
  } = useInput();
  
  const {
    value: enteredPassword,
    hasError: isPasswordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput();
  
  const adminDetails = {
    username: enteredAdminName,
    password: enteredPassword,
  }
  
  let adminNameIsValid = false;
  if (enteredAdminName.length >= 6) {
    adminNameIsValid = true;
  }

  let passwordIsValid = false;
  if (enteredPassword.length >= 6) {
    passwordIsValid = true;
  }

  let formIsValid = false;
  if (passwordIsValid && adminNameIsValid) {
    formIsValid = true;
  }

  const adminNameInputHasError = !adminNameIsValid && isAdminNameInputHasError;
  const passwordInputHasError = !passwordIsValid && isPasswordInputHasError;

  const submitHandler = (event) => {
    event.preventDefault();

    logingHandler();
    
    resetAdminNameInput();
    resetPasswordInput();
  };

  const adminNameClasses = adminNameInputHasError
    ? "field input-field invalid"
    : "field input-field";
  const passwordClasses = passwordInputHasError
    ? "field input-field invalid"
    : "field input-field";

  const goOnSignUpPage = () => {
    setDontHaveAccount(true);
  };

  const adminLoginContent = (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Admin Login</header>
          <form onSubmit={submitHandler}>
            {isLoading && <p>sending...</p>}
            {error && <p>{error}</p>}
            <div className={adminNameClasses}>
              <input
                type="text"
                placeholder="admin name"
                className="input"
                onChange={adminNameChangeHandler}
                onBlur={adminNameBlurHandler}
                value={enteredAdminName}
                required
              />
              {adminNameInputHasError && (
                <p className="error-text">Please enter your admin name.</p>
              )}
            </div>

            <div className={passwordClasses}>
              <input
                type="password"
                placeholder="Password"
                className="password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
                required
              />
              <i className="bx bx-hide eye-icon"></i>
              {passwordInputHasError && (
                <p className="error-text">Please enter 6 digit password</p>
              )}
            </div>

            <div className="field button-field">
              <button disabled={!formIsValid}>Login</button>
            </div>
          </form>

          <div className="form-link">
            <span>
              Don't have an account?{" "}
              <button onClick={goOnSignUpPage} className="button">
                Admin Signup
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Fragment>
      {dontHaveAccount&& !adminLoginCompleted && (
        < AdminSignUpPage />
      )}
      {!dontHaveAccount && adminLoginCompleted && (
        <Header/>
      )}
      {!dontHaveAccount&& !adminLoginCompleted && adminLoginContent}
    </Fragment>
  );
};

export default AdminLoginPage;
