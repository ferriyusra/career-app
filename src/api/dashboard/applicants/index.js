import axios from "axios";
import { config } from "../config";

export async function listApplicants(params) {
  return await axios.get(`${config.api_host}/crm/v1/applicants`, {
    params,
  });
}

