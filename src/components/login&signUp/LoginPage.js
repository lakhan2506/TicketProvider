import { Fragment, useState } from "react";
import "./LoginPage.css";
import useInput from "../hooks/use-input";
import SignUpPage from "./SignUpPage";
import useHttp from "../hooks/use-http";
import AdminLoginPage from "../admin/adminLogin&signupPage/AdminLoginPage";
import AdminPortal from "../admin/adminPortal/AdminPortal";

const LoginPage = (props) => {
  const [userLoginCompleted,setUserLoginCompleted] = useState(false);
  const [dontHaveAccount, setDontHaveAccount] = useState(false);
  const [adminLogin,setAdminLogin] = useState(false);
  const { isLoading, error, sendRequest: sendNewUserRequest } = useHttp();


  const logingHandler = async () => {
    const createUser = (userData) => {
      // console.log(JSON.stringify(userData));
      // let token = ''
      userData.json().then((data)=>{
        // console.log(userDataJson)
        const createdUser = {token:data.token};
        // console.log(createdUser.message);
        localStorage.setItem('LoginToken',JSON.stringify(createdUser.token));
        const storageEvent = new StorageEvent('storage',{key:createdUser.token})
        window.dispatchEvent(storageEvent) ; 
      });
      // console.log(token);
      if(userData.status === 200){
        setUserLoginCompleted(true);
      }
      else{
        setUserLoginCompleted(false);
      }    
    };
    sendNewUserRequest(
      {
        url: "http://127.0.0.1:8080/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify(userDetails),
      },
      createUser
    );
  };

  
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
  
  const userDetails = {
    username: enteredUserName,
    password: enteredPassword,
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
  if (passwordIsValid && userNameIsValid) {
    formIsValid = true;
  }

  const userNameInputHasError = !userNameIsValid && isUserNameInputHasError;
  const passwordInputHasError = !passwordIsValid && isPasswordInputHasError;

  const submitHandler = (event) => {
    event.preventDefault();

    logingHandler();
    
    resetUserNameInput();
    resetPasswordInput();
  };

  const userNameClasses = userNameInputHasError
    ? "field input-field invalid"
    : "field input-field";
  const passwordClasses = passwordInputHasError
    ? "field input-field invalid"
    : "field input-field";

  const goOnSignUpPage = () => {
    setDontHaveAccount(true);
  };

  const goToAdminPageHandler=()=>{
    setAdminLogin(true)
  }

  const loginContent = (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Login</header>
          <form onSubmit={submitHandler}>
            {isLoading && <p>sending...</p>}
            {error && <p>{error}</p>}
            <div className={userNameClasses}>
              <input
                type="text"
                placeholder="Username"
                className="input"
                onChange={userNameChangeHandler}
                onBlur={userNameBlurHandler}
                value={enteredUserName}
                required
              />
              {userNameInputHasError && (
                <p className="error-text">Please enter your user name.</p>
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
                Signup
              </button>
            </span>
          </div>
          <div className="form-link">
            <span>
              For Admin Login?{" "}
              <button onClick={goToAdminPageHandler} className="button">
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
      {!adminLogin &&dontHaveAccount&& !userLoginCompleted && (
        <SignUpPage />
      )}
      {!adminLogin && !dontHaveAccount && userLoginCompleted && (
        <AdminPortal/>
      )}
      {adminLogin && !dontHaveAccount && !userLoginCompleted && (
        <AdminLoginPage/>
      )}
      {!adminLogin && !dontHaveAccount&& !userLoginCompleted && loginContent}
    </Fragment>
  );
};

export default LoginPage;
