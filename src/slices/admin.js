import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
	name: "admin",
	initialState: {
		userList: [],
		ctnftList: [],
		dashboardData:[],
	},
	reducers: {
		setUserList: (state, action) => {
			state.userList = action.payload;
		},
		setCtnftList: (state, action) => {
			state.ctnftList = action.payload;
		},
		setDashboardData: (state, action) => {
			state.dashboardData = action.payload;
		}
	},
});

export const { 
	setUserList,
	setCtnftList,
	setDashboardData,
} = adminSlice.actions;

export default adminSlice.reducer;
