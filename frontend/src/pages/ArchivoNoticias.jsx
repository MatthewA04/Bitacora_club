import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imagenBanner from "../assets/banner2.jpg";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados de control para Filtros y Paginación
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [paginaActual, setPaginaActual] = useState(1);
  const tarjetasPorPagina = 9;

  useEffect(() => {
    obtenerTodasLasNoticias();
  }, []);

  const obtenerTodasLasNoticias = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/noticias');
      if (response.ok) {
        const data = await response.json();
        setNoticias(data);
      }
    } catch (error) {
      console.error("Error al cargar noticias:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener lista única de categorías de forma dinámica
  const categoriasUnicas = [
    "Todas",
    ...new Set(
      noticias
        .map((n) => n.categoria?.trim())
        .filter(Boolean)
    ),
  ];

  // Lógica de Filtrado por Buscador y Categoría
  let resultado = [...noticias];

  if (categoriaFiltro !== "Todas") {
    resultado = resultado.filter(
      (n) => n.categoria?.toUpperCase() === categoriaFiltro.toUpperCase()
    );
  }

  if (busqueda.trim() !== "") {
    resultado = resultado.filter(
      (n) =>
        n.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        n.resumen?.toLowerCase().includes(busqueda.toLowerCase()) ||
        n.contenido?.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  // Lógica de Paginación
  const indiceUltimo = paginaActual * tarjetasPorPagina;
  const indicePrimero = indiceUltimo - tarjetasPorPagina;
  const noticiasPagina = resultado.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(resultado.length / tarjetasPorPagina);

  return (
    <div>
      {/* Banner Principal */}
      <div
        className="position-relative d-flex align-items-center justify-content-center text-white text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imagenBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
        }}
      >
        <h1
          className="fw-bold display-5 text-uppercase m-0"
          style={{ letterSpacing: "2px" }}
        >
          NOTICIAS PARA TI
        </h1>
      </div>

      {/* Cuerpo de la página con fondo claro */}
      <div className="fondo-claro min-vh-100 py-5">
        <div className="container">

          {/* Panel de Controles (Buscador + Categorías) */}
          <div className="card border-0 shadow-sm p-4 mb-4 bg-white rounded-3">
            <div className="row g-3 align-items-center">
              
              {/* Buscador */}
              <div className="col-lg-4">
                <label className="form-label fw-bold text-muted small text-uppercase">
                  Buscar Novedades
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-0 text-secondary fw-semibold"
                    placeholder="Ej. Machu Picchu, Vuelos..."
                    value={busqueda}
                    onChange={(e) => {
                      setBusqueda(e.target.value);
                      setPaginaActual(1);
                    }}
                  />
                </div>
              </div>

              {/* Filtro de Categorías mediante Chips */}
              <div className="col-lg-8">
                <label className="form-label fw-bold text-muted small text-uppercase d-block">
                  Filtrar por Categoría
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {categoriasUnicas.map((cat, i) => {
                    const activo = categoriaFiltro === cat;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setCategoriaFiltro(cat);
                          setPaginaActual(1);
                        }}
                        className={`btn btn-sm rounded-pill px-3 py-2 fw-bold text-uppercase transition-all ${
                          activo
                            ? "btn-warning text-white shadow-sm"
                            : "btn-light text-dark border-0"
                        }`}
                        style={{
                          fontSize: "0.8rem",
                          letterSpacing: "0.5px",
                          boxShadow: activo ? "0 4px 10px rgba(255, 193, 7, 0.35)" : "none"
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Estado de Carga */}
          {loading ? (
            <div className="text-center my-5 py-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : resultado.length === 0 ? (
            <div className="text-center text-muted py-5 my-5 bg-white rounded-3 shadow-sm p-4">
              <p className="m-0 fs-5">No se encontraron noticias que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            /* Grilla de Noticias con tus clases existentes */
            <div className="row g-4">
              {noticiasPagina.map((item) => (
                <div className="col-md-6 col-lg-4" key={item.id}>
                  <div className="tarjeta-paquete p-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                      {/* Imagen de la noticia */}
                      <div className="position-relative overflow-hidden rounded-3 mb-2">
                        <img
                          src={
                            item.imagen
                              ? `http://localhost:5000${item.imagen}`
                              : "https://via.placeholder.com/350x220?text=Bitacora+Club"
                          }
                          className="imagen-tarjeta-paquete w-100"
                          alt={item.titulo}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        {item.categoria && (
                          <span 
                            className="position-absolute top-0 start-0 m-2 badge bg-white text-dark fw-bold shadow-sm rounded-pill px-3 py-1 text-uppercase"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {item.categoria}
                          </span>
                        )}
                      </div>

                      {/* Cuerpo de la tarjeta */}
                      <div className="card-body d-flex flex-column justify-content-between px-1 pt-2 pb-0">
                        <div>
                          <h5 className="titulo-tarjeta-paquete lh-sm mb-3">
                            {item.titulo}
                          </h5>

                          <p className="text-muted small mb-4">
                            {item.resumen || (item.contenido ? `${item.contenido.substring(0, 120)}...` : '')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Botón de acción al pie de la tarjeta */}
                    <div className="pt-2 border-top mt-auto text-end">
                      <Link
                        to={`/noticias/${item.id}`}
                        className="btn btn-warning text-white fw-bold px-4 rounded-3 w-100"
                      >
                        LEER MÁS
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
              <button
                className="btn btn-outline-warning fw-bold px-4"
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual((p) => p - 1)}
              >
                Anterior
              </button>
              <span className="fw-bold text-dark">
                Página {paginaActual} de {totalPaginas}
              </span>
              <button
                className="btn btn-outline-warning fw-bold px-4"
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual((p) => p + 1)}
              >
                Siguiente
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}