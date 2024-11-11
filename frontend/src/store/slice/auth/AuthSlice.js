import { createSlice } from "@reduxjs/toolkit";

const loadAuthtoken = () => {
    const data = localStorage.getItem("user");
        if(data){
            const parsedAuthInfo = JSON.parse(data);
            return parsedAuthInfo
        }
    return null;
};

const authSlice = createSlice({
    name: "Auth",
    initialState: {
        AuthInfo: loadAuthtoken(),
    },
    reducers: {
        authSuccess: (state, action) => {
            console.log("auth_ success")
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { AuthInfo: loadAuthtoken() };
          },
        authFail: (state, action) => {
            console.log("auth_ fail")
            localStorage.removeItem("user");
            return {AuthInfo: null};
        },
        authRemove: (state, action) => { 
            console.log("remove_auth")
            return {AuthInfo: null};
        },
    },
  });
  
  export const { authFail, authSuccess, authRemove } =
    authSlice.actions;
  export default authSlice.reducer;