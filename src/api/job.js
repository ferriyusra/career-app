import axios from "axios";
import { config } from "../config";

export async function jobs(params) {
  return await axios.get(`${config.api_host}/career/v1/jobs`, {
    params,
  });
}

export async function getJobById(jobId) {
  return await axios.get(`${config.api_host}/career/v1/job/${jobId}`);
}
