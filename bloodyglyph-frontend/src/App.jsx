import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/actions/userActions";
import DashboardPage from "./pages/DashboardPage";
import QrCodeDetailsPage from "./pages/QrCodeDetailsPage";
import QrCodeFormPage from "./pages/QrCodeFormPage";

function App() {
  const dispatch = useDispatch();
  const { token, userLogged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !userLogged) {
      dispatch(getMe());
    }
  }, [dispatch, token, userLogged]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/qrcodes/new" element={<QrCodeFormPage mode="create" />} />
        <Route
          path="/qrcodes/edit/:qrId"
          element={<QrCodeFormPage mode="edit" />}
        />
        <Route path="/qrcodes/:qrId" element={<QrCodeDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
