import React, { useState, useEffect } from "react";
import "../components/Components.css";
import { Link } from "react-router-dom";
import imagenBanner from "../assets/banner1.jpg";
import "./Pages.css";

export default function ArchivoPromociones() {
  const [promociones, setPromociones] = useState([]);
  const [destinoFiltro, setDestinoFiltro] = useState("Todos");
  const [orden, setOrden] = useState("defecto"); // defecto, bajo, alto, recomendados
  const [paginaActual, setPaginaActual] = useState(1);
  const tarjetasPorPagina = 9;

  useEffect(() => {
    fetch("http://localhost:5000/api/promociones")
      .then((res) => res.json())
      .then((data) => setPromociones(data))
      .catch((err) => console.error(err));
  }, []);

  // Extraer destinos únicos dinámicamente para el selector de filtros
  const destinosUnicos = [
    "Todos",
    ...new Set(
      promociones.map((p) => p.destino?.toUpperCase()).filter(Boolean),
    ),
  ];

  // Aplicar lógica de Filtrado y Ordenamiento
  let resultado = [...promociones];

 if (destinoFiltro !== "Todos") {
  resultado = resultado.filter(
    (p) => p.destino?.toUpperCase() === destinoFiltro.toUpperCase()
  );
}

  if (orden === "bajo")
    resultado.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
  if (orden === "alto")
    resultado.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
  if (orden === "recomendados")
    resultado = resultado.filter((p) => p.es_recomendado === 1);

  // Lógica de Paginación Matemática
  const indiceUltimo = paginaActual * tarjetasPorPagina;
  const indicePrimero = indiceUltimo - tarjetasPorPagina;
  const promocionesPagina = resultado.slice(indicePrimero, indiceUltimo);
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
          PROMOCIONES PARA TI
        </h1>
      </div>

      {/* Cuerpo de la página */}
      <div className=" fondo-claro min-vh-100 py-5">
        <div className="container">
          {/* Panel de Controles Mejorado */}
          <div className="card border-0 shadow-sm p-4 mb-4 bg-white rounded-3">
            <div className="row align-items-center g-3">
              {/* Filtro por Destinos mediante Chips/Pills */}
              <div className="col-lg-8">
                <label className="form-label fw-bold text-muted small d-block mb-2 text-uppercase">
                  <i className="bi bi-geo-alt-fill text-warning me-1"></i>{" "}
                  Filtrar por Destino
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {destinosUnicos.map((dest, i) => {
                    const activo = destinoFiltro === dest;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setDestinoFiltro(dest);
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
                          transition: "all 0.2s ease-in-out",
                          boxShadow: activo
                            ? "0 4px 10px rgba(255, 193, 7, 0.35)"
                            : "none",
                        }}
                      >
                        {dest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dropdown de Ordenamiento Limpio */}
              <div className="col-lg-4">
                <label className="form-label fw-bold text-muted small d-block mb-2 text-uppercase">
                  Ordenar Por
                </label>
                <select
                  className="form-select border-2 rounded-3 fw-semibold text-secondary"
                  value={orden}
                  onChange={(e) => {
                    setOrden(e.target.value);
                    setPaginaActual(1);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <option value="defecto">Todos los paquetes</option>
                  <option value="bajo">Precio: De menor a mayor</option>
                  <option value="alto">Precio: De mayor a menor</option>
                  <option value="recomendados">⭐ Más Recomendados</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grilla de Promociones con Clases Personalizadas */}
          <div className="row g-4">
            {promocionesPagina.map((promo) => (
              <div className="col-md-6 col-lg-4" key={promo.id}>
                <div className="tarjeta-paquete p-3 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="position-relative overflow-hidden rounded-3 mb-2">
                      <img
                        src={
                          promo.imagen
                            ? `http://localhost:5000${promo.imagen}`
                            : "https://via.placeholder.com/350x220?text=Bitacora+Club"
                        }
                        className="imagen-tarjeta-paquete w-100"
                        alt={promo.titulo}
                      />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between px-1 pt-2 pb-0">
                      <div>
                        <span className="text-warning text-uppercase fw-bold small d-block mb-1">
                          <i className="bi bi-geo-alt-fill me-1"></i>
                          {promo.destino || "Nacional"}
                        </span>

                        <h5 className="titulo-tarjeta-paquete lh-sm mb-3">
                          {promo.titulo}
                        </h5>

                        <p className="text-muted small mb-4">
                          {promo.resumen && promo.resumen.length > 105
                            ? `${promo.resumen.substring(0, 250)}...`
                            : promo.resumen}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
                    <span className="fw-bold text-dark fs-5">
                      S/ {parseFloat(promo.precio).toFixed(2)}
                    </span>
                    <Link
                      to={`/paquete/${promo.id}`}
                      className="btn btn-warning text-white fw-bold px-4 rounded-3"
                    >
                      VER PROMOCIÓN
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
