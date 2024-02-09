import { useEffect, useCallback, useState, Fragment } from "react";
import LoginPage from "./components/login&signUp/LoginPage";
import AdminPortal from "./components/admin/adminPortal/AdminPortal";
import AddVenueForm from "./components/venue/AddVenueForm";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "./components/store/admin-slice";

function App(props) {
  // const [userLogin, setUserLogin] = useState(null);
  const [isClickOnAddVenueButton,setIsClickOnAddVenueButton] = useState(false)
  const [isEditting,setIsEditting] = useState(false);
  
  const [venueId,setVenueId] = useState()
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.admin.adminLogin);

  const GetToken=()=>{
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
    if(!token || !expirationTime){
      return null;
    }
    const currentTimestamp = new Date().getTime();
  
    if(currentTimestamp > parseInt(expirationTime,10)){
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      return null;
    }
    return token;
  }
  const token = GetToken();
  
  const venueIdtHandler=(data)=>{
    setVenueId(data)
  }
  const isUserLoggedIn = useCallback(() => {
    if (!token) {
      // setUserLogin(false);
      dispatch(adminActions.adminLoginData(false))
    } else {
      // setUserLogin(true);
      dispatch(adminActions.adminLoginData(true))
    }
  },[dispatch, token]);

  useEffect(() => {
    isUserLoggedIn();
    console.log(userLogin)
    const handleStorageChange = (event) => {
      if (event.key !== null) {
        // setUserLogin(true);
        dispatch(adminActions.adminLoginData(true))
      } else {
        // setUserLogin(false);
        dispatch(adminActions.adminLoginData(false))
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  });

  const clickOnAddVenueButton = (data)=>{
    if(data===true){
      setIsClickOnAddVenueButton(true);
    }
    else{
      setIsClickOnAddVenueButton(false)
    }
  }

  const venueEditHandler=(data)=>{
    setIsEditting(data)
  }


  return (
    <Fragment>
      {!isClickOnAddVenueButton && !isEditting && userLogin && <AdminPortal venueId = {venueIdtHandler} venueEditting={venueEditHandler} clickOnAddVenueButton={clickOnAddVenueButton} />}
      {isClickOnAddVenueButton && !isEditting && userLogin && <AddVenueForm venueId = {venueId} editting={isEditting} clickOnAddVenueButton={clickOnAddVenueButton}/>}
      {!isClickOnAddVenueButton &&!isEditting && !userLogin && <LoginPage />}
      {!isClickOnAddVenueButton && isEditting && userLogin && <AddVenueForm venueId = {venueId} editting={isEditting} venueEditting={venueEditHandler} clickOnAddVenueButton={clickOnAddVenueButton}/>}
    </Fragment>
  );
}

export default App;