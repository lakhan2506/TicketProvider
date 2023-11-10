import classes from "./Venue.module.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Venue = (props) => {
  return (
    <div className={classes.venueContainer}>
      <h3>Name : {props.name}</h3>
      <p>Shows : {props.noOfShows}</p>
      <p>Place : {props.place}</p>
      <p>Capacity : {props.capacity}</p>
      <div className={classes.buttons}>
        <button className={classes.button}>
          <FaEdit size={25} />
        </button>
        <button className={classes.button}>
          <MdDelete size={25} />
        </button>
      </div>
    </div>
  );
};

export default Venue;
