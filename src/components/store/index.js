import {configureStore} from "@reduxjs/toolkit"
import venueSlice from "./venue-slice";
import adminSlice from "./admin-slice";

const store = configureStore({
    reducer: {venue: venueSlice.reducer,admin: adminSlice.reducer}
})

export default store;