import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Components.css";
import { API_BASE_URL } from "../services/api";

export default function TarjetasPromociones() {
  const [promociones, setPromociones] = useState([]);
  // MODIFICADO: Agregamos estado de carga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/promociones`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPromociones(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar promociones:", err);
        setLoading(false);
      });
  }, []);

  // Servidor base limpio para rutas de imágenes estáticas
  const BASE_SERVER_URL = API_BASE_URL.replace('/api', '');

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando promociones...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="titulo text-uppercase">Últimas Promociones</h2>
        <Link to="/promociones" className="btn btn-warning text-white fw-bold px-4 py-2 rounded-3 shadow-sm">
          VER MÁS PROMOCIONES
        </Link>
      </div>

      <div className="row g-4">
        {promociones.length === 0 ? (
          <div className="col-12 text-center text-muted">
            <p>No hay promociones disponibles en este momento.</p>
          </div>
        ) : (
          promociones.slice(0, 3).map(promo => (
            <div className="col-md-4" key={promo.id}>
              <div className="tarjeta-paquete p-3 h-100 d-flex flex-column">
                <div className="position-relative">
                  {/* MODIFICADO: Concatenación dinámica de imágenes sin duplicar /api */}
                  <img 
                    src={promo.imagen ? `${BASE_SERVER_URL}${promo.imagen}` : 'https://via.placeholder.com/350x200'} 
                    className="imagen-tarjeta-paquete" 
                    alt={promo.titulo}
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between px-1 pt-3 pb-0 flex-grow-1">
                  <div>
                    <span className="text-warning text-uppercase fw-bold small d-block mb-1">
                      <i className="bi bi-geo-alt-fill me-1"></i>{promo.destino || 'Nacional'}
                    </span>
                    <h5 className="titulo-tarjeta-paquete lh-sm mb-3">
                      {promo.titulo}
                    </h5>
                    {/* MODIFICADO: Lógica de recorte de resumen corregida */}
                    <p className="text-muted small mb-4">
                      {promo.resumen && promo.resumen.length > 120 
                        ? `${promo.resumen.substring(0, 120)}...` 
                        : promo.resumen}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
                    <span className="fw-bold text-dark fs-5">S/ {parseFloat(promo.precio).toFixed(2)}</span>
                    <Link to={`/paquete/${promo.id}`} className="btn btn-warning text-white fw-bold px-4 rounded-3">
                      VER PROMOCIÓN
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}