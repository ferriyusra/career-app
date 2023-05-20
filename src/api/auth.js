import axios from "axios";

import { config } from "../config";

export async function registerUser(data) {
  return await axios.post(`${config.api_host}/crm/v1/auth/register`, data);
}

export async function login(email, password) {
  return await axios.post(`${config.api_host}/crm/v1/auth/login`, {
    email,
    password,
  });
}

export function logout() {
  let authData = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};

  // Clear token from authData
  delete authData.token;
  localStorage.setItem("auth", JSON.stringify(authData));

  return new Promise((resolve, reject) => {
    // Simulating the logout process
    setTimeout(() => {
      resolve("Logout successful");
    }, 1000);
  });
}
