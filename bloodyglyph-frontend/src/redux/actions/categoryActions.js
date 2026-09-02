//TODO: CATEGORIE: DA IMPLEMENTARE SUCCESSIVAMENTE

export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS";
export const GET_CATEGORY_ERROR = "GET_CATEGORY_ERROR";
export const GET_CATEGORY_LOADING = "GET_CATEGORY_LOADING";

const API_URL = import.meta.env.VITE_API_URL;

export const getMyCategories = () => async (dispatch, getState) => {
  dispatch({ type: GET_CATEGORY_LOADING });
  const token = getState().auth.token;

  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante il recupero delle categorie");
    }

    const data = await response.json();

    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_ERROR,
      payload: error.message || "Errore di connessione al server",
    });
  }
};
