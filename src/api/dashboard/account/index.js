import axios from "axios";
import { config } from "../config";

export async function updateAccountCompany(token, payload) {
  return await axios.put(`${config.api_host}/account/v1/company-profile/update`,
    payload,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
}
