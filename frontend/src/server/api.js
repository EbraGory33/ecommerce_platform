import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function useAxiosClient() {
    const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/",
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
      baseURL: "http://127.0.0.1:8000/",
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