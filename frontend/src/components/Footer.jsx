import React from 'react';
import "./Components.css";

function Footer() {
  return (
    <footer className="footer"  > 
      <div className="w-100 overflow-hidden" style={{background:"unset",}} >
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          style={{ width: '100%', height: '80px' }}
        >
          <path 
            d="M0,40 C300,10 600,110 900,20 C1050,-10 1150,15 1200,30 L1200,120 L0,120 Z" 
            fill="#fca922" 
          ></path>
        </svg>
      </div>

      {/* 2. Bloque de Datos de Contacto con fondo crema suave */}
      <div className="py-5" >
        <div className="container">
          <div className="row align-items-center justify-content-between g-4 text-center text-md-start">
            
            {/* Dirección */}
            <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-start gap-3 animacion-scale">
              <i className="bi bi-geo-alt text-warning fs-3 "></i>
              <a 
                href="https://maps.google.com/?q=Calle Germán Schreiber Nro 276 San Isidro Lima" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-decoration-none text-dark small fw-medium"
                style={{ lineHeight: '1.4' }}
              >
                Calle Germán Schreiber Nro. 276, Urb.<br />Santa Ana, San Isidro, Lima.
              </a>
            </div>

            {/* WhatsApp */}
            <div className="col-md-3 d-flex align-items-center justify-content-center gap-3 animacion-scale">
              <i className="bi bi-whatsapp text-warning fs-3"></i>
              <a 
                href="https://wa.me/51999999999" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-decoration-none text-dark fw-medium"
              >
                +51 960 260 194
              </a>
            </div>

            {/* Email */}
            <div className="col-md-3 d-flex align-items-center justify-content-center gap-3 animacion-scale">
              <i className="bi bi-envelope text-warning fs-3"></i>
              <a 
                href="mailto:info@info.com" 
                className="text-decoration-none text-dark fw-medium"
              >
                info@info.com
              </a>
            </div>

            {/* Redes Sociales */}
            <div className="col-md-2 d-flex align-items-center justify-content-center justify-content-md-end gap-3">
              <a 
                href="#" 
                className="text-warning fs-2 animacion-scale"

              >
                <i className="bi bi-facebook animacion-scale"></i>
              </a>
              <a 
                href="#" 
                className="text-warning fs-2 animacion-scale"
              >
                <i className="bi bi-instagram  "></i>
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;