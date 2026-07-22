import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Components.css";

export default function TarjetasPromociones() {
  const [promociones, setPromociones] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/promociones')
      .then(res => res.json())
      .then(data => setPromociones(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="titulo text-uppercase">Últimas Promociones</h2>
        <Link to="/promociones" className="btn btn-warning text-white fw-bold px-4 py-2 rounded-3 shadow-sm">
          VER MÁS PROMOCIONES
        </Link>
      </div>

      <div className="row g-4">
        {promociones.slice(0, 3).map(promo => (
          <div className="col-md-4" key={promo.id}>
            <div className="tarjeta-paquete p-3">
              <div className="position-relative">
                <img 
                  src={promo.imagen ? `http://localhost:5000${promo.imagen}` : 'https://via.placeholder.com/350x200'} 
                  className="imagen-tarjeta-paquete" 
                  alt={promo.titulo}
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between px-1 pt-3 pb-0">
                <div>
                  <span className="text-warning text-uppercase fw-bold small d-block mb-1">
                    <i className="bi bi-geo-alt-fill me-1"></i>{promo.destino || 'Nacional'}
                  </span>
                  <h5 className="titulo-tarjeta-paquete lh-sm mb-3" >
                    {promo.titulo}
                  </h5>
                  <p className="text-muted small mb-4">
                    {promo.resumen.length > 105 ? `${promo.resumen.substring(0, 250)}...` : promo.resumen}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                  <span className="fw-bold text-dark fs-5">S/ {parseFloat(promo.precio).toFixed(2)}</span>
                  <Link to={`/paquete/${promo.id}`} className="btn btn-warning text-white fw-bold px-4 rounded-3">
                    VER PROMOCIÓN
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}