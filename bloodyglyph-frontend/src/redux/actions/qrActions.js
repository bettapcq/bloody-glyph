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
export const DELETE_QR_LOADING = "DELETE_QR_LOADING";
export const DELETE_QR_SUCCESS = "DELETE_QR_SUCCESS";
export const DELETE_QR_ERROR = "DELETE_QR_ERROR";

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
    // Legge realmente il contenuto del file.
    // Utile soprattutto con file provenienti da provider esterni
    // come Google Drive su Android.
    const fileBuffer = await payload.file.arrayBuffer();

    // Crea un nuovo File locale a partire dai byte letti,
    // mantenendo nome e MIME type.
    const normalizedFile = new File([fileBuffer], payload.file.name || "file", {
      type:
        payload.file.type ||
        (payload.contentType === "PDF"
          ? "application/pdf"
          : "application/octet-stream"),
    });

    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("contentType", payload.contentType);
    formData.append("file", normalizedFile);

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
    let errorMessage =
      error.message || "Errore durante il caricamento del file";

    if (error.message === "Failed to fetch") {
      errorMessage =
        "Impossibile caricare il file. Controlla la connessione o prova a selezionare nuovamente il documento.";
    }

    dispatch({
      type: CREATE_QR_ERROR,
      payload: errorMessage,
    });

    throw new Error(errorMessage);
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
        payload: error.message || "Errore durante la modifica del QR code",
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
        const fileBuffer = await payload.file.arrayBuffer();

        const normalizedFile = new File(
          [fileBuffer],
          payload.file.name || "file",
          {
            type:
              payload.file.type ||
              (payload.contentType === "PDF"
                ? "application/pdf"
                : "application/octet-stream"),
          },
        );

        formData.append("file", normalizedFile);
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
      let errorMessage =
        error.message || "Errore durante la modifica del QR code";

      if (error.message === "Failed to fetch") {
        errorMessage =
          "Impossibile caricare il file. Controlla la connessione o prova a selezionare nuovamente il documento.";
      }

      dispatch({
        type: UPDATE_QR_ERROR,
        payload: errorMessage,
      });

      throw new Error(errorMessage);
    }
  };

// elimina un QR code esistente
export const deleteQrCode = (qrId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_QR_LOADING });

  const token = getState().auth.token;

  try {
    const response = await fetch(`${API_URL}/qr/${qrId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante l'eliminazione del QR code");
    }

    dispatch({
      type: DELETE_QR_SUCCESS,
      payload: qrId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_QR_ERROR,
      payload: error.message || "Errore di connessione al server",
    });

    throw error;
  }
};
