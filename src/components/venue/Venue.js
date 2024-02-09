import classes from "./Venue.module.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { fetchVenues } from "../store/venue-slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { venueActions } from "../store/venue-slice";


const Venue = (props) => {
  // const token = localStorage.getItem('token')
  
  const dispatch = useDispatch();

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

  const deleteVenueHandler = async () => {
    const venueId = props.id;
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/venue/deleteVenue?venue_id=${venueId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        console.log("Venue deleted successfully");
        dispatch(venueActions.removeVenue(venueId))
        dispatch(fetchVenues());
      } else {
        console.error("Error deleting venue");
      }
    } catch (error) {
      console.error("An error occurred while deleting the venue", error);
    }
  };

  const editButtonHandler=()=>{
    props.venueEditting(true)
    props.venueId(props.id)
  }

  return (
    <div className={classes.venueContainer}>
      <h3>Name : {props.name}</h3>
      <p>Shows : {props.noOfShows}</p>
      <p>Place : {props.place}</p>
      <p>Capacity : {props.capacity}</p>
      <div className={classes.buttons}>
        <button onClick={editButtonHandler} className={classes.button}>
          <FaEdit size={25} />
        </button>
        <button onClick={deleteVenueHandler} className={classes.button}>
          <MdDelete size={25} />
        </button>
      </div>
    </div>
  );
};

export default Venue;
