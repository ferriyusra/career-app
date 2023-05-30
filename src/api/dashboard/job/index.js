import axios from "axios";
import { config } from "../../../config";

export async function jobs(params) {

  let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

  if (!token) return;

  return await axios.get(`${config.api_host}/crm/v1/jobs`,
    {
      params,
      headers: {
        authorization: `Bearer ${token}`
      }
    });
}

export async function getJobById(jobId) {
  return await axios.get(`${config.api_host}/crm/v1/jobs${jobId}`);
}

export async function createJob(payload) {
  let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios.post(`${config.api_host}/crm/v1/job`,
    payload,
    {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
}

export async function updateJob(jobId, payload) {
  let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios.put(`${config.api_host}/crm/v1/job/${jobId}`,
    payload,
    {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
}

export async function deleteJob(jobId) {
  let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios.delete(`${config.api_host}/crm/v1/job/${jobId}`,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
}
