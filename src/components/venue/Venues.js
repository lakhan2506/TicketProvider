import { useSelector } from "react-redux";
import classes from "./Venues.module.css";
import Venue from "./Venue";

const Venues = (props) => {
  const venues = useSelector((state) => state.venue.venues);
  const noOfShows = useSelector((state) => state.venue.noOfShows);

  const addVenueHandler = () => {
    props.clickOnAddVenueButton(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes.venuesContainer}>
        <div>
          <h1>Venues</h1>
        </div>
        <div>
          <button onClick={addVenueHandler} className={classes.addVenueButton}>
            Add Venue
          </button>
        </div>
      </div>
      <div className={classes.venue}>
        {venues.map((item) => (
          <Venue
            key={item.name}
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
