import React from 'react';

// Simulamos los datos que vendrán de la base de datos (MySQL -> Node.js -> React)
const mockBanners = [
  {
    id: 1,
    lugar: "CUSCO Y SIERRA",
    titulo: "CONECTA CON EL IMPERIO DEL SOL",
    subtitulo: "Encuentra hoteles, pueblos, traslados y actividades en cualquier parte del Perú.",
    link_whatsapp: "https://wa.me/51999999999?text=Hola,%20quiero%20cotizar%20Cusco",
    imagen: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 2,
    lugar: "MÁNCORA Y COSTA",
    titulo: "RELAJACIÓN BAJO EL SOL DEL NORTE",
    subtitulo: "Disfruta de las mejores playas, hoteles con vista al mar y atardeceres mágicos.",
    link_whatsapp: "https://wa.me/51999999999?text=Hola,%20quiero%20cotizar%20Mancora",
    imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
  }
];

function BannerCarousel() {
  return (
    <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
      {/* Indicadores / Botoncitos inferiores */}
      <div className="carousel-indicators">
        {mockBanners.map((banner, index) => (
          <button 
            key={banner.id}
            type="button" 
            data-bs-target="#heroCarousel" 
            data-bs-slide-to={index} 
            className={index === 0 ? "active" : ""} 
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Contenido del Carrusel */}
      <div className="carousel-inner">
        {mockBanners.map((banner, index) => (
          <div 
            key={banner.id} 
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{
              background: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("${banner.imagen}") no-repeat center center/cover`,
              minHeight: '75vh',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div className="container text-center text-md-start my-auto">
              <div className="row">
                <div className="col-lg-6">
                  {/* Lugar */}
                  <span className="badge bg-warning text-white p-2 px-3 mb-3 fw-bold rounded-pill">
                    {banner.lugar}
                  </span>
                  {/* Titulo */}
                  <h1 className="display-4 fw-extrabold text-uppercase mb-3 text-white">
                    {banner.titulo}
                  </h1>
                  {/* Subtitulo */}
                  <p className="lead mb-4 text-white-50">
                    {banner.subtitulo}
                  </p>
                  {/* Botón dinámico a Whatsapp */}
                  <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                    <a 
                      href={banner.link_whatsapp} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-warning text-white btn-lg px-4 fw-bold"
                    >
                      <i className="bi bi-whatsapp me-2"></i> Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles Izquierda / Derecha */}
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default BannerCarousel;