import React, { Fragment, useState } from "react";
import useInput from '../../hooks/use-input';
import "./AdminSignUpPage.css";
import AdminLoginPage from './AdminLoginPage';
import useHttp from "../../hooks/use-http";

const AdminSignUpPage = (props) => {
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [adminRegistered,setAdminRegistered] = useState(false)
  const { isLoading, error, sendRequest: sendNewAdminRequest } = useHttp();

  const enterTaskHandler = async () => {
    const createAdmin = (adminData) => {
      if(adminData.status === 200){
        setAdminRegistered(true)
      }
    };
      sendNewAdminRequest(
        {
          url: "http://127.0.0.1:8080/admin/register",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
          body: JSON.stringify(newAdminDetails),
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

  const newAdminDetails = {
    username: enteredAdminName,
    password: enteredPassword,
  };

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

  const goOnLoginPagehandler = () => {
    setAlreadyRegistered(true);
  };

  const adminNameInputHasError = !adminNameIsValid && isAdminNameInputHasError;
  const passwordInputHasError = !passwordIsValid && isPasswordInputHasError;

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    enterTaskHandler();

    resetAdminNameInput();
    resetPasswordInput();
  };

  const adminNameClasses = adminNameInputHasError
    ? "field input-field invalid"
    : "field input-field";
  const passwordClasses = passwordInputHasError
    ? "field input-field invalid"
    : "field input-field";

  const AdminSignUpContent = (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Admin Signup</header>
          <form onSubmit={submitHandler}>
            {isLoading && <p>sending...</p>}
            {error && <p>{error}</p>}
            {adminRegistered && <p>Admin Registered</p>}

            <div className={adminNameClasses}>
              <input
                type="text"
                placeholder="user name"
                className="password"
                onChange={adminNameChangeHandler}
                onBlur={adminNameBlurHandler}
                value={enteredAdminName}
                required
              />
              <i className="bx bx-hide eye-icon"></i>
              {adminNameInputHasError && (
                <p className="error-text">
                  Please enter more then 6 digit user name
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
                Admin Signup
              </button>
            </div>
          </form>

          <div className="form-link">
            <span>
              Already have an account?{" "}
              <button className="button" onClick={goOnLoginPagehandler}>
                Admin Login
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
        <AdminLoginPage />
      )}
      {adminRegistered && (
        <AdminLoginPage />
      )}
      {!alreadyRegistered && AdminSignUpContent}
    </Fragment>
  );
};

export default AdminSignUpPage;
