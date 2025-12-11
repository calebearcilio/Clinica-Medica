import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AuthLayout from "./components/layouts/AuthLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";

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
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
