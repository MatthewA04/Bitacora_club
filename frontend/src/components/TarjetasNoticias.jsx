import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TarjetasNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerUltimasNoticias();
  }, []);

  const obtenerUltimasNoticias = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/noticias');
      if (response.ok) {
        const data = await response.json();
        // Tomamos solo las últimas 3 noticias para la pantalla principal
        setNoticias(data.slice(0, 3));
      }
    } catch (error) {
      console.error("Error al obtener las últimas noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="titulo text-uppercase">
          ÚLTIMAS NOTICIAS
        </h2>
        <Link 
          to="/noticias" 
          className="btn btn-warning text-white fw-bold px-4 py-2 rounded-3 shadow-sm">
          VER MÁS NOTICIAS
        </Link>
      </div>

      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : noticias.length === 0 ? (
        <div className="text-center text-muted py-4">
          <p className="mb-0">No hay noticias publicadas por el momento.</p>
        </div>
      ) : (
        <div className="row g-4">
          {noticias.map((item) => (
            <div key={item.id} className="col-md-4">
              <div 
                className="p-4 tarjeta-paquete"
              >
                <div>
                  {/* Título de la noticia */}
                  <h4 className="titulo-tarjeta-paquete mb-3">
                    {item.titulo}
                  </h4>
                  
                  {/* Texto de resumen o extracto del contenido */}
                  <p className="text-muted small mb-4" >
                    {item.resumen || (item.contenido ? item.contenido.substring(0, 250) + '...' : '')}
                  </p>
                </div>

                {/* Botón "LEER MAS" que redirige al detalle simple */}
                <div>
                  <Link 
                    to={`/noticias/${item.id}`} 
                    className="btn btn-warning text-white fw-bold px-4 rounded-3"
                  >
                    LEER MÁS
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}