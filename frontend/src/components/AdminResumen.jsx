import React, { useState, useEffect } from 'react';
import { API_BASE_URL} from "../services/api";

export default function AdminResumen({ cambiarVista }) {
  const [metricas, setMetricas] = useState({
    totales: 0,
    pendientes: 0,
    noticias: 0,
    promociones: 0,
    ultimosContactos: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerMetricas();
  }, []);

  const obtenerMetricas = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/resumen/metricas`);
      if (response.ok) {
        const data = await response.json();
        setMetricas(data);
      }
    } catch (error) {
      console.error("Error al cargar el resumen:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando panel...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Encabezado de Bienvenida */}
      <div className="mb-4">
        <h3 className="fw-bold text-dark m-0">Panel de Control General</h3>
        <p className="text-muted small m-0">Aquí tienes un vistazo rápido del rendimiento de tu plataforma web hoy.</p>
      </div>

      {/* Fila de Tarjetas Estadísticas */}
      <div className="row g-4 mb-5">
        
        {/* Tarjeta 1: Cotizaciones Totales */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted fw-bold small text-uppercase d-block mb-1">Cotizaciones</span>
                <h2 className="fw-bold m-0 text-dark">{metricas.totales}</h2>
              </div>
              <div className="bg-light-primary text-primary p-3 rounded-3" style={{ backgroundColor: '#e8f0fe', color: '#1a73e8' }}>
                <i className="bi bi-file-earmark-person fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Clientes Pendientes */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white" style={{ borderRadius: '15px', borderLeft: '4px solid #ffc107' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted fw-bold small text-uppercase d-block mb-1">Por Responder</span>
                <h2 className="fw-bold m-0 text-warning">{metricas.pendientes}</h2>
              </div>
              <div className="p-3 rounded-3" style={{ backgroundColor: '#fff8e1', color: '#ffb300' }}>
                <i className="bi bi-clock-history fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Noticias Publicadas */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted fw-bold small text-uppercase d-block mb-1">Noticias Web</span>
                <h2 className="fw-bold m-0 text-dark">{metricas.noticias}</h2>
              </div>
              <div className="p-3 rounded-3" style={{ backgroundColor: '#e2f5ea', color: '#137333' }}>
                <i className="bi bi-newspaper fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 4: Promociones Corriendo */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted fw-bold small text-uppercase d-block mb-1">Promociones</span>
                <h2 className="fw-bold m-0 text-dark">{metricas.promociones}</h2>
              </div>
              <div className="p-3 rounded-3" style={{ backgroundColor: '#fce8e6', color: '#c5221f' }}>
                <i className="bi bi-tags fs-3"></i>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bloque Inferior: Últimos Contactos Entrantes */}
      <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="m-0 fw-bold text-dark">Actividad Reciente</h5>
            <p className="text-muted small m-0">Últimas consultas recibidas a través de los formularios web.</p>
          </div>
          <button 
            onClick={() => cambiarVista('cotizaciones')} 
            className="btn btn-sm btn-outline-warning fw-bold px-3 rounded-pill"
          >
            Ver Todas
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            <thead className="table-light text-uppercase fs-7 text-secondary">
              <tr>
                <th>Cliente</th>
                <th>Celular</th>
                <th>Paquete de Interés</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {metricas.ultimosContactos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">No registras ninguna consulta entrante por ahora.</td>
                </tr>
              ) : (
                metricas.ultimosContactos.map((contacto) => (
                  <tr key={contacto.id}>
                    <td>
                      <div className="fw-bold text-dark">{contacto.nombre}</div>
                      <span className="small text-muted">{contacto.correo}</span>
                    </td>
                    <td>{contacto.telefono}</td>
                    <td><span className="badge bg-light text-dark border">{contacto.paqueteInteres}</span></td>
                    <td>
                      <span className={`badge px-3 py-2 rounded-pill ${contacto.estado === 'pendiente' ? 'bg-warning text-white' : 'bg-success text-white'}`}>
                        {contacto.estado === 'pendiente' ? 'Pendiente' : 'Respondido'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}