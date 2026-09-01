export const GET_QR_SUCCESS = "GET_QR_SUCCESS";
export const GET_QR_ERROR = "GET_QR_ERROR";
export const GET_QR_LOADING = "GET_QR_LOADING";

const API_URL = import.meta.env.VITE_API_URL;

export const getMyQrCodes = () => async (dispatch, getState) => {
  dispatch({ type: GET_QR_LOADING });

  const token = getState().auth.token;

  try {
    const response = await fetch(`${API_URL}/qr`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante il recupero dei QR code");
    }

    const data = await response.json();

    dispatch({
      type: GET_QR_SUCCESS,
      payload: data.qrCodes,
    });
  } catch (error) {
    dispatch({
      type: GET_QR_ERROR,
      payload: error.message || "Errore di connessione al server",
    });
  }
};
