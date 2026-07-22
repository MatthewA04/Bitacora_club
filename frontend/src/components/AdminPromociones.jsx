import React, { useState, useEffect, useRef } from 'react';

export default function AdminPromociones() {
  const [subVista, setSubVista] = useState('ver');
  const [promociones, setPromociones] = useState([]);
  const [loading, setLoading] = useState(false);

  // Formulario de creación
  const [formData, setFormData] = useState({
    titulo: '',
    destino: '', 
    resumen: '',
    itinerario: '',
    incluye: '',
    no_incluye: '',
    actividades: '',
    terminos: '',
    precio: '',
    es_recomendado: false
  });
  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Estados para la EDICIÓN
  const [promoEditando, setPromoEditando] = useState(null);
  const [editFormData, setEditFormData] = useState({
    titulo: '',
    destino: '', 
    resumen: '',
    itinerario: '',
    incluye: '',
    no_incluye: '',
    actividades: '',
    terminos: '',
    precio: '',
    es_recomendado: false
  });
  const [editImagenArchivo, setEditImagenArchivo] = useState(null);
  const [editVistaPrevia, setEditVistaPrevia] = useState(null);
  const editFileInputRef = useRef(null);

  useEffect(() => {
    obtenerPromociones();
  }, []);

  const obtenerPromociones = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/promociones');
      if (!response.ok) throw new Error(`Error en el servidor: Status ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setPromociones(data);
      } else {
        console.error("Los datos devueltos no son un arreglo:", data);
        setPromociones([]);
      }
    } catch (error) {
      console.error("Error crítico al traer promociones:", error);
      alert("Error al conectar con las promociones: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (promo) => {
    setPromoEditando(promo);
    setEditFormData({
      titulo: promo.titulo,
      destino: (promo.destino || '').toUpperCase(),
      resumen: promo.resumen,
      itinerario: promo.itinerario,
      incluye: promo.incluye,
      no_incluye: promo.no_incluye,
      actividades: promo.actividades,
      terminos: promo.terminos,
      precio: promo.precio,
      es_recomendado: Boolean(promo.es_recomendado)
    });
    setEditVistaPrevia(promo.imagen ? `http://localhost:5000${promo.imagen}` : null);
    setEditImagenArchivo(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append('titulo', editFormData.titulo);
    dataToSend.append('destino', editFormData.destino.toUpperCase()); 
    dataToSend.append('resumen', editFormData.resumen);
    dataToSend.append('itinerario', editFormData.itinerario);
    dataToSend.append('incluye', editFormData.incluye);
    dataToSend.append('no_incluye', editFormData.no_incluye);
    dataToSend.append('actividades', editFormData.actividades);
    dataToSend.append('terminos', editFormData.terminos);
    dataToSend.append('precio', editFormData.precio);
    dataToSend.append('es_recomendado', editFormData.es_recomendado);

    if (editImagenArchivo) {
      dataToSend.append('imagen', editImagenArchivo);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/promociones/${promoEditando.id}`, {
        method: 'PUT',
        body: dataToSend
      });
      if (response.ok) {
        alert("¡Promoción actualizada correctamente!");
        setPromoEditando(null);
        obtenerPromociones();
      } else {
        const err = await response.json();
        alert("Error al actualizar: " + (err.error || response.statusText));
      }
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  const toggleRecomendadoRápido = async (promo) => {
    const dataToSend = new FormData();
    dataToSend.append('titulo', promo.titulo);
    dataToSend.append('destino', (promo.destino || '').toUpperCase()); 
    dataToSend.append('resumen', promo.resumen);
    dataToSend.append('itinerario', promo.itinerario);
    dataToSend.append('incluye', promo.incluye);
    dataToSend.append('no_incluye', promo.no_incluye);
    dataToSend.append('actividades', promo.actividades);
    dataToSend.append('terminos', promo.terminos);
    dataToSend.append('precio', promo.precio);
    dataToSend.append('es_recomendado', !promo.es_recomendado);

    try {
      const response = await fetch(`http://localhost:5000/api/promociones/${promo.id}`, {
        method: 'PUT',
        body: dataToSend
      });
      if (response.ok) {
        obtenerPromociones();
      }
    } catch (error) {
      console.error("Error al cambiar estado recomendado:", error);
    }
  };

  const eliminarPromocion = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta promoción de forma permanente?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/promociones/${id}`, { method: 'DELETE' });
        if (response.ok) obtenerPromociones();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h3 className="m-0 fw-bold text-dark">Gestión de Promociones Extendido</h3>
        <div className="btn-group">
          <button className={`btn px-4 ${subVista === 'ver' ? 'btn-warning text-white' : 'btn-outline-secondary'}`} onClick={() => setSubVista('ver')}>Ver Promociones</button>
          <button className={`btn px-4 ${subVista === 'crear' ? 'btn-warning text-white' : 'btn-outline-secondary'}`} onClick={() => setSubVista('crear')}>Crear Promoción</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : subVista === 'ver' ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light text-uppercase fs-7 text-secondary">
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Destino</th>
                <th>Precio</th>
                <th className="text-center">Recomendado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {promociones.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">No hay promociones u ofertas activas.</td>
                </tr>
              ) : (
                promociones.map((promo) => (
                  <tr key={promo.id}>
                    <td>
                      <img src={promo.imagen ? `http://localhost:5000${promo.imagen}` : 'https://via.placeholder.com/60'} alt="" className="rounded" style={{ width: '60px', height: '40px', objectFit: 'cover' }} />
                    </td>
                    <td className="fw-bold text-dark">{promo.titulo}</td>
                    <td className="fw-semibold text-uppercase text-primary">{promo.destino || "NO ASIGNADO"}</td>
                    <td className="fw-bold text-success">S/ {parseFloat(promo.precio).toFixed(2)}</td>
                    <td className="text-center">
                      <button 
                        onClick={() => toggleRecomendadoRápido(promo)} 
                        className={`btn btn-sm ${promo.es_recomendado ? 'btn-warning text-white' : 'btn-outline-secondary'}`}
                        title="Haz clic para cambiar el estado de recomendado"
                      >
                        <i className={`bi ${promo.es_recomendado ? 'bi-star-fill' : 'bi-star'} me-1`}></i>
                        {promo.es_recomendado ? 'Destacado' : 'Normal'}
                      </button>
                    </td>
                    <td className="text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        <button onClick={() => iniciarEdicion(promo)} className="btn btn-sm btn-outline-primary px-3">Editar</button>
                        <button onClick={() => eliminarPromocion(promo.id)} className="btn btn-sm btn-outline-danger px-3">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* FORMULARIO DE CREACIÓN */
        <form onSubmit={async (e) => {
          e.preventDefault();
          if (!imagenArchivo) return alert("Por favor, sube un banner publicitario.");
          if (!formData.destino.trim()) return alert("Por favor, ingresa un destino.");
          
          const d = new FormData(); 
          Object.keys(formData).forEach(key => {
            if (key === 'destino') {
              d.append(key, formData[key].trim().toUpperCase());
            } else {
              d.append(key, formData[key]);
            }
          });
          d.append('imagen', imagenArchivo);
          
          try {
            const r = await fetch('http://localhost:5000/api/promociones', { method: 'POST', body: d });
            if (r.ok) { 
              alert("¡Nueva promoción publicada exitosamente!"); 
              setFormData({ titulo: '', destino: '', resumen: '', itinerario: '', incluye: '', no_incluye: '', actividades: '', terminos: '', precio: '', es_recomendado: false }); 
              setImagenArchivo(null); 
              setVistaPrevia(null); 
              setSubVista('ver'); 
              obtenerPromociones(); 
            }
          } catch (error) {
            console.error("Error al publicar promoción:", error);
          }
        }} className="row g-4">
          
          <div className="col-md-5">
            <label className="form-label fw-bold text-dark">1. Título de la Promoción</label>
            <input type="text" className="form-control border-2" placeholder="Ej: Tour Machu Picchu" value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} required />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold text-dark">2. Destino Geográfico</label>
            <input 
              type="text" 
              className="form-control border-2 text-uppercase fw-semibold" 
              placeholder="Ej: CUSCO, ICA, PARACAS..." 
              value={formData.destino} 
              onChange={(e) => setFormData({...formData, destino: e.target.value.toUpperCase()})} 
              required 
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-bold text-dark">3. Precio (S/)</label>
            <input type="number" step="0.01" className="form-control border-2 fw-bold text-success" placeholder="0.00" value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} required />
          </div>

          {/* CHECKBOX PARA MÁS RECOMENDADO / DESTACADO */}
          <div className="col-12">
            <div className="p-3 border border-warning rounded-3 bg-light d-flex align-items-center justify-content-between">
              <div>
                <h6 className="m-0 fw-bold text-dark"><i className="bi bi-star-fill text-warning me-2"></i>¿Marcar como Mas Recomendado / Destacado?</h6>
                <small className="text-muted">Aparecerá fijado en la sección principal de Recomendados de la web.</small>
              </div>
              <div className="form-check form-switch fs-4">
                <input 
                  className="form-check-input style-pointer" 
                  type="checkbox" 
                  role="switch" 
                  checked={formData.es_recomendado} 
                  onChange={(e) => setFormData({...formData, es_recomendado: e.target.checked})} 
                />
              </div>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label fw-bold text-dark">4. Imagen o Banner Publicitario</label>
            <div 
              className={`text-center p-4 rounded-3 border-2 ${isDragging ? 'border-warning bg-light text-warning shadow-sm' : 'border-secondary text-muted bg-white'}`}
              style={{ borderStyle: 'dashed', cursor: 'pointer', transition: 'all 0.2s ease-in-out' }} 
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault(); setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) { setImagenArchivo(file); setVistaPrevia(URL.createObjectURL(file)); }
              }}
            >
              <input type="file" ref={fileInputRef} className="d-none" accept="image/*" onChange={(e) => { const f = e.target.files[0]; if(f){ setImagenArchivo(f); setVistaPrevia(URL.createObjectURL(f)); } }} />
              {vistaPrevia ? (
                <div className="position-relative d-inline-block">
                  <img src={vistaPrevia} alt="" className="rounded-3 img-fluid" style={{ maxHeight: '160px', objectFit: 'cover' }} />
                  <span className="badge bg-dark position-absolute bottom-0 start-50 translate-middle-x mb-2">Cambiar Banner</span>
                </div>
              ) : (
                <div>
                  <i className="bi bi-cloud-arrow-up text-warning h2 mb-1 d-block"></i>
                  <p className="fw-bold m-0 text-dark small">Arrastra el banner aquí u haz clic para explorar</p>
                </div>
              )}
            </div>
          </div>

          <div className="col-12">
            <label className="form-label fw-bold text-dark">5. Resumen de la Promoción</label>
            <textarea className="form-control border-2" rows="2" placeholder="Breve enganche comercial para listados rápidos..." value={formData.resumen} onChange={(e) => setFormData({...formData, resumen: e.target.value})} required></textarea>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold text-dark">6. Itinerario (Día por día)</label>
            <textarea className="form-control border-2" rows="4" placeholder="Día 1: Recepción...&#10;Día 2: Caminata guiada..." value={formData.itinerario} onChange={(e) => setFormData({...formData, itinerario: e.target.value})} required></textarea>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold text-dark">7. Actividades Incluidas</label>
            <textarea className="form-control border-2" rows="4" placeholder="Ej: Trekking, Canopy, City Tour nocturno..." value={formData.actividades} onChange={(e) => setFormData({...formData, actividades: e.target.value})} required></textarea>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold text-dark">8. ¿Qué Incluye?</label>
            <textarea className="form-control border-2" rows="3" placeholder="Ej: Desayunos buffet, Tickets de tren..." value={formData.incluye} onChange={(e) => setFormData({...formData, incluye: e.target.value})} required></textarea>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold text-dark">9. ¿Qué NO Incluye?</label>
            <textarea className="form-control border-2" rows="3" placeholder="Ej: Vuelos internacionales, Almuerzos libres..." value={formData.no_incluye} onChange={(e) => setFormData({...formData, no_incluye: e.target.value})} required></textarea>
          </div>

          <div className="col-12">
            <label className="form-label fw-bold text-dark">Términos y Condiciones</label>
            <textarea className="form-control border-2" rows="2" placeholder="Políticas de cancelación..." value={formData.terminos} onChange={(e) => setFormData({...formData, terminos: e.target.value})} required></textarea>
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn btn-warning text-white btn-lg fw-bold px-5 rounded-3 shadow-sm">
              <i className="bi bi-patch-check-fill me-2"></i>Lanzar Promoción
            </button>
          </div>
        </form>
      )}

      {/* MODAL DE EDICIÓN */}
      {promoEditando && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050, overflowY: 'auto' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow p-3">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-dark">Modificar Datos de la Promoción</h5>
                <button type="button" className="btn-close" onClick={() => setPromoEditando(null)}></button>
              </div>
              <form onSubmit={handleEditSubmit} className="row g-3 modal-body">
                <div className="col-md-5">
                  <label className="form-label fw-bold small">Título</label>
                  <input type="text" className="form-control" value={editFormData.titulo} onChange={(e) => setEditFormData({...editFormData, titulo: e.target.value})} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold small">Destino</label>
                  <input 
                    type="text" 
                    className="form-control text-uppercase fw-semibold" 
                    value={editFormData.destino} 
                    onChange={(e) => setEditFormData({...editFormData, destino: e.target.value.toUpperCase()})} 
                    required 
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-bold small">Precio (S/)</label>
                  <input type="number" step="0.01" className="form-control text-success fw-bold" value={editFormData.precio} onChange={(e) => setEditFormData({...editFormData, precio: e.target.value})} required />
                </div>

                {/* OPCIÓN DESTACADO EN EL MODAL DE EDICIÓN */}
                <div className="col-12">
                  <div className="p-2 px-3 border border-warning rounded bg-light d-flex align-items-center justify-content-between">
                    <span className="fw-bold small text-dark"><i className="bi bi-star-fill text-warning me-2"></i>¿Destacar como Más Recomendado?</span>
                    <div className="form-check form-switch m-0">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        role="switch" 
                        checked={editFormData.es_recomendado} 
                        onChange={(e) => setEditFormData({...editFormData, es_recomendado: e.target.checked})} 
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold small">Imagen Publicitaria</label>
                  <div className="text-center p-2 border rounded bg-light" style={{ cursor: 'pointer' }} onClick={() => editFileInputRef.current.click()}>
                    <input type="file" ref={editFileInputRef} className="d-none" accept="image/*" onChange={(e) => { const f = e.target.files[0]; if(f){ setEditImagenArchivo(f); setEditVistaPrevia(URL.createObjectURL(f)); } }} />
                    {editVistaPrevia ? (
                      <img src={editVistaPrevia} alt="" style={{ maxHeight: '100px', objectFit: 'cover' }} className="rounded" />
                    ) : <p className="small m-0 text-muted">Cambiar Foto</p>}
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold small">Resumen</label>
                  <textarea className="form-control" rows="2" value={editFormData.resumen} onChange={(e) => setEditFormData({...editFormData, resumen: e.target.value})} required></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Itinerario</label>
                  <textarea className="form-control" rows="3" value={editFormData.itinerario} onChange={(e) => setEditFormData({...editFormData, itinerario: e.target.value})} required></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Actividades</label>
                  <textarea className="form-control" rows="3" value={editFormData.actividades} onChange={(e) => setEditFormData({...editFormData, actividades: e.target.value})} required></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">Incluye</label>
                  <textarea className="form-control" rows="2" value={editFormData.incluye} onChange={(e) => setEditFormData({...editFormData, incluye: e.target.value})} required></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small">No Incluye</label>
                  <textarea className="form-control" rows="2" value={editFormData.no_incluye} onChange={(e) => setEditFormData({...editFormData, no_incluye: e.target.value})} required></textarea>
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold small">Términos y condiciones</label>
                  <textarea className="form-control" rows="2" value={editFormData.terminos} onChange={(e) => setEditFormData({...editFormData, terminos: e.target.value})} required></textarea>
                </div>
                <div className="col-12 text-end modal-footer border-0 pb-0">
                  <button type="button" className="btn btn-light" onClick={() => setPromoEditando(null)}>Cancelar</button>
                  <button type="submit" className="btn btn-warning text-white fw-bold">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}