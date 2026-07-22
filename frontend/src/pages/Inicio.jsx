import React from "react";
import { Link } from "react-router-dom";
import BannerCarousel from "../components/BannerCarousel";
import "./Pages.css";
import FeaturedPackages from "../components/TarjetasPromociones";
import LatestNews from "../components/TarjetasNoticias";
import QuoteForm from "../components/QuoteForm";

function Inicio() {
  return (
    <div className="inicio-page">
      {/* 1. Banner Principal */}
      <BannerCarousel />

      {/* SECCIÓN: SERVICIOS TURÍSTICOS */}
      <section className="py-5 text-center">
        <div className="container">
          <span className="text-uppercase fw-bold sub-titulo-s">
            Servicios Turísticos
          </span>
          <h2 className="fw-bold my-3 text-uppercase titulo-n">
            Encuentra Hoteles, Vuelos, Traslados y <br /> Actividades en
            cualquier parte del Perú
          </h2>
          <p className="text-uppercase fw-bold mb-5 sub-titulo-s-n">
            Forma parte de Bitácora Club
          </p>

          {/* Iconos de Servicios */}
          <div className="row justify-content-center g-4">
            {/* Viajes */}
            <div className="col-6 col-sm-3 col-md-2 text-center">
              <div className="mx-auto d-flex align-items-center justify-content-center mb-3 fondo-servicios">
                <i
                  className="bi bi-airplane-fill fs-2"
                  style={{ color: "#fca922", transform: "rotate(45deg)" }}
                ></i>
              </div>
              <span className="text-uppercase fw-bold text-dark texto-s texto-servicio">
                Viajes
              </span>
            </div>

            {/* Hoteles */}
            <div className="col-6 col-sm-3 col-md-2 text-center">
              <div className="mx-auto d-flex align-items-center justify-content-center mb-3 fondo-servicios">
                <i
                  className="bi bi-building fs-2"
                  style={{ color: "#fca922" }}
                ></i>
              </div>
              <span className="text-uppercase fw-bold text-dark texto-servicio">
                Hoteles
              </span>
            </div>

            {/* Traslados */}
            <div className="col-6 col-sm-3 col-md-2 text-center">
              <div className="mx-auto d-flex align-items-center justify-content-center mb-3 fondo-servicios">
                <i
                  className="bi bi-bus-front fs-2"
                  style={{ color: "#fca922" }}
                ></i>
              </div>
              <span className="text-uppercase fw-bold text-dark texto-servicio">
                Traslados
              </span>
            </div>

            {/* Tours */}
            <div className="col-6 col-sm-3 col-md-2 text-center">
              <div className="mx-auto d-flex align-items-center justify-content-center mb-3 fondo-servicios">
                <i className="bi bi-map fs-2" style={{ color: "#fca922" }}></i>
              </div>
              <span className="text-uppercase fw-bold text-dark texto-servicio">
                Tours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Línea Divisoria */}
      <div className="divisor"></div>

      {/* SECCIÓN: BITACORA CLUB OFRECE */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center text-uppercase mb-5 titulo">
            Bitacora Club Ofrece
          </h2>

          <div className="row g-4 justify-content-center">
            {/* Tarjeta 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="p-4 bg-white text-center d-flex flex-column justify-content-center h-100 tarjeta-precio">
                <h4 className="fw-bold text-uppercase mb-3 titulo-tarjeta-precio">
                  Precios Accesibles
                </h4>
                <p className="text-dark mb-0 textos">
                  Nuestras alianzas permiten ofrecer alternativas con mejor
                  relación costo-beneficio para cada viajero.
                </p>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="p-4 bg-white text-center d-flex flex-column justify-content-center h-100 tarjeta-precio">
                <h4 className="fw-bold text-uppercase mb-3 titulo-tarjeta-precio">
                  Asesoría Personalizada
                </h4>
                <p className="text-dark mb-0 textos">
                  El equipo identifica gustos, presupuesto y necesidades para
                  recomendar experiencias adecuadas.
                </p>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="p-4 bg-white text-center d-flex flex-column justify-content-center h-100 tarjeta-precio">
                <h4 className="fw-bold text-uppercase mb-3 titulo-tarjeta-precio">
                  Experiencia en Turismo
                </h4>
                <p className="text-dark mb-0 textos">
                  Bitácora Club acompaña la planificación de viajes con enfoque
                  en confianza, seguridad y organización.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Línea Divisoria Mostaza Inferior */}
      <div className="divisor"></div>

      <FeaturedPackages />

      {/* BANNER ESTÁTICO DE INTERMEDIO "COTIZA TU PRÓXIMA AVENTURA" */}
      <section className="text-white d-flex align-items-center position-relative overflow-hidden fondo-cotizar">
        <div className="container py-4" style={{ zIndex: 2 }}>
          <div className="row align-items-center justify-content-between g-4">
            <div className="col-lg-6 text-center text-md-start">
              <h2 className="display-5 fw-extrabold text-uppercase mb-3 fw-bold">
                Cotiza tu próxima <br className="d-none d-md-block" /> aventura
              </h2>
              <p className="lead mb-0  textos">
                Cuéntanos a dónde quieres ir y nuestro equipo se encargará de
                armar el paquete informativo perfecto para tus próximas
                vacaciones.
              </p>
            </div>

            <div className="col-lg-4 text-center text-md-end">
              <Link
                to="/contacto"
                className="text-white btn btn-lg px-5 text-uppercase shadow boton-cotizar"
                style={{ textDecoration: "none" }}
              >
                Cotizar Aventura
              </Link>
            </div>
          </div>
        </div>

        {/* Onda inferior */}
        <div
          className="position-absolute bottom-0 start-0 w-100"
          style={{ lineHeight: 0, zIndex: 1 }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "40px" }}
          >
            <path
              d="M0,40 C300,10 600,110 900,20 C1050,-10 1150,15 1200,30 L1200,120 L0,120 Z"
              fill="#fca922"
            ></path>
          </svg>
        </div>
      </section>

      {/* COMPONENTE: ÚLTIMAS NOTICIAS */}
      <LatestNews />
      {/* COMPONENTE: FORMULARIO DE COTIZACIÓN */}

      <section id="contacto" className="py-5">
        <div className="container py-4" style={{ maxWidth: "900px" }}>
          {/* Encabezado */}
          <div className="text-center mb-5">
            <h2 className="fw-extrabold text-uppercase mb-2 titulo">
              ¡Cotiza tu próxima aventura!
            </h2>
            <p
              className="text-muted mx-auto textos"
              style={{ maxWidth: "600px" }}
            >
              Cuéntanos a dónde quieres ir y nuestro equipo se encargará de
              armar el paquete informativo perfecto para tus próximas
              vacaciones.
            </p>
          </div>
                <QuoteForm />
        </div>
      </section>

    </div>
  );
}

export default Inicio;
