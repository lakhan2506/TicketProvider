import { createSlice } from "@reduxjs/toolkit";

const venueSlice = createSlice({
  name: "venue",
  initialState: {
    venues: [],
    noOfShows: 0,
  },
  reducers: {
    addVenue(state, action) {
      const newVenue = action.payload;
      state.venues.push({
        name: newVenue.name,
        place: newVenue.place,
        capacity: newVenue.capacity,
      });
    },
    editVenue() {

    },
    removeVenue() {},
  },
});

export const venueActions = venueSlice.actions;

export default venueSlice;

