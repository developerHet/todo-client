import { createSlice } from "@reduxjs/toolkit"
import { userApi } from "../apis/userApi";


const initialState = {    
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        logout: (state,action)=> {
            state.currentUser = null;
            state.errorMessage = '';
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder)=> {
        builder.addMatcher(userApi.endpoints.login.matchFulfilled,(state,action)=> {
            state.currentUser = action.payload;
            localStorage.setItem("user",JSON.stringify(action.payload));
        });
        builder.addMatcher(userApi.endpoints.register.matchFulfilled,(state,action)=> {
            state.currentUser = action.payload;
            localStorage.setItem("user",JSON.stringify(action.payload));
        });
    }
});

export const {logout} = userSlice.actions;
export const userReducer = userSlice.reducer;
