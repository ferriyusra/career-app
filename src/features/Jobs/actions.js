import debounce from "debounce-promise";

import {
  START_FETCHING_JOB,
  SUCCESS_FETCHING_JOB,
  ERROR_FETCHING_JOB,
  SET_PAGE,
  SET_KEYWORD,
  PREV_PAGE,
  NEXT_PAGE,
} from "./constants";

import { jobs } from "../../api/job";

let debounceFetchJobs = debounce(jobs, 2000);

export const fetchJobs = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingJobs());

    let perPage = getState().jobs.perPage || 6;
    let currentPage = getState().jobs.currentPage || 1;
    let keyword = getState().jobs.keyword || "";

    const params = {
      limit: perPage,
      skip: currentPage * perPage - perPage,
      query: keyword,
    };

    try {
      let {
        data: { data, count },
      } = await debounceFetchJobs(params);

      dispatch(successFetchingJobs({ data, count }));
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

export const successFetchingJobs = (payload) => {
  return {
    type: SUCCESS_FETCHING_JOB,
    ...payload,
  };
};

export const errorFetchingJobs = () => {
  return {
    type: ERROR_FETCHING_JOB,
  };
};

export const setPage = (number = 1) => {
  return {
    type: SET_PAGE,
    currentPage: number,
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
