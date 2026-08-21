export const GET_ME_SUCCESS = "GET_ME_SUCCESS";
export const GET_ME_ERROR = "GET_ME_ERROR";

export const getMe = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    if (!token) return false;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch({
          type: GET_ME_ERROR,
          payload: data,
        });

        return false;
      }

      dispatch({
        type: GET_ME_SUCCESS,
        payload: data,
      });

      return true;
    } catch {
      dispatch({
        type: GET_ME_ERROR,
        payload: "Errore durante il recupero dell'utente",
      });

      return false;
    }
  };
};
