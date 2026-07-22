import React from "react";
import "./Pages.css";

export default function SobreNosotros() {
  return (
    <div className="py-5 text-center">
      {/* 1. HERO / BANNER PRINCIPAL */}
      <div className="container py-3">
        {/* 2. SECCIÓN: ¿POR QUÉ BITÁCORA CLUB? */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-uppercase titulo-n">
            ¿POR QUÉ BITÁCORA CLUB?
          </h1>
        </div>

        <div className="row align-items-center g-5 mb-5">
          {/* Imagen de la bitácora / brújula */}
          <div className="col-lg-6">
            <div className="p-1 rounded-4 ">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format&fit=crop"
                alt="Bitácora de viaje"
                className="tarjeta"
                style={{ height: "360px", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Texto explicativo con lista de puntos */}
          <div className="col-lg-6  texto">
            <p className="mb-3">
              En <strong>Bitácora Club</strong> no solo vendemos destinos,
              diseñamos experiencias a tu medida. Somos un equipo de
              profesionales apasionados y especializados en el sector turístico,
              unidos por un solo objetivo: hacer realidad tus vacaciones soñadas
              sin que tengas que preocuparte por nada. Nos convertimos en tu
              ventanilla única de viaje, resolviendo cada detalle en un solo
              lugar:
            </p>

            <ul className="list-unstyled ps-2 mb-0">
              <li className="mb-3 d-flex align-items-start">
                <span className="me-2 text-dark fs-5">•</span>
                <div>
                  <strong className="text-dark">Gestión Integral:</strong>{" "}
                  Tickets aéreos, reservas de hoteles y traslados seguros.
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <span className="me-2 text-dark fs-5">•</span>
                <div>
                  <strong className="text-dark">
                    Experiencias a la Medida:
                  </strong>{" "}
                  Actividades exclusivas, tours locales y alquiler de vehículos.
                </div>
              </li>
              <li className="d-flex align-items-start">
                <span className="me-2 text-dark fs-5">•</span>
                <div>
                  <strong className="text-dark">Asesoría Humana:</strong> A
                  diferencia de las agencias convencionales, te acompañamos con
                  una atención personalizada y de alta calidad de principio a
                  fin.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. SECCIÓN: MISIÓN Y VISIÓN */}
        <div className="row gx-5 my-4">
          <div className="col-md-6">
            <div className="h-100 p-5 rounded-4 text-center d-flex flex-column align-items-center justify-content-center tarjeta">
              <div className="mb-3">
                <i
                  className="bi bi-bullseye"
                  style={{ fontSize: "4rem", color: "#ffa826" }}
                ></i>
              </div>
              <h3 className="text-uppercase mb-3 titulo">MISIÓN</h3>
              <p className="text-secondary m-0 textos">
                Diseñar experiencias de viaje únicas, confiables y
                personalizadas que superen las expectativas de nuestros
                clientes. Logramos esto a través de la excelencia de un equipo
                experto y apasionado, garantizando tarifas accesibles y un
                servicio de alta calidad en cada aventura.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="h-100 p-5 rounded-4 text-center d-flex flex-column align-items-center justify-content-center tarjeta">
              <div className="mb-3">
                <i
                  className="bi bi-binoculars-fill"
                  style={{ fontSize: "4rem", color: "#ffa826" }}
                ></i>
              </div>
              <h3 className="text-uppercase mb-3 titulo">VISIÓN</h3>
              <p className="text-secondary m-0 textos">
                Convertirnos en la agencia de turismo referente de la región,
                reconocidos por la confianza, seguridad e innovación de nuestros
                servicios. Nos proyectamos a consolidar un modelo de turismo
                sostenible que promueva conexiones auténticas y la máxima
                satisfacción de cada viajero.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
