import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    "Content-Type": "application/json"
  };
  const body = {
    email,
    password
  };
  try {
    const res = await axios.post("/api/auth", body, config);
  } catch (err) {}
};
