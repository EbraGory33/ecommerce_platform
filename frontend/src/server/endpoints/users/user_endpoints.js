import { useAxiosClient, useAxiosClientWithToken } from "../../api";

export function LoginUser(username, password) {
  return useAxiosClient().post("/auth/token/", {
    username: username,
    password: password,
  });
}

export function RefreshToken(token) {
  return useAxiosClient().post("/auth/token/refresh/", {
    refresh: token.refresh
  });
}


export function RegisterUser(name, email, password) {
  return useAxiosClient().post("/users/register/", {
    name: name,
    email: email,
    password: password,
  });
}

export function GetUserDetails(user_profile) {
  return useAxiosClientWithToken().get(`/api/profile_users/${user_profile}/`);
}

export function UpdateUserDetails(user) {
  return useAxiosClientWithToken().put(`/users/profile/update/`, user);
}

export function GetAllUsers() {
  return useAxiosClientWithToken().get("/users");
}

export function DeleteUser(id) {
  return useAxiosClientWithToken().delete(`/users/delete/${id}/`);
}

export function GetUser(id) {
  return useAxiosClientWithToken().get(`/users/${id}`);
}

export function UpdateUser(id, user) {
  return useAxiosClientWithToken().put(`/users/update/${id}/`, user);
}