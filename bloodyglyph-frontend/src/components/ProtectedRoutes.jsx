import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  // dove cildren è il componente che voglio proteggere, in questo caso DashboardPage, QrCodeFormPage e QrCodeDetailsPage
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" replace />; //replace serve per non permettere all'utente di tornare indietro alla pagina protetta dopo il login
  }

  // Se l'utente è autenticato, renderizza il componente protetto
  return children;
}

export default ProtectedRoute;
