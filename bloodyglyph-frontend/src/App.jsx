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
import ProtectedRoute from "./components/ProtectedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import NotFoundPage from "./pages/NotFoundPAge";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qrcodes/new"
          element={
            <ProtectedRoute>
              <QrCodeFormPage mode="create" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qrcodes/edit/:qrId"
          element={
            <ProtectedRoute>
              <QrCodeFormPage mode="edit" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qrcodes/:qrId"
          element={
            <ProtectedRoute>
              <QrCodeDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AccountSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
