import debounce from "debounce-promise";
import {
  START_FETCHING_APPLICANT,
  SUCCESS_FETCHING_APPLICANT,
  ERROR_FETCHING_APPLICANT,
  SET_PER_PAGE,
  SET_KEYWORD,
  PREV_PAGE,
  NEXT_PAGE,
} from "./constants";

import { applicants } from "../../../api/dashboard/applicant";

let debounceFetchApplicants = debounce(applicants, 1000);

export const fetchApplicants = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingApplicants());

    let perPage = getState().dashboardApplicants.perPage || 10;
    let page = getState().dashboardApplicants.page || 1;

    const params = {
      page,
      perPage,
    };

    try {
      let { data } = await debounceFetchApplicants(params);

      dispatch(successFetchingApplicants(data));
    } catch (err) {
      dispatch(errorFetchingApplicants());
    }
  };
};
export const startFetchingApplicants = () => {
  return {
    type: START_FETCHING_APPLICANT,
  };
};

export const successFetchingApplicants = (data) => {
  return {
    type: SUCCESS_FETCHING_APPLICANT,
    data: data.data,
  };
};

export const errorFetchingApplicants = () => {
  return {
    type: ERROR_FETCHING_APPLICANT,
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