export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";
export const LOGOUT = "LOGOUT";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const RESET_PASSWORD_LOADING = "RESET_PASSWORD_LOADING";

const API_URL = import.meta.env.VITE_API_URL;

// REGISTER
export const registerUser = (username, email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_LOADING });

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      dispatch({
        type: REGISTER_ERROR,
        payload: data.message || "Errore durante la registrazione",
      });

      return false;
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: REGISTER_ERROR,
      payload: "Errore di connessione al server",
    });

    return false;
  }
};

// LOGIN
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      dispatch({
        type: LOGIN_ERROR,
        payload: data.message || "Email o password non corretti",
      });

      return false;
    }

    localStorage.setItem("token", data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: "Errore di connessione al server",
    });

    return false;
  }
};

// PULISCI ERRORI
export const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR,
});

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT,
  };
};

// RESET PASSWORD
export const resetPassword = (email) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_LOADING });
  try {
    const response = await fetch(
      `${API_URL}/auth/reset-password?email=${encodeURIComponent(email)}`,
      {
        method: "POST",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: data.message || "Errore durante il reset della password",
      });

      return false;
    }

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.message,
    });

    return true;
  } catch {
    dispatch({
      type: RESET_PASSWORD_ERROR,
      payload: "Errore di connessione al server",
    });

    return false;
  }
};
