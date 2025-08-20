import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	countryList: []
};

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		updateAllCountryListData: (state, action) => {
			state.countryList = action.payload;
		},
		clearAllCountryListData: (state) => {
			state.countryList = initialState.countryList;
		}
	}
});

export const { updateAllCountryListData, clearAllCountryListData } =
	dashboardSlice.actions;

export default dashboardSlice.reducer;
