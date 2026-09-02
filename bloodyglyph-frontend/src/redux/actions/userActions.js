export const GET_ME_SUCCESS = "GET_ME_SUCCESS";
export const GET_ME_ERROR = "GET_ME_ERROR";
export const UPDATE_PRIVACY_SETTINGS_LOADING =
  "UPDATE_PRIVACY_SETTINGS_LOADING";
export const UPDATE_PRIVACY_SETTINGS_SUCCESS =
  "UPDATE_PRIVACY_SETTINGS_SUCCESS";
export const UPDATE_PRIVACY_SETTINGS_ERROR = "UPDATE_PRIVACY_SETTINGS_ERROR";
export const CLEAR_USER_ERROR = "CLEAR_USER_ERROR";
export const DELETE_USER_LOADING = "DELETE_USER_LOADING";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";

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

export const updatePrivacySettings = (payload) => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_PRIVACY_SETTINGS_LOADING });

    const token = getState().auth.token;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/me/privacy-settings`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Errore durante la modifica dell'account",
        );
      }

      dispatch({
        type: UPDATE_PRIVACY_SETTINGS_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: UPDATE_PRIVACY_SETTINGS_ERROR,
        payload:
          error.message ||
          "Errore durante l'aggiornamento delle impostazioni di privacy",
      });

      return false;
    }
  };
};

//pulizia errori
export const clearUserError = () => ({
  type: CLEAR_USER_ERROR,
});

//elimina account
export const deleteUserAccount = () => {
  return async (dispatch, getState) => {
    dispatch({ type: DELETE_USER_LOADING });

    const token = getState().auth.token;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Errore durante l'eliminazione dell'account";

        try {
          const data = await response.json();
          message = data.message || message;
        } catch {
          // Nessun body JSON: usa il messaggio di message fallback
        }

        throw new Error(message);
      }

      dispatch({
        type: DELETE_USER_SUCCESS,
      });

      return true;
    } catch (error) {
      dispatch({
        type: DELETE_USER_ERROR,
        payload: error.message || "Errore durante l'eliminazione dell'account",
      });
      return false;
    }
  };
};
