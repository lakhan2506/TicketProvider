import { useEffect, useCallback, useState, Fragment } from "react";
import LoginPage from "./components/login&signUp/LoginPage";
import AdminPortal from "./components/admin/adminPortal/AdminPortal";
import AddVenueForm from "./components/venue/AddVenueForm";

function App(props) {
  const [userLogin, setUserLogin] = useState(null);
  const [isClickOnAddVenueButton,setIsClickOnAddVenueButton] = useState(false)
  const token = localStorage.getItem("LoginToken");

  const isUserLoggedIn = useCallback(() => {
    if (!token) {
      setUserLogin(false);
    } else {
      setUserLogin(true);
    }
  }, [token]);

  useEffect(() => {
    isUserLoggedIn();

    const handleStorageChange = (event) => {
      if (event.key !== null) {
        setUserLogin(true);
      } else {
        setUserLogin(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isUserLoggedIn]);

  const clickOnAddVenueButton = (data)=>{
    if(data===true){
      setIsClickOnAddVenueButton(true);
    }
    else{
      setIsClickOnAddVenueButton(false)
    }
  }

  return (
    <Fragment>
      {!isClickOnAddVenueButton && userLogin && <AdminPortal clickOnAddVenueButton={clickOnAddVenueButton} />}
      {isClickOnAddVenueButton && userLogin && <AddVenueForm clickOnAddVenueButton={clickOnAddVenueButton}/>}
      {!isClickOnAddVenueButton && !userLogin && <LoginPage />}
    </Fragment>
  );
}

export default App;