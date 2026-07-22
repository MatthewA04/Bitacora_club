import React, { useState, useEffect, useRef } from 'react';

export default function AdminNoticias() {
  const [subVista, setSubVista] = useState('ver');
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lista de categorías predefinidas
  const opcionesCategorias = [
    "Destinos y Guías",
    "Tips y Consejos",
    "Promociones",
    "Noticias del Sector",
    "Gastronomía y Cultura"
  ];

  // Formulario de creación
  const [formData, setFormData] = useState({ 
    titulo: '', 
    categoria: 'Destinos y Guías', 
    contenido: '' 
  });
  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Estados exclusivos para la EDICIÓN
  const [noticiaEditando, setNoticiaEditando] = useState(null);
  const [editFormData, setEditFormData] = useState({ 
    titulo: '', 
    categoria: 'Destinos y Guías', 
    contenido: '' 
  });
  const [editImagenArchivo, setEditImagenArchivo] = useState(null);
  const [editVistaPrevia, setEditVistaPrevia] = useState(null);
  const editFileInputRef = useRef(null);

  useEffect(() => {
    obtenerNoticias();
  }, []);

  const obtenerNoticias = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/noticias');
      const data = await response.json();
      setNoticias(data);
    } catch (error) {
      console.error("Error al traer noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  // Abrir ventana de edición y cargar datos actuales
  const iniciarEdicion = (noticia) => {
    setNoticiaEditando(noticia);
    setEditFormData({ 
      titulo: noticia.titulo, 
      categoria: noticia.categoria || 'Destinos y Guías', 
      contenido: noticia.contenido 
    });
    setEditVistaPrevia(noticia.imagen ? `http://localhost:5000${noticia.imagen}` : null);
    setEditImagenArchivo(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append('titulo', editFormData.titulo);
    dataToSend.append('categoria', editFormData.categoria);
    dataToSend.append('contenido', editFormData.contenido);
    if (editImagenArchivo) {
      dataToSend.append('imagen', editImagenArchivo);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/noticias/${noticiaEditando.id}`, {
        method: 'PUT',
        body: dataToSend
      });
      if (response.ok) {
        alert("¡Noticia actualizada correctamente!");
        setNoticiaEditando(null);
        obtenerNoticias();
      }
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  const eliminarNoticia = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta noticia?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/noticias/${id}`, { method: 'DELETE' });
        if (response.ok) obtenerNoticias();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h3 className="m-0 fw-bold text-dark">Gestión de Noticias</h3>
        <div className="btn-group">
          <button className={`btn px-4 ${subVista === 'ver' ? 'btn-warning text-white' : 'btn-outline-secondary'}`} onClick={() => setSubVista('ver')}>Ver Noticias</button>
          <button className={`btn px-4 ${subVista === 'crear' ? 'btn-warning text-white' : 'btn-outline-secondary'}`} onClick={() => setSubVista('crear')}>Agregar Noticia</button>
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
                <th>Categoría</th>
                <th>Contenido</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {noticias.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">No hay noticias publicadas todavía.</td>
                </tr>
              ) : (
                noticias.map((noticia) => (
                  <tr key={noticia.id}>
                    <td>
                      <img src={noticia.imagen ? `http://localhost:5000${noticia.imagen}` : 'https://via.placeholder.com/60'} alt="" className="rounded" style={{ width: '60px', height: '40px', objectFit: 'cover' }} />
                    </td>
                    <td className="fw-bold text-dark">{noticia.titulo}</td>
                    <td>
                      <span className="badge bg-light text-dark border fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>
                        {noticia.categoria || "Sin categoría"}
                      </span>
                    </td>
                    <td className="text-muted text-truncate" style={{ maxWidth: '250px' }}>{noticia.contenido?.substring(0, 60)}...</td>
                    <td className="text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        <button onClick={() => iniciarEdicion(noticia)} className="btn btn-sm btn-outline-primary px-3">Editar</button>
                        <button onClick={() => eliminarNoticia(noticia.id)} className="btn btn-sm btn-outline-danger px-3">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* FORMULARIO DE CREACIÓN CON CATEGORÍA Y DISEÑO INTERACTIVO */
        <form onSubmit={async (e) => {
          e.preventDefault();
          if (!imagenArchivo) return alert("Por favor, selecciona o arrastra una imagen para la noticia.");
          const d = new FormData(); 
          d.append('titulo', formData.titulo); 
          d.append('categoria', formData.categoria);
          d.append('contenido', formData.contenido); 
          d.append('imagen', imagenArchivo);
          
          try {
            const r = await fetch('http://localhost:5000/api/noticias', { method: 'POST', body: d });
            if (r.ok) { 
              alert("¡Noticia publicada con éxito!"); 
              setFormData({ titulo: '', categoria: 'Destinos y Guías', contenido: '' }); 
              setImagenArchivo(null); 
              setVistaPrevia(null); 
              setSubVista('ver'); 
              obtenerNoticias(); 
            }
          } catch (error) {
            console.error("Error al publicar noticia:", error);
          }
        }} className="row g-4">
          
          <div className="col-md-8">
            <label className="form-label fw-bold text-dark fs-5">Título de la Noticia</label>
            <input 
              type="text" 
              className="form-control form-control-lg border-2" 
              placeholder="Escribe un titular llamativo..."
              value={formData.titulo} 
              onChange={(e) => setFormData({...formData, titulo: e.target.value})} 
              required 
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold text-dark fs-5">Categoría</label>
            <select
              className="form-select form-select-lg border-2 fw-semibold"
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              required
            >
              {opcionesCategorias.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <label className="form-label fw-bold text-dark fs-5">Imagen de Portada</label>
            <div 
              className={`text-center p-5 rounded-4 border-2 ${isDragging ? 'border-warning bg-light text-warning shadow-sm' : 'border-secondary text-muted bg-white'}`}
              style={{ 
                borderStyle: 'dashed', 
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                backgroundColor: isDragging ? '#fffdf5' : '#fafafa'
              }} 
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                  setImagenArchivo(file);
                  setVistaPrevia(URL.createObjectURL(file));
                }
              }}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="d-none" 
                accept="image/*" 
                onChange={(e) => { 
                  const f = e.target.files[0]; 
                  if(f){ setImagenArchivo(f); setVistaPrevia(URL.createObjectURL(f)); } 
                }} 
              />
              
              {vistaPrevia ? (
                <div className="position-relative d-inline-block">
                  <img src={vistaPrevia} alt="Previsualización" className="rounded-3 shadow-sm img-fluid" style={{ maxHeight: '220px', objectFit: 'cover' }} />
                  <span className="badge bg-dark position-absolute bottom-0 start-50 translate-middle-x mb-2 shadow">Cambiar Imagen</span>
                </div>
              ) : (
                <div className="py-3">
                  <i className="bi bi-cloud-arrow-up text-warning display-4 mb-2 d-block"></i>
                  <p className="fw-bold m-0 fs-5 text-dark">Arrastra tu imagen aquí</p>
                  <p className="small text-muted m-0">o haz clic para explorar tus archivos locales</p>
                  <span className="badge bg-light text-secondary border mt-3 px-3 py-2 rounded-pill">Soporta: JPG, PNG, WEBP</span>
                </div>
              )}
            </div>
          </div>

          <div className="col-12">
            <label className="form-label fw-bold text-dark fs-5">Contenido del Artículo</label>
            <textarea 
              className="form-control border-2" 
              rows="6" 
              placeholder="Escribe el cuerpo completo de la noticia o novedad aquí..."
              value={formData.contenido} 
              onChange={(e) => setFormData({...formData, contenido: e.target.value})} 
              required
            ></textarea>
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn btn-warning text-white btn-lg fw-bold px-5 shadow-sm rounded-3">
              <i className="bi bi-send-check me-2"></i>Publicar Noticia
            </button>
          </div>
        </form>
      )}

      {/* MODAL INTERACTIVO DE EDICIÓN */}
      {noticiaEditando && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow p-2">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Editar Noticia</h5>
                <button type="button" className="btn-close" onClick={() => setNoticiaEditando(null)}></button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Título</label>
                    <input type="text" className="form-control" value={editFormData.titulo} onChange={(e) => setEditFormData({...editFormData, titulo: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Categoría</label>
                    <select
                      className="form-select fw-semibold"
                      value={editFormData.categoria}
                      onChange={(e) => setEditFormData({...editFormData, categoria: e.target.value})}
                      required
                    >
                      {opcionesCategorias.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Imagen de la Publicación</label>
                    <div className="text-center p-3 border rounded bg-light" style={{ cursor: 'pointer' }} onClick={() => editFileInputRef.current.click()}>
                      <input type="file" ref={editFileInputRef} className="d-none" accept="image/*" onChange={(e) => { const f = e.target.files[0]; if(f){ setEditImagenArchivo(f); setEditVistaPrevia(URL.createObjectURL(f)); } }} />
                      {editVistaPrevia ? (
                        <img src={editVistaPrevia} alt="Vista previa" style={{ maxHeight: '120px', objectFit: 'cover' }} className="rounded" />
                      ) : <p className="small m-0 text-muted">Seleccionar nueva foto</p>}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Contenido</label>
                    <textarea className="form-control" rows="4" value={editFormData.contenido} onChange={(e) => setEditFormData({...editFormData, contenido: e.target.value})} required></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-light" onClick={() => setNoticiaEditando(null)}>Cancelar</button>
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