import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function NoticiasSimple() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerDetalleNoticia = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/noticias/${id}`);
        if (response.ok) {
          const data = await response.json();
          setNoticia(data);
        } else {
          setNoticia(null);
        }
      } catch (error) {
        console.error("Error al obtener la noticia:", error);
      } finally {
        setLoading(false);
      }
    };

    

    obtenerDetalleNoticia();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5 py-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando noticia...</span>
        </div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="container text-center py-5">
        <h3 className="fw-bold">Noticia no encontrada</h3>
        <p className="text-muted">La noticia que buscas no existe o fue eliminada.</p>
        <Link to="/noticias" className="btn text-white fw-bold" style={{ backgroundColor: '#ffa826' }}>
          Volver a Noticias
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Botón para regresar al archivo de noticias */}
          <Link to="/noticias" className="text-decoration-none text-muted mb-4 d-inline-block fw-bold">
            <i className="bi bi-arrow-left me-1"></i> Volver a todas las noticias
          </Link>
          
          <h1 className="fw-bold text-dark mb-3 display-5">{noticia.titulo}</h1>
          
          <div className="d-flex align-items-center gap-3 text-muted mb-4 small">
            {noticia.fecha && (
              <span><i className="bi bi-calendar3 me-1"></i> {new Date(noticia.fecha).toLocaleDateString('es-PE')}</span>
            )}
            {noticia.autor && (
              <span><i className="bi bi-person me-1"></i> Por: {noticia.autor}</span>
            )}
          </div>

          {/* Imagen si la noticia incluye una */}
          {noticia.imagen && (
            <img
              src={`http://localhost:5000${noticia.imagen}`}
              alt={noticia.titulo}
              className="img-fluid rounded-3 mb-4 w-100"
              style={{ maxHeight: '420px', objectFit: 'cover' }}
            />
          )}

          {/* Contenido completo de la noticia */}
          <div className="lh-lg text-dark fs-5 mt-4" style={{ whiteSpace: 'pre-line' }}>
            {noticia.contenido}
          </div>
        </div>
      </div>
    </div>
  );
}