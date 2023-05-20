import {
  START_FETCHING_JOB,
  ERROR_FETCHING_JOB,
  SUCCESS_FETCHING_JOB,
  SET_PAGE,
  SET_KEYWORD,
  NEXT_PAGE,
  PREV_PAGE,
} from "./constants";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  currentPage: 1,
  totalItems: 0,
  perPage: 6,
  keyword: "",
  status: statusList.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // TODO FETCH JOB DATA
    case START_FETCHING_JOB:
      return { ...state, status: statusList.process, data: [] };

    case SUCCESS_FETCHING_JOB:
      return {
        ...state,
        data: action.data,
        totalItems: action.count,
        status: statusList.success,
      };

    case SET_PAGE:
      return { ...state, currentPage: action.currentPage };

    case SET_KEYWORD:
      return { ...state, keyword: action.keyword, category: "" };

    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };

    case PREV_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };

    case ERROR_FETCHING_JOB:
      return { ...state, status: statusList.error };

    default:
      return state;
  }
}
