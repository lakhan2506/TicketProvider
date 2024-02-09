import { Fragment } from "react";
import useInput from "../hooks/use-input";
import useHttp from "../hooks/use-http";
import { useState } from "react";
import AdminPortal from "../admin/adminPortal/AdminPortal";
import { venueActions } from "../store/venue-slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenues } from "../store/venue-slice";
import axios from "axios";
import { useEffect } from "react";

const AddVenueForm = (props) => {
  const { isLoading, error, sendRequest: sendNewUserRequest } = useHttp();
  const [isAddVenueCompleted, setIsAddVenueCompleted] = useState(false);
  // const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const venues = useSelector((state) => state.venue.venues);
  const venueValue = venues.filter(function (state) {
    return state.id === props.venueId;
  });

  const GetToken = () => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");
    if (!token || !expirationTime) {
      return null;
    }
    const currentTimestamp = new Date().getTime();

    if (currentTimestamp > parseInt(expirationTime, 10)) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      return null;
    }
    return token;
  };

  const token = GetToken();  

  const addVenuesHandler = async () => {
    const addVenue = (addVenueData) => {
      if (addVenueData.status === 200) {
        setIsAddVenueCompleted(true);
        console.log("venue added");
        dispatch(
          venueActions.addVenue({
            name: enteredVenueName,
            place: enteredPlace,
            capacity: enteredCapacity,
          })
        );
      }
    };
    sendNewUserRequest(
      {
        url: "http://127.0.0.1:8080/venue/addVenue",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(venueDetails),
      },
      addVenue
    );
    dispatch(fetchVenues());
  };

  const editVenueHandler = async () => {
    const venueId = props.venueId;
    try {
      const response = await axios.put(
        `http://127.0.0.1:8080/venue/updateVenue?venue_id=${venueId}`,
        venueDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Venue update successfully");
        dispatch(
          venueActions.editVenue(venueId, {
            name: enteredVenueName,
            place: enteredPlace,
            capacity: enteredCapacity,
          })
        );
        dispatch(fetchVenues());
      } else {
        console.error("Error for updating venue");
      }
    } catch (error) {
      console.error("An error occurred while deleting the venue", error);
    }
  };
  let {
    value: enteredVenueName,
    hasError: isVenueNameInputHasError,
    valueChangeHandler: venueNameChangeHandler,
    inputBlurHandler: venueNameBlurHandler,
    reset: resetVenueNameInput,
  } = useInput();

  let {
    value: enteredPlace,
    hasError: isPlaceInputHasError,
    valueChangeHandler: placeChangeHandler,
    inputBlurHandler: placeBlurHandler,
    reset: resetPlaceInput,
  } = useInput();

  let {
    value: enteredCapacity,
    hasError: isCapacityInputHasError,
    valueChangeHandler: capacityChangeHandler,
    inputBlurHandler: capacityBlurHandler,
    reset: resetCapacityInput,
  } = useInput();

  useEffect(() => {
    if(props.editting){
      venueValue.forEach((venue) => {
        venueNameChangeHandler({ target: { value: venue.name } });
        placeChangeHandler({ target: { value: venue.place } });
        capacityChangeHandler({ target: { value: venue.capacity } });
      });
    }
    else{
      venueValue.forEach((venue) => {
        venueNameChangeHandler({ target: { value: '' } });
        placeChangeHandler({ target: { value: '' } });
        capacityChangeHandler({ target: { value: ''} });
      });
    }
  }, []);

  const venueDetails = {
    name: enteredVenueName,
    place: enteredPlace,
    capacity: enteredCapacity,
  };

  let venueNameIsValid = false;
  if (enteredVenueName.trim() !== "") {
    venueNameIsValid = true;
  }

  let placeIsValid = false;
  if (enteredPlace.trim() !== "") {
    placeIsValid = true;
  }

  let capacityIsValid = false;
  if (enteredCapacity.length > 0) {
    capacityIsValid = true;
  }

  let formIsValid = false;

  if (capacityIsValid && venueNameIsValid && placeIsValid) {
    formIsValid = true;
  }

  const venueNameInputHasError = !venueNameIsValid && isVenueNameInputHasError;
  const placeInputHasError = !placeIsValid && isPlaceInputHasError;
  const capacityInputHasError = !capacityIsValid && isCapacityInputHasError;

  const requestFunction = () => {
    if (props.editting) {
      editVenueHandler();
    } else {
      addVenuesHandler();
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    requestFunction();

    props.clickOnAddVenueButton(false);
    if (props.venueEditting) {
      props.venueEditting(false);
    }

    resetVenueNameInput();
    resetPlaceInput();
    resetCapacityInput();
  };

  const venueNameClasses = venueNameInputHasError
    ? "field input-field invalid"
    : "field input-field";
  const placeClasses = placeInputHasError
    ? "field input-field invalid"
    : "field input-field";
  const capacityClasses = capacityInputHasError
    ? "field input-field invalid"
    : "field input-field";

  const venueHeader = props.editting ? "Edit Venue" : "Add Venue";

  const addVenueForm = (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>{venueHeader}</header>
          <form onSubmit={submitHandler}>
            {isLoading && <p>sending...</p>}
            {error && <p>{error}</p>}
            {/*userRegistered && <p>User Registered</p>*/}
            <div className={venueNameClasses}>
              <input
                type="text"
                placeholder="Venue Name"
                className="input"
                onChange={venueNameChangeHandler}
                onBlur={venueNameBlurHandler}
                value={enteredVenueName}
                required
              />
              {venueNameInputHasError && (
                <p className="error-text">Please enter Venue name.</p>
              )}
            </div>

            <div className={placeClasses}>
              <input
                type="text"
                placeholder="place"
                className="password"
                onChange={placeChangeHandler}
                onBlur={placeBlurHandler}
                value={enteredPlace}
                required
              />
              <i className="bx bx-hide eye-icon"></i>
              {capacityInputHasError && (
                <p className="error-text">Please enter Place</p>
              )}
            </div>

            <div className={capacityClasses}>
              <input
                type="number"
                placeholder="capacity"
                className="password"
                onChange={capacityChangeHandler}
                onBlur={capacityBlurHandler}
                value={enteredCapacity}
                required
              />
              <i className="bx bx-hide eye-icon"></i>
              {capacityInputHasError && !capacityIsValid && (
                <p className="error-text">Please enter capacity</p>
              )}
            </div>

            <div className="field button-field">
              <button type="submit" disabled={!formIsValid}>
                {venueHeader}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  return (
    <Fragment>
      {isAddVenueCompleted && <AdminPortal />}
      {!isAddVenueCompleted && addVenueForm}
    </Fragment>
  );
};

export default AddVenueForm;
