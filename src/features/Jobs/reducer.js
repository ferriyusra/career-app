import {
  START_FETCHING_JOB,
  ERROR_FETCHING_JOB,
  SUCCESS_FETCHING_JOB,
  SET_PER_PAGE,
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
  page: 1,
  perPage: 6,
  total: 0,
  keyword: "",
  status: statusList.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_JOB:
      return {
        ...state,
        status: statusList.process,
        data: [],
      };

    case SUCCESS_FETCHING_JOB:
      return {
        ...state,
        data: action.data.data,
        total: action.data.total,
        status: statusList.success,
      };

    case SET_PER_PAGE:
      return { ...state, page: action.page };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    case NEXT_PAGE:
      return { ...state, page: state.page + 1 };

    case PREV_PAGE:
      return { ...state, page: state.page - 1 };

    case ERROR_FETCHING_JOB:
      return { ...state, status: statusList.error };

    default:
      return state;
  }
}