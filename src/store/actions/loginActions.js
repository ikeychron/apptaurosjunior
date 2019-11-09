import { SIGNIN } from "../types";

export const signIn = ({ email, password }) => async dispatch => {
  const api = "https://api.staging.tauros.io/api/v2/auth/signin/";

  try {
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(res => res.json());

    const token = response.payload.token;
    dispatch({ type: SIGNIN, payload: token });
  } catch (error) {
    console.error(error);
  }
};
