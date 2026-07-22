import React from 'react';
import logo from '../assets/logo.png';
import "./Components.css";
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Función helper para determinar si un enlace debe estar activo
  const isActive = (path) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top p-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand logo-header animacion-scale" to="/">
          <img src={logo} alt="Logo de bitacora Club" />
        </Link>
        
        {/* Botón Toggler para móvil */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces del Menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto fw-semibold">
            <li className="nav-item">
              <Link 
                className={`nav-link animacion-scale ${isActive('/') ? 'active text-warning fw-bold ' : 'text-dark '}`} 
                to="/"
              >
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link 
                className={`nav-link animacion-scale ${isActive('/sobre-nosotros') ? 'active text-warning fw-bold ' : 'text-dark'}`} 
                to="/sobre-nosotros"
              >
                Sobre Nosotros
              </Link>
            </li>

            <li className="nav-item">
              <Link 
                className={`nav-link animacion-scale ${isActive('/promociones') ? 'active text-warning fw-bold ' : 'text-dark'}`} 
                to="/promociones"
              >
                Promociones
              </Link>
            </li>

            <li className="nav-item">
              <Link 
                className={`nav-link animacion-scale ${isActive('/noticias') ? 'active text-warning fw-bold ' : 'text-dark'}`} 
                to="/noticias"
              >
                Noticias
              </Link>
            </li>

            <li className="nav-item">
              <Link 
                className={`nav-link animacion-scale ${isActive('/contacto') ? 'active text-warning fw-bold ' : 'text-dark'}`} 
                to="/contacto"
              >
                Contáctanos
              </Link>
            </li>
          </ul>
          
          {/* Botón de Cotización */}
          <Link to="/contacto" className="btn animacion-scale btn-warning text-white ms-lg-3 px-4 rounded-pill fw-bold ">
            Cotizar Viaje
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;