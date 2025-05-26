import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function useAxiosClient() {
    const axiosClient = axios.create({
    //baseURL: "http://100.24.41.198:8000",
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": 'application/json',
        "Content-Type": 'multipart/form-data',
      },
    });

    return axiosClient;
}


function useAxiosClientWithToken(token) {
    const axiosClientWithToken = axios.create({
      //baseURL: "http://100.24.41.198:8000",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": 'application/json',
        "Content-Type": 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  
    return axiosClientWithToken;
}

export { useAxiosClient, useAxiosClientWithToken }