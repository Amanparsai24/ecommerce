import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		loginData: {},
		profileData:{},
	},
	reducers: {
		setAuthUser: (state, action) => {
			
			state.loginData = action.payload;
		},
		setProfile: (state, action) => {
			state.profileData = action.payload;
		},
	},
});

export const { setAuthUser,setProfile } = authSlice.actions;
export default authSlice.reducer;
