import {configureStore} from "@reduxjs/toolkit"
import venueSlice from "./venue-slice";

const store = configureStore({
    reducer: {venue: venueSlice.reducer}
})

export default store;