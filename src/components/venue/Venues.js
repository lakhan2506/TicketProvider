import { useSelector, useDispatch } from "react-redux";
import classes from "./Venues.module.css";
import Venue from "./Venue";
import { TfiReload } from "react-icons/tfi";
import { fetchVenues } from "../store/venue-slice";
import { useEffect } from "react";


const Venues = (props) => {
  const venues = useSelector((state) => state.venue.venues);
  const noOfShows = useSelector((state) => state.venue.noOfShows);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchVenues())
  },[dispatch])

  const addVenueHandler = () => {
    props.clickOnAddVenueButton(true);
  };

  const reloadVenuesHandler=()=>{
    dispatch(fetchVenues())
  }

  return (
    <div className={classes.container}>
      <div className={classes.venuesContainer}>
        <div>
          <h1>Venues</h1>
        </div>
        <div className={classes.buttons}>
          <button onClick={reloadVenuesHandler} className={classes.reloadButton}><TfiReload size={25}/></button>
          <button onClick={addVenueHandler} className={classes.addVenueButton}>
            Add Venue
          </button>
        </div>
      </div>
      <div className={classes.venue}>
        {venues.map((item) => (
          <Venue
            key={item.id}
            venueId = {props.venueId}
            venueEditting={props.venueEditting}
            id={item.id}
            name={item.name}
            place={item.place}
            capacity={item.capacity}
            noOfShows={noOfShows}
          />
        ))}
      </div>
    </div>
  );
};

export default Venues;
