import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminActions } from "./admin-slice";

// Define an asynchronous thunk for fetching venues
export const fetchVenues = createAsyncThunk("venue/fetchVenues", async (_, { dispatch }) => {
  try {
    const token = GetToken();
    if (!token) {
      // window.location.reload();
      dispatch(adminActions.adminLoginData(false));
      return Promise.reject("No token available");
    }

    const response = await fetch("http://127.0.0.1:8080/venue/getAllVenues", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data; // Assuming the response is an array of venues
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching venues:", error);
    throw error;
  }
});

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

const venueSlice = createSlice({
  name: "venue",
  initialState: {
    venues: [],
    noOfShows: 0,
    status: "idle", // "idle", "loading", "succeeded", "failed"
    error: null,
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
    editVenue(state, action) {
      const { index, updatedVenue } = action.payload;
      if (index >= 0 && index < state.venues.length) {
        state.venues[index] = {
          name: updatedVenue.name,
          place: updatedVenue.place,
          capacity: updatedVenue.capacity,
        };
      }
    },
    removeVenue(state, action) {
      const indexToRemove = action.payload;
      if (indexToRemove >= 0 && indexToRemove < state.venues.length) {
        state.venues.splice(indexToRemove, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Assuming the fetched data is an array of venues
        state.venues = action.payload;
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const venueActions = { ...venueSlice.actions, fetchVenues };

export default venueSlice;
