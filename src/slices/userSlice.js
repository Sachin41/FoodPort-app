import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{usersData: {}},
    reducers: {
        signupUser: (state, action)=>{
            const {name}= action.payload;
            state.usersData[name] = action.payload;
                localStorage.setItem("users", JSON.stringify(state.usersData));
        },
        setUserFromStorage:(state, action)=>{
            const storedUSer= action.payload || {};
            state.usersData = storedUSer;
        }
    }
})
export const {signupUser, setUserFromStorage} = userSlice.actions;
export default userSlice.reducer;