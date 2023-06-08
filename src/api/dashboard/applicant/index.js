import axios from "axios";
import { config } from "../../../config";

export async function applicants(params) {
  let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

  if (!token) return;

  return await axios.get(`${config.api_host}/crm/v1/applicants`, {
    params,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

