import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicles: [],
  selectedVehicle: null,
  isLoading: false,
  error: null,
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setVehicles, setSelectedVehicle, setLoading, setError } = vehicleSlice.actions;
export default vehicleSlice.reducer;
