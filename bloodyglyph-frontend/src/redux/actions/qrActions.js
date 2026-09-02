export const GET_QR_SUCCESS = "GET_QR_SUCCESS";
export const GET_QR_ERROR = "GET_QR_ERROR";
export const GET_QR_LOADING = "GET_QR_LOADING";
export const CREATE_QR_LOADING = "CREATE_QR_LOADING";
export const CREATE_QR_SUCCESS = "CREATE_QR_SUCCESS";
export const CREATE_QR_ERROR = "CREATE_QR_ERROR";
export const GET_QR_BY_ID_LOADING = "GET_QR_BY_ID_LOADING";
export const GET_QR_BY_ID_SUCCESS = "GET_QR_BY_ID_SUCCESS";
export const GET_QR_BY_ID_ERROR = "GET_QR_BY_ID_ERROR";
export const UPDATE_QR_LOADING = "UPDATE_QR_LOADING";
export const UPDATE_QR_SUCCESS = "UPDATE_QR_SUCCESS";
export const UPDATE_QR_ERROR = "UPDATE_QR_ERROR";

const API_URL = import.meta.env.VITE_API_URL;

// ottiene i QR code dell'utente loggato
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
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_QR_ERROR,
      payload: error.message || "Errore di connessione al server",
    });
  }
};

// crea un nuovo QR code con url
export const createQrCodeFromUrl = (payload) => async (dispatch, getState) => {
  dispatch({ type: CREATE_QR_LOADING });

  const token = getState().auth.token;

  try {
    const response = await fetch(`${API_URL}/qr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Errore durante la creazione del QR code");
    }

    const data = await response.json();

    dispatch({
      type: CREATE_QR_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: CREATE_QR_ERROR,
      payload: error.message || "Errore di connessione al server",
    });
    throw error;
  }
};

// crea un nuovo QR code con file
export const createQrCodeFromFile = (payload) => async (dispatch, getState) => {
  dispatch({ type: CREATE_QR_LOADING });

  const token = getState().auth.token;

  try {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("contentType", payload.contentType);
    formData.append("file", payload.file);

    if (payload.categoryId) {
      formData.append("categoryId", payload.categoryId);
    }

    const response = await fetch(`${API_URL}/qr/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Errore durante la creazione del QR code");
    }

    const data = await response.json();

    dispatch({
      type: CREATE_QR_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: CREATE_QR_ERROR,
      payload: error.message || "Errore di connessione al server",
    });

    throw error;
  }
};

// ottiene un QR code per id
export const getQrCodeById = (qrId) => async (dispatch, getState) => {
  dispatch({ type: GET_QR_BY_ID_LOADING });

  const token = getState().auth.token;

  try {
    const response = await fetch(`${API_URL}/qr/${qrId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante il recupero del QR code");
    }
    const data = await response.json();

    dispatch({
      type: GET_QR_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_QR_BY_ID_ERROR,
      payload: error.message || "Errore di connessione al server",
    });

    throw error;
  }
};

// modifica un QR code url esistente
export const updateQrCodeFromUrl =
  (qrId, payload) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_QR_LOADING });

    const token = getState().auth.token;

    try {
      const response = await fetch(`${API_URL}/qr/${qrId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Errore durante la modifica del QR code");
      }

      const data = await response.json();

      dispatch({
        type: UPDATE_QR_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({
        type: UPDATE_QR_ERROR,
        payload: error.message || "Errore di connessione al server",
      });

      throw error;
    }
  };

// modifica un QR code file esistente
export const updateQrCodeFromFile =
  (qrId, payload) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_QR_LOADING });

    const token = getState().auth.token;

    try {
      const formData = new FormData();

      formData.append("title", payload.title);
      formData.append("contentType", payload.contentType);
      if (payload.file) {
        formData.append("file", payload.file);
      }

      if (payload.categoryId) {
        formData.append("categoryId", payload.categoryId);
      }

      const response = await fetch(`${API_URL}/qr/${qrId}/upload`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Errore durante la modifica del QR code");
      }

      const data = await response.json();

      dispatch({
        type: UPDATE_QR_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({
        type: UPDATE_QR_ERROR,
        payload: error.message || "Errore di connessione al server",
      });

      throw error;
    }
  };
