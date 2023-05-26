import axios from "axios";
import { config } from "../config";

export async function sendApplicants(jobId, payload) {
  return await axios.post(`${config.api_host}/career/v1/job/${jobId}/submit`, payload);
}
