import { LoginUser } from '../../../server/endpoints/users/user_endpoints.js'; 
import { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } from './UserSlice.js'
import { authSuccess, authRemove } from '../auth/AuthSlice.js'; 
import { resetCart } from '../cart/CartSlice.jsx';

export const UserLogin = async (dispatch, username, password) => {
  try {
    dispatch(userLoginRequest());
    const { data } = await LoginUser(username, password);
    console.log(data)
    dispatch(userLoginSuccess(data));
    console.log('1')
    dispatch(authSuccess(data));
    return true
  } catch (error) {
    console.log(error.response);
    dispatch(userLoginFail(error.response.data.detail));
    return false
  }
};

export const UserLogout = async (dispatch) => {
    try {
        dispatch(userLogout());
        dispatch(authRemove());
        dispatch(resetCart());
      } catch (error) {
        console.log(error.response);
        dispatch(userLoginFail(error.response.data.detail));
      }
    };