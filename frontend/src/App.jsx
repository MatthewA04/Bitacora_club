import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Componentes con la primera letra en MAYÚSCULA para que React los reconozca
import Inicio from "./pages/Inicio.jsx";
import Nosotros from "./pages/SobreNosotros.jsx";
import Noticias from "./pages/ArchivoNoticias.jsx";
import NoticiasSimple from "./pages/NoticiasSimple.jsx";
import Contacto from "./pages/Contacto";
import ArchivoPromociones from "./pages/ArchivoPromociones";
import PromocionesSimple from "./pages/PromocionesSimple";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SobreNosotros from "./pages/SobreNosotros.jsx";
import ScrollToTop from './components/ScrollToTop.jsx';

// Componente de Ruta Protegida optimizado usando el estado de React
const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  // 1. Estado para almacenar los datos del administrador conectado
  const [user, setUser] = useState(null);

  // 2. Sincronizar el estado por si refrescan la página
  useEffect(() => {
    const savedUser = localStorage.getItem("adminUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 3. LA FUNCIÓN CORREGIDA: Guarda el usuario tras el login exitoso
  const handleLogin = (usuarioData) => {
    setUser(usuarioData);
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ======================================================== */}
        {/* 1. RUTAS PÚBLICAS: Llevan la estructura con Navbar y Footer */}
        {/* ======================================================== */}
        <Route
          path="/*"
          element={
            <div className="app-container d-flex flex-column min-vh-100">
              <Navbar />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/sobre-nosotros" element={<Nosotros />} />
                  <Route path="/paquete/:id" element={<PromocionesSimple />} />
                  <Route path="/promociones" element={<ArchivoPromociones />} />
                  <Route path="/noticias" element={<Noticias />} />
                  <Route path="/noticias/:id" element={<NoticiasSimple />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* ======================================================== */}
        {/* 2. RUTA DE LOGIN: Totalmente limpia (sin Navbar ni Footer) */}
        {/* ======================================================== */}
        <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />

        {/* ======================================================== */}
        {/* 3. RUTA DEL DASHBOARD: Protegida de accesos no autorizados */}
        {/* ======================================================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
