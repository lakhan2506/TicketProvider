import React, { Fragment, useState } from "react";
import useInput from "../hooks/use-input";
import "./SignUpPage.css";
import LoginPage from "./LoginPage";
import useHttp from "../hooks/use-http";

const SignUpPage = (props) => {
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [userRegistered,setUserRegistered] = useState(false)
  const { isLoading, error, sendRequest: sendNewUserRequest } = useHttp();

  const enterTaskHandler = async () => {
    const createUser = (userData) => {
      const createdUser = userData.message
      if(createdUser === 'User Registered'){
        setUserRegistered(true)
      }
    };
      sendNewUserRequest(
        {
          url: "http://127.0.0.1:8080/register",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
          body: JSON.stringify(newUserDetails),
        },
        createUser
      );
    
  };
  const {
    value: enteredName,
    hasError: isNameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput();

  const {
    value: enteredUserName,
    hasError: isUserNameInputHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserNameInput,
  } = useInput();

  const {
    value: enteredPassword,
    hasError: isPasswordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput();

  const newUserDetails = {
    name: enteredName,
    username: enteredUserName,
    password: enteredPassword,
  };

  let nameIsValid = false;
  if (enteredName.trim() !== "") {
    nameIsValid = true;
  }

  let userNameIsValid = false;
  if (enteredUserName.length >= 6) {
    userNameIsValid = true;
  }

  let passwordIsValid = false;
  if (enteredPassword.length >= 6) {
    passwordIsValid = true;
  }

  let formIsValid = false;

  if (passwordIsValid && nameIsValid && userNameIsValid) {
    formIsValid = true;
  }

  const goOnLoginPagehandler = () => {
    setAlreadyRegistered(true);
  };

  const nameInputHasError = !nameIsValid && isNameInputHasError;
  const userNameInputHasError = !userNameIsValid && isUserNameInputHasError;
  const passwordInputHasError = !passwordIsValid && isPasswordInputHasError;

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    enterTaskHandler();

    resetNameInput();
    resetUserNameInput();
    resetPasswordInput();
  };

  const nameClasses = nameInputHasError
    ? "field input-field invalid"
    : "field input-field";
  const userNameClasses = userNameInputHasError
    ? "field input-field invalid"
    : "field input-field";
  const passwordClasses = passwordInputHasError
    ? "field input-field invalid"
    : "field input-field";

  const signUpContent = (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Signup</header>
          <form onSubmit={submitHandler}>
            {isLoading && <p>sending...</p>}
            {error && <p>{error}</p>}
            {userRegistered && <p>User Registered</p>}
            <div className={nameClasses}>
              <input
                type="text"
                placeholder="Name"
                className="input"
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
                required
              />
              {nameInputHasError && (
                <p className="error-text">Please enter your name.</p>
              )}
            </div>

            <div className={userNameClasses}>
              <input
                type="text"
                placeholder="Username"
                className="password"
                onChange={userNameChangeHandler}
                onBlur={userNameBlurHandler}
                value={enteredUserName}
                required
              />
              <i className="bx bx-hide eye-icon"></i>
              {userNameInputHasError && (
                <p className="error-text">
                  Please enter more then 6 digit username
                </p>
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
              {passwordInputHasError && !passwordIsValid && (
                <p className="error-text">Please enter 6 digit password</p>
              )}
            </div>
            <div></div>

            <div className="field button-field">
              <button type="submit" disabled={!formIsValid}>
                Signup
              </button>
            </div>
          </form>

          <div className="form-link">
            <span>
              Already have an account?{" "}
              <button className="button" onClick={goOnLoginPagehandler}>
                Login
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Fragment>
      {alreadyRegistered && (
        <LoginPage />
      )}
      {userRegistered && (
        <LoginPage />
      )}
      {!alreadyRegistered && signUpContent}
    </Fragment>
  );
};

export default SignUpPage;
