import { Fragment } from "react";
import Header from "../../layout/Header";
import Venues from "../../venue/Venues";
import './AdminPortal.css'

const AdminPortal = (props) => {
  return (
    <Fragment>
      <div className="header"><Header/></div>
      <div className="vanues"><Venues clickOnAddVenueButton={props.clickOnAddVenueButton} /></div>
    </Fragment>
  );
};

export default AdminPortal;
