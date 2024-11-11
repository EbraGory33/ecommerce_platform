import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { authSuccess, authFail } from './AuthSlice'; 
import { RefreshToken } from '../../../server/endpoints/users/user_endpoints';

export function useAuthTokenManager() {
  const dispatch = useDispatch();
  const { AuthInfo } = useSelector((state) => state.auth); 

  const updateToken = async () => {
    console.log('Token is updating');
    try {
      const response = await RefreshToken(AuthInfo);
      const data = response.data;

      if (response.status === 200) {
        dispatch(authSuccess(data));
 
      } else {
        console.warn('Failed to load token, logging out...');
        dispatch(authFail());
      }
    } catch (error) {
      console.error('Error loading token:', error);
      dispatch(authFail());
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if ( AuthInfo ) {
        updateToken();
      }
    }, 240000); 

    return () => clearInterval(interval);
  }, [AuthInfo]);

  return null;
}

export default useAuthTokenManager;
