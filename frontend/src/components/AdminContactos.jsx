import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from "../services/api";

export default function AdminContactos() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState('todos');

  useEffect(() => {
    obtenerContactos();
  }, []);

  const obtenerContactos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contactos`);
      const data = await response.json();
      setContactos(data);
    } catch (error) {
      console.error("Error al traer contactos:", error);
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contactos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      if (response.ok) {
        obtenerContactos(); // Refresca la lista tras actualizar
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const eliminarContacto = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este mensaje de la base de datos?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/contactos/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          obtenerContactos();
        }
      } catch (error) {
        console.error("Error al eliminar contacto:", error);
      }
    }
  };

  // Filtrado dinámico en frontend
  const contactosFiltrados = contactos.filter(c => {
    if (filtroEstado === 'todos') return true;
    return c.estado === filtroEstado;
  });

  return (
    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
      
      {/* Encabezado y Filtros */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 border-bottom pb-3 gap-3">
        <div>
          <h3 className="m-0 fw-bold text-dark">Bandeja de Contactos</h3>
          <p className="text-muted m-0 small">Gestiona los mensajes y solicitudes de cotización recibidas.</p>
        </div>
        
        {/* Filtros de estado */}
        <div className="btn-group" role="group">
          <button 
            className={`btn btn-sm px-3 ${filtroEstado === 'todos' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setFiltroEstado('todos')}
          >
            Todos
          </button>
          <button 
            className={`btn btn-sm px-3 ${filtroEstado === 'pendiente' ? 'btn-warning text-white fw-bold' : 'btn-outline-warning'}`}
            onClick={() => setFiltroEstado('pendiente')}
          >
            Pendientes
          </button>
          <button 
            className={`btn btn-sm px-3 ${filtroEstado === 'respondido' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setFiltroEstado('respondido')}
          >
            Respondidos
          </button>
        </div>
      </div>

      {/* Tabla de Mensajes */}
      {loading ? (
        <div className="text-center py-5">Cargando mensajes...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light text-uppercase fs-7 text-secondary">
              <tr>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Mensaje / Solicitud</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contactosFiltrados.map((contacto) => (
                <tr key={contacto.id} style={{ borderLeft: contacto.estado === 'pendiente' ? '4px solid #ffc107' : '4px solid #28a745' }}>
                  <td>
                    <div className="fw-bold text-dark">{contacto.nombre}</div>
                    <small className="text-muted">ID: #{contacto.id}</small>
                  </td>
                  <td>
                    <div className="small"><i className="bi bi-envelope-fill me-1 text-secondary"></i> {contacto.correo}</div>
                    <div className="small text-muted"><i className="bi bi-telephone-fill me-1"></i> {contacto.telefono}</div>
                  </td>
                  <td>
                    {contacto.paqueteInteres && (
                      <span className="badge bg-light text-dark border mb-1 d-inline-block">
                        Interés: {contacto.paqueteInteres}
                      </span>
                    )}
                    <p className="m-0 text-secondary small text-wrap" style={{ maxWidth: '300px' }}>{contacto.mensaje}</p>
                  </td>
                  <td className="small text-muted">
                    {new Date(contacto.fecha).toLocaleDateString('es-PE')}
                  </td>
                  <td>
                    <select 
                      className={`form-select form-select-sm fw-bold ${contacto.estado === 'pendiente' ? 'text-warning border-warning' : 'text-success border-success'}`}
                      value={contacto.estado}
                      onChange={(e) => cambiarEstado(contacto.id, e.target.value)}
                      style={{ width: '130px' }}
                    >
                      <option value="pendiente">⚠️ Pendiente</option>
                      <option value="respondido">✅ Respondido</option>
                    </select>
                  </td>
                  <td className="text-center">
                    <div className="d-flex gap-2 justify-content-center">
                      {/* Botón rápido de acción vía WhatsApp Web */}
                      <a 
                        href={`https://wa.me/${contacto.telefono.replace(/\s+/g, '')}?text=Hola%20${encodeURIComponent(contacto.nombre)},%20te%20escribimos%20de%20Bitácora%20Club%20respecto%20a%20tu%20consulta.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-success"
                        title="Responder por WhatsApp"
                        onClick={() => {
                          if (contacto.estado === 'pendiente') cambiarEstado(contacto.id, 'respondido');
                        }}
                      >
                        <i className="bi bi-whatsapp"></i>
                      </a>
                      <button 
                        onClick={() => eliminarContacto(contacto.id)} 
                        className="btn btn-sm btn-outline-danger"
                        title="Eliminar registro"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {contactosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    <i className="bi bi-chat-left-dots display-6 d-block mb-2 text-black-50"></i>
                    No hay mensajes en esta categoría.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}