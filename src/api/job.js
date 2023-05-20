import axios from "axios";
import { config } from "../config";

export async function jobs(params) {
  return await axios.get(`${config.api_host}/api/jobs`, {
    params,
  });
}

export async function getJobById(job_id) {
  return await axios.get(`${config.api_host}/api/job/${job_id}`);
}
