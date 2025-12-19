import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Pacientes from "./pages/Pacientes";
import Medicos from "./pages/Medicos";
import Consultas from "./pages/Consultas";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas sem cabeçalho */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rotas com cabeçalho */}
        <Route element={<DefaultLayout />}>
          <Route
            path="/dashboard"
            element={<ProtectedRoute children={<Dashboard />} />}
          />
          <Route
            path="/"
            element={<ProtectedRoute children={<Dashboard />} />}
          />
          <Route
            path="/pacientes"
            element={<ProtectedRoute children={<Pacientes />} />}
          />
          <Route
            path="/medicos"
            element={<ProtectedRoute children={<Medicos />} />}
          />
          <Route
            path="/consultas"
            element={<ProtectedRoute children={<Consultas />} />}
          />
          <Route
            path="/conta"
            element={<ProtectedRoute children={<Account />} />}
          />
          <Route
            path="/perfil"
            element={<ProtectedRoute children={<Profile />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
