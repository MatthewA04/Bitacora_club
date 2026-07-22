import React, { useState, useEffect } from "react";
import "./Components.css";
import { API_BASE_URL} from "../services/api";

function QuoteForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    destino: "",
    servicio: "",
    fechaViaje: "",
    personas: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefono") {
      const soloNumeros = value.replace(/[^0-9]/g, "");
      if (soloNumeros.length <= 9) {
        setFormData((prev) => ({
          ...prev,
          [name]: soloNumeros,
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    if (!formData.telefono || formData.telefono.length !== 9) {
      setStatus({
        loading: false,
        success: null,
        error: "Tu número de celular debe tener exactamente 9 dígitos.",
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cotizaciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          loading: false,
          success:
            "¡Cotización enviada con éxito! Pronto nos contactaremos contigo.",
          error: null,
        });
        setFormData({
          nombre: "",
          correo: "",
          telefono: "",
          destino: "",
          servicio: "",
          fechaViaje: "",
          personas: "",
        });
      } else {
        throw new Error("Error en el servidor");
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: null,
        error: "No se pudo enviar la cotización. Inténtalo de nuevo más tarde.",
      });
    }
  };

  return (
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Nombre */}
            <div className="col-md-6">
              <label className="form-label text-uppercase fw-bold text-dark-50 texto-form">
                Nombre*
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="form-control border-0 p-3 input-form"
              />
            </div>

            {/* Correo */}
            <div className="col-md-6">
              <label className="form-label text-uppercase fw-bold text-dark-50 texto-form">
                Correo*
              </label>
              <input
                type="email"
                name="correo"
                required
                value={formData.correo}
                onChange={handleChange}
                className="form-control border-0 p-3 input-form"
              />
            </div>
            <div className="col-md-6">
              <label
                className="form-label text-uppercase fw-bold text-dark-50 texto-form"
              >
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                inputMode="numeric"
                maxLength="9" 
                placeholder="Ej. 999888777"
                required 
                value={formData.telefono}
                onChange={handleChange}
                className="form-control border-0 p-3 input-form"
              />
            </div>

            {/* Destino: Entrada de texto libre) */}
            <div className="col-md-6">
              <label
                className="form-label text-uppercase fw-bold text-dark-50 texto-form"
              >
                Destino
              </label>
              <input
                type="text"
                name="destino"
                placeholder="Ej. Cusco, Máncora, Tarapoto..."
                value={formData.destino}
                onChange={handleChange}
                className="form-control border-0 p-3 input-form"
              />
            </div>

            {/* Servicio */}
            <div className="col-12">
              <label
                className="form-label text-uppercase fw-bold text-dark-50 texto-form"
              >
                Servicio
              </label>
              <select
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className="form-select border-0 p-3 input-form"
              >
                <option value="">Selecciona un servicio</option>
                <option value="viajes">
                  Viajes completados (Todo Incluido)
                </option>
                <option value="hoteles">Solo Hoteles</option>
                <option value="traslados">Solo Traslados</option>
                <option value="tours">Solo Actividades y Tours</option>
              </select>
            </div>

            {/* Fecha de viaje: Bloquea días pasados */}
            <div className="col-md-6">
              <label
                className="form-label text-uppercase fw-bold text-dark-50 texto-form"
              >
                Fecha de Viaje
              </label>
              <input
                type="date"
                name="fechaViaje"
                min={todayDate}
                value={formData.fechaViaje}
                onChange={handleChange}
                className="form-control border-0 p-3 input-form"
              />
            </div>

            {/* Personas: Máximo lógico */}
            <div className="col-md-6">
              <label
                className="form-label text-uppercase fw-bold text-dark-50 texto-form"
              >
                Personas
              </label>
              <input
                type="number"
                name="personas"
                min="1"
                max="20" 
                placeholder="Ej. 2"
                value={formData.personas}
                onChange={handleChange}
                className="form-control border-0 p-3 input-form"
              />
            </div>
          </div>

          {/* Feedback visual */}
          {status.success && (
            <div
              className="alert alert-success mt-4 rounded-3 text-center animate__animated animate__fadeIn"
              role="alert"
            >
              {status.success}
            </div>
          )}
          {status.error && (
            <div
              className="alert alert-danger mt-4 rounded-3 text-center animate__animated animate__shakeX"
              role="alert"
            >
              {status.error}
            </div>
          )}

          {/* Botón de envío */}
          <div className="text-center mt-5">
            <button
              type="submit"
              disabled={status.loading}
              className="btn btn-warning text-white fw-bold px-5 py-3 text-uppercase shadow-sm w-100"
              style={{
                backgroundColor: "#fca922",
                borderRadius: "12px",
                fontSize: "15px",
                letterSpacing: "1.5px",
                maxWidth: "400px",
              }}
            >
              {status.loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </button>
          </div>
        </form>
  );
}

export default QuoteForm;
