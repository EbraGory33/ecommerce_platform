import { configureStore } from "@reduxjs/toolkit";
import AppReducer from './slice/app/AppSlice';
import AuthReducer from './slice/auth/AuthSlice';
import UserReducer from './slice/user/UserSlice';
import CategoryReducer from './slice/category/CategorySlice';
import CartReducer from './slice/cart/CartSlice'
export const store = configureStore({
    reducer: {
        app:AppReducer,
        auth:AuthReducer,
        user:UserReducer,
        category:CategoryReducer,
        cart:CartReducer,
    }
})