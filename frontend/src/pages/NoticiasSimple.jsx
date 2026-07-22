import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from "../services/api";











export default function NoticiasSimple() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  // Servidor base derivado de tu API_BASE_URL
  const SERVER_BASE_URL = API_BASE_URL.replace('/api', '');


  useEffect(() => {
  console.log("👉 URL EXACTA SOLICITADA:", `${API_BASE_URL}/noticias/${id}`);
  console.log("👉 VALOR DEL ID:", id);

  fetch(`${API_BASE_URL}/noticias/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener la noticia");
      return res.json();
    })
    .then(data => {
      const noticiaData = Array.isArray(data) ? data[0] : data;
      setNoticia(noticiaData);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error al obtener la noticia:", err);
      setNoticia(null);
      setLoading(false);
    });
}, [id]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/noticias/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener la noticia");
        return res.json();
      })
      .then(data => {
        // Si el backend responde un array [{...}], extraemos el primer elemento
        const noticiaData = Array.isArray(data) ? data[0] : data;
        setNoticia(noticiaData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener la noticia:", err);
        setNoticia(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 fondo-claro">
        <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando noticia...</span>
        </div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="container text-center py-5 my-5">
        <div className="p-5 bg-white rounded-4 shadow-sm d-inline-block">
          <i className="bi bi-newspaper text-warning display-1 mb-3"></i>
          <h3 className="fw-bold text-dark">Noticia no encontrada</h3>
          <p className="text-muted mb-4">La noticia que buscas no existe o fue eliminada.</p>
          <Link to="/noticias" className="btn btn-warning text-white fw-bold px-4 rounded-pill">
            Volver a Noticias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 pb-5 fondo-claro">
      <div className="container pt-4">
        
        {/* Botón de regreso minimalista */}
        <Link 
          to="/noticias" 
          className="btn btn-white bg-white text-dark fw-bold rounded-pill shadow-sm border px-3 py-2 mb-4 d-inline-flex align-items-center gap-2 text-decoration-none transition-all"
        >
          <i className="bi bi-arrow-left text-warning"></i> Volver a todas las noticias
        </Link>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <article className="bg-white rounded-4 shadow-sm p-4 p-md-5">
              
              {/* Badge de Categoría / Fecha */}
              <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                {noticia.categoria && (
                  <span className="badge bg-warning bg-opacity-10 text-warning-emphasis border border-warning-subtle px-3 py-2 rounded-pill text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>
                    {noticia.categoria}
                  </span>
                )}
                {noticia.fecha && (
                  <span className="text-muted small">
                    <i className="bi bi-calendar3 me-1"></i> {new Date(noticia.fecha).toLocaleDateString('es-PE')}
                  </span>
                )}
              </div>

              {/* Título de la noticia */}
              <h1 className="fw-extrabold text-dark display-6 mb-4">{noticia.titulo}</h1>

              {/* Imagen Principal */}
              {noticia.imagen && (
                <div className="position-relative overflow-hidden rounded-4 shadow-sm mb-4" style={{ maxHeight: '480px' }}>
                  <img 
                    src={
                      noticia.imagen.startsWith('http')
                        ? noticia.imagen
                        : `${SERVER_BASE_URL}${noticia.imagen}`
                    } 
                    alt={noticia.titulo || "Imagen de la noticia"} 
                    className="w-100 h-100 object-fit-cover" 
                    style={{ objectFit: 'cover', minHeight: '320px' }} 
                  />
                </div>
              )}

              {/* Autor si existe */}
              {noticia.autor && (
                <div className="text-muted small mb-3">
                  <i className="bi bi-person me-1"></i> Publicado por: <strong>{noticia.autor}</strong>
                </div>
              )}

              {/* Contenido / Texto completo */}
              <div 
                className="text-secondary fs-5 lh-lg" 
                style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
              >
                {noticia.contenido}
              </div>

            </article>
          </div>
        </div>

      </div>
    </div>
  );
}