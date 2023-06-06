import { createSlice } from "@reduxjs/toolkit";

let activetab = sessionStorage.getItem('activeTab')?JSON.parse(sessionStorage.getItem('activeTab')):{name:"Dashboard",label:"Dashboard", subkey:""}
// let cartlist = JSON.parse(localStorage.getItem('cartlist'));
// let cart = !cartlist ? 0 : cartlist.length;
let cartNumber = 0;

export const homeSlice = createSlice({
	name: "home",
	initialState: {
		homeData: [],
		successData:{},
		adminPathName:"",
		//alert:{open: false, vertical: 'top', horizontal: 'right', severity:"success", msg:""},
		alert:{open: false, vertical: 'top', horizontal: 'center', severity:"success", msg:"Loading...", type:''},
		loader:{open: false, vertical: 'bottom', horizontal: 'center', severity:"success", msg:"Loading..."},
		language:{},
		languageList:[],
		categoryList:[],
		Lebals:{},
		loginUser:{},
		activeMember:{},
		activeTab:activetab,
		contentTypesList:[],
		topicsList:[],
		filter:{},
		lastPeriod:{},
		cartNumber: cartNumber,
	},
	reducers: {
		setTopCategorie: (state, action) => {
			state.homeData = action.payload;
		},		
		setSuccessData: (state, action) => {
			state.successData = action.payload;
		},
		setadminPathName: (state, action) => {
			state.adminPathName = action.payload;
		},
		setAlert: (state, action) => {
			state.alert = action.payload;
		},
		setCartItem: (state, action) => {
			state.cartNumber = action.payload;
		},
		setLoader: (state, action) => {
			state.loader = action.payload;
		},
		setLanguage: (state, action) => {
			state.language = action.payload;
		},
		setLanguageList: (state, action) => {
			state.languageList = action.payload;
		},
		setCategoryList: (state, action) => {
			state.categoryList = action.payload;
		},
		setLangLebal: (state, action) => {
			state.Lebals = action.payload;
		},
		setLoginUser: (state, action) => {
			state.loginUser = action.payload;
		},
		setActiveMember: (state, action) => {
			state.activeMember = action.payload;
		},
		setActiveTab: (state, action) => {
			state.activeTab = action.payload;
			sessionStorage.setItem('activeTab', JSON.stringify(action.payload));
		},
		setContentTypesList: (state, action) => {
			state.contentTypesList = action.payload;
		},
		setTopicsList: (state, action) => {
			state.topicsList = action.payload;
		},
		setFilter: (state, action) => {
			state.filter = action.payload;
		},
		setLastPeriod: (state, action) => {
			state.lastPeriod = action.payload;
		}		
	},
});

export const { 
	setSuccessData,
	setadminPathName,
	setAlert,
	setCartItem,
	setLoader,
	setLanguage,
	setLanguageList,
	setCategoryList,
	setLangLebal,
	setLoginUser,
	setActiveMember,
	setActiveTab,
	setContentTypesList,
	setTopicsList,
	setFilter,
	setLastPeriod
} = homeSlice.actions;

export default homeSlice.reducer;
