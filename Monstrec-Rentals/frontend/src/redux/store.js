import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import vehicleReducer from './slices/vehicleSlice.js';
import bookingReducer from './slices/bookingSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicles: vehicleReducer,
    bookings: bookingReducer,
  },
});

export default store;
