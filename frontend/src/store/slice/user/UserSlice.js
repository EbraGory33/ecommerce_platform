import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const loadUserItem = () => {
  const data = localStorage.getItem("user");
  if (data) {
    try {
      const parsedData = JSON.parse(data); // Parse the user data from localStorage
      const decodedToken = tokenDecode(parsedData.access); // Decode the access token
      return decodedToken ; // Return both user data and decoded token
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};

const tokenDecode = (token) =>{
    try {
        const info = jwtDecode(token);
        return info;
      } catch (error) {
        console.error("Invalid token:", error);
        return null; // Return null if the token is invalid
      }
};
     

const userSlice = createSlice({
  name: "User",
  initialState: {
    userInfo: loadUserItem(),
  },
  reducers: {
    /*Indicating the Start of a Login Process (Loading State)
    When a user submits their login credentials, the UI should display some loading indicator (e.g., a spinner or a "Logging in..." message).*/
    userLoginRequest: (state, action) => {
      return {};
    },
    userLoginSuccess: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { userInfo: loadUserItem() };
    },
    userLoginFail: (state, action) => {
      return { error: action.payload };
    },
    userLogout: (state, action) => {
      localStorage.removeItem("user");
      return {userInfo: null};
    },
  },
});

export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } =
  userSlice.actions;
export default userSlice.reducer;