import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PromocionesSimple() {
  const { id } = useParams();
  const [paquete, setPaquete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/promociones/${id}`)
      .then(res => res.json())
      .then(data => { setPaquete(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 fondo-claro">
        <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!paquete) {
    return (
      <div className="container text-center py-5 my-5">
        <div className="p-5 bg-white rounded-4 shadow-sm d-inline-block">
          <i className="bi bi-compass text-warning display-1 mb-3"></i>
          <h3 className="fw-bold text-dark">Paquete no encontrado</h3>
          <p className="text-muted mb-4">La promoción que buscas no existe o ha sido eliminada.</p>
          <Link to="/promociones" className="btn btn-warning text-white fw-bold px-4 rounded-pill">
            Explorar catálogo
          </Link>
        </div>
      </div>
    );
  }

  const numeroTelefono = "51960260194"; 
  const mensajePredeterminado = `Hola Bitácora Club, me interesa obtener información de la promoción: ${paquete.titulo}`;
  const whatsappUrl = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensajePredeterminado)}`;

  return (
    <div  className="min-vh-100 pb-5 fondo-claro">
      <div className="container pt-4">
        
        {/* Botón de regreso minimalista */}
        <Link 
          to="/promociones" 
          className="btn btn-white bg-white text-dark fw-bold rounded-pill shadow-sm border px-3 py-2 mb-4 d-inline-flex align-items-center gap-2 text-decoration-none transition-all"
        >
          <i className="bi bi-arrow-left text-warning"></i> Volver al catálogo
        </Link>

        <div className="row g-4 mb-5">
          {/* COLUMNA IZQUIERDA: Banner y Contenido Principal */}
          <div className="col-lg-8">
            
            {/* Imagen Principal con Badge Flotante */}
            <div className="position-relative overflow-hidden rounded-4 shadow-sm mb-4" style={{ maxHeight: '460px' }}>
              <img 
                src={`http://localhost:5000${paquete.imagen}`} 
                className="w-100 h-100 object-fit-cover" 
                style={{ objectFit: 'cover', minHeight: '320px' }} 
                alt={paquete.titulo} 
              />
              <span className="position-absolute top-0 start-0 m-3 badge bg-white text-dark fw-bold rounded-pill px-3 py-2 shadow-sm text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
                📍 {paquete.destino || 'Nacional'}
              </span>
            </div>

            {/* Encabezado */}
            <div className="mb-4">
              <h1 className="fw-extrabold text-dark display-6 mb-3">{paquete.titulo}</h1>
              {paquete.resumen && (
                <p className="lead text-secondary fs-6 lh-base">{paquete.resumen}</p>
              )}
            </div>

            {/* Bloque de Incluye vs No Incluye */}
            <div className="row g-3 mb-4">
              {paquete.incluye && (
                <div className="col-md-6">
                  <div className="p-4 rounded-4 bg-success bg-opacity-10 border border-success border-opacity-25 h-100">
                    <h6 className="fw-bold text-success mb-3 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill fs-5"></i> ¿Qué incluye?
                    </h6>
                    <p className="small text-secondary mb-0" style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                      {paquete.incluye}
                    </p>
                  </div>
                </div>
              )}

              {paquete.no_incluye && (
                <div className="col-md-6">
                  <div className="p-4 rounded-4 bg-danger bg-opacity-10 border border-danger border-opacity-25 h-100">
                    <h6 className="fw-bold text-danger mb-3 d-flex align-items-center gap-2">
                      <i className="bi bi-x-circle-fill fs-5"></i> No incluye
                    </h6>
                    <p className="small text-secondary mb-0" style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                      {paquete.no_incluye}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Itinerario con línea vertical estilizada */}
            {paquete.itinerario && (
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-map-fill text-warning"></i> Itinerario Detallado
                </h5>
                <div className="ps-3 border-start border-3 border-warning opacity-90">
                  <p className="text-secondary m-0" style={{ whiteSpace: 'pre-line', lineHeight: '1.8', fontSize: '0.95rem' }}>
                    {paquete.itinerario}
                  </p>
                </div>
              </div>
            )}

            {/* Términos opcionales */}
            {paquete.terminos && (
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h6 className="fw-bold text-muted mb-2 small text-uppercase">Términos y Condiciones</h6>
                <p className="small text-muted m-0" style={{ whiteSpace: 'pre-line' }}>
                  {paquete.terminos}
                </p>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA: Card Sticky de Reserva */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg p-4 bg-white rounded-4 position-sticky" style={{ top: '24px' }}>
              
              <span className="badge bg-warning bg-opacity-10 text-warning-emphasis border border-warning-subtle rounded-pill align-self-start px-3 py-2 fw-bold text-uppercase mb-3" style={{ fontSize: '0.75rem' }}>
                Precio Promocional
              </span>

              <div className="mb-3">
                <small className="text-muted d-block fw-semibold mb-1">Precio por persona desde</small>
                <div className="d-flex align-items-baseline gap-1">
                  <span className="fs-3 fw-bold text-dark">S/</span>
                  <span className="display-6 fw-bold text-dark">
                    {parseFloat(paquete.precio).toFixed(2)}
                  </span>
                </div>
              </div>

              <hr className="my-3 opacity-10" />

              <div className="d-flex flex-column gap-2 mb-4">
                <div className="d-flex align-items-center gap-2 text-secondary small">
                  <i className="bi bi-geo-alt text-warning fs-6"></i>
                  <span>Destino: <strong>{paquete.destino || 'Nacional'}</strong></span>
                </div>
                <div className="d-flex align-items-center gap-2 text-secondary small">
                  <i className="bi bi-shield-check text-success fs-6"></i>
                  <span>Garantía de reserva oficial</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-secondary small">
                  <i className="bi bi-chat-dots text-primary fs-6"></i>
                  <span>Atención inmediata 24/7</span>
                </div>
              </div>

              {/* Botón CTA a WhatsApp */}
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-success btn-lg w-100 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2 py-3 transition-all"
                style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
              >
                <i className="bi bi-whatsapp fs-5"></i> Solicitar por WhatsApp
              </a>

              <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: '0.75rem' }}>
                ⚡ Te responderemos en menos de 5 minutos.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}