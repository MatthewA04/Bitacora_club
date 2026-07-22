import React, { useState } from "react";
import AdminNoticias from "../components/AdminNoticias";
import AdminContactos from "../components/AdminContactos";
import AdminPromociones from "../components/AdminPromociones"; // Este componente maneja tus cotizaciones
import AdminResumen from "../components/AdminResumen";

export default function Dashboard({ user }) {
  const [vistaActiva, setVistaActiva] = useState("cotizaciones");

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    window.location.href = "/login";
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ height: "100vh", display: "flex" }}
    >
      {/* BARRA LATERAL IZQUIERDA CORREGIDA */}
      <div
        className="bg-dark text-white p-3 d-flex flex-column justify-content-between"
        style={{ width: "260px", minWidth: "260px" }}
      >
        <div>
          <div className="text-center my-4">
            <h4
              className="fw-bold border border-warning p-2 rounded text-uppercase"
              style={{ color: "#ffc107", letterSpacing: "1px" }}
            >
              Bitácora<span className="text-white">Club</span>
            </h4>
          </div>

          <div className="nav flex-column gap-2 mt-4">
            <button
              onClick={() => setVistaActiva("resumen")}
              className={`nav-link text-start text-white border-0 p-3 rounded-3 fw-bold ${vistaActiva === "resumen" ? "bg-secondary" : "bg-transparent"}`}
            >
              <i className="bi bi-speedometer2 me-2"></i> Resumen
            </button>
            <button
              onClick={() => setVistaActiva("cotizaciones")}
              className={`nav-link text-start text-white border-0 p-3 rounded-3 fw-bold ${vistaActiva === "cotizaciones" ? "bg-warning text-dark" : "bg-transparent"}`}
            >
              <i className="bi bi-file-earmark-text me-2"></i> Cotizaciones
            </button>
            <button
              onClick={() => setVistaActiva("noticias")}
              className={`nav-link text-start text-white border-0 p-3 rounded-3 fw-bold ${vistaActiva === "noticias" ? "bg-secondary" : "bg-transparent"}`}
            >
              <i className="bi bi-newspaper me-2"></i> Noticias
            </button>
            <button
              onClick={() => setVistaActiva("promociones")}
              className={`nav-link text-start text-white border-0 p-3 rounded-3 fw-bold ${vistaActiva === "promociones" ? "bg-secondary" : "bg-transparent"}`}
            >
              <i className="bi bi-tags me-2"></i> Promociones
            </button>
          </div>
        </div>

        <div className="border-top pt-3 text-center">
          <small className="d-block text-white-50 mb-2 text-truncate">
            {user?.correo || "admin@bitacora.com"}
          </small>
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-outline-danger w-100 fw-bold"
          >
            <i className="bi bi-box-arrow-left me-2"></i>Cerrar Sesión
          </button>
        </div>
      </div>

      {/* ÁREA DE CONTENIDO */}
      <div className="flex-grow-1 bg-light p-4 overflow-auto">
        <header className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <span
              className="text-uppercase text-muted fw-bold fs-7"
              style={{ letterSpacing: "1px" }}
            >
              Panel Interno
            </span>
            <h1 className="h2 m-0 fw-bold text-dark">Gestión Bitácora Club</h1>
          </div>
        </header>

        <main>
          {vistaActiva === "resumen" && (
            <AdminResumen cambiarVista={setVistaActiva} />
          )}

          {/* Mapeo de Cotizaciones (ex-contactos) */}
          {vistaActiva === "cotizaciones" && <AdminContactos />}

          {vistaActiva === "noticias" && <AdminNoticias />}

          {vistaActiva === "promociones" && <AdminPromociones />}
        </main>
      </div>
    </div>
  );
}
