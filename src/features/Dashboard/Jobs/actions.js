import debounce from "debounce-promise";
import {
  START_FETCHING_JOB,
  SUCCESS_FETCHING_JOB,
  ERROR_FETCHING_JOB,
  SET_PER_PAGE,
  SET_KEYWORD,
  PREV_PAGE,
  NEXT_PAGE,
} from "./constants";

import { jobs } from "../../../api/dashboard/job";

let debounceFetchJobs = debounce(jobs, 1000);

export const fetchJobs = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingJobs());

    let perPage = getState().dashboardJobs.perPage || 10;
    let page = getState().dashboardJobs.page || 1;

    const params = {
      page,
      perPage,
    };

    try {
      let { data } = await debounceFetchJobs(params);

      dispatch(successFetchingJobs(data));
    } catch (err) {
      dispatch(errorFetchingJobs());
    }
  };
};
export const startFetchingJobs = () => {
  return {
    type: START_FETCHING_JOB,
  };
};

export const successFetchingJobs = (data) => {
  return {
    type: SUCCESS_FETCHING_JOB,
    data: data.data,
  };
};

export const errorFetchingJobs = () => {
  return {
    type: ERROR_FETCHING_JOB,
  };
};

export const setPerPage = (number = 1) => {
  return {
    type: SET_PER_PAGE,
    page: number,
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const goToNextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};
export const goToPrevPage = () => {
  return {
    type: PREV_PAGE,
  };
};