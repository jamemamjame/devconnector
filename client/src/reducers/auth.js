import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthentication: false,
  loading: true,
  user: null
};

// this returned function will be called when dispatch
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.data);
      return {
        ...state,
        ...payload,
        isAuthentication: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthentication: false,
        loading: true
      };
    default:
      return state;
  }
}
