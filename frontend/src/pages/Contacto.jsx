import React, { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    destino: '',
    servicio: '',
    fechaViaje: '',
    personas: 1
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    try {
      const response = await fetch('http://localhost:5000/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje({ tipo: 'success', texto: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' });
        setFormData({
          nombre: '',
          correo: '',
          telefono: '',
          destino: '',
          servicio: '',
          fechaViaje: '',
          personas: 1
        });
      } else {
        setMensaje({ tipo: 'danger', texto: data.error || 'Ocurrió un error al enviar el mensaje.' });
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setMensaje({ tipo: 'danger', texto: 'No se pudo conectar con el servidor. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pb-5">
      {/* BANNER PRINCIPAL */}
      <div 
        className="position-relative d-flex align-items-center justify-content-center text-white text-center mb-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '240px'
        }}
      >
        <h1 className="fw-bold display-5 text-uppercase m-0" style={{ letterSpacing: '2px' }}>
          CONTÁCTANOS
        </h1>
      </div>

      <div className="container py-3">
        <div className="row g-5">
          
          {/* COLUMNA IZQUIERDA: INFORMACIÓN DE CONTACTO Y REDES SOCIALES */}
          <div className="col-lg-5">
            <h2 className="fw-bold text-dark mb-3">Ponte en contacto con nosotros</h2>
            <p className="text-secondary mb-4" style={{ lineHeight: '1.6' }}>
              ¿Tienes alguna duda sobre tu próximo viaje o deseas una cotización personalizada? Escríbenos y nuestro equipo te asesorará de inmediato.
            </p>

            <div className="d-flex flex-column gap-4 mb-5">
              {/* Teléfono / WhatsApp */}
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{ width: '50px', height: '50px', backgroundColor: '#ffa826', fontSize: '1.4rem' }}
                >
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div>
                  <h6 className="fw-bold text-dark m-0">Teléfono / WhatsApp</h6>
                  <span className="text-secondary">+51 987 654 321</span>
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{ width: '50px', height: '50px', backgroundColor: '#ffa826', fontSize: '1.4rem' }}
                >
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div>
                  <h6 className="fw-bold text-dark m-0">Correo Electrónico</h6>
                  <span className="text-secondary">contacto@bitacoraclub.pe</span>
                </div>
              </div>

              {/* Dirección */}
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{ width: '50px', height: '50px', backgroundColor: '#ffa826', fontSize: '1.4rem' }}
                >
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                  <h6 className="fw-bold text-dark m-0">Oficina Principal</h6>
                  <span className="text-secondary">Av. Principal 123, Lima - Perú</span>
                </div>
              </div>
            </div>

            {/* SECCIÓN DE REDES SOCIALES */}
            <h5 className="fw-bold text-dark mb-3">Síguenos en nuestras redes</h5>
            <div className="d-flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center text-dark"
                style={{ width: '45px', height: '45px', borderColor: '#ffa826' }}
              >
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center text-dark"
                style={{ width: '45px', height: '45px', borderColor: '#ffa826' }}
              >
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a 
                href="https://wa.me/51987654321" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center text-dark"
                style={{ width: '45px', height: '45px', borderColor: '#ffa826' }}
              >
                <i className="bi bi-whatsapp fs-5"></i>
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center text-dark"
                style={{ width: '45px', height: '45px', borderColor: '#ffa826' }}
              >
                <i className="bi bi-tiktok fs-5"></i>
              </a>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO DE COTIZACIÓN */}
          <div className="col-lg-7">
            <div 
              className="p-4 p-md-5 rounded-4 bg-white shadow-sm"
              style={{ border: '2px solid #ffa826' }}
            >
              <h3 className="fw-bold text-dark mb-4 text-center">Envíanos un mensaje</h3>

              {mensaje && (
                <div className={`alert alert-${mensaje.tipo} mb-4`} role="alert">
                  {mensaje.texto}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">Nombre Completo *</label>
                    <input 
                      type="text" 
                      name="nombre"
                      className="form-control p-2.5"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      name="correo"
                      className="form-control p-2.5"
                      placeholder="correo@ejemplo.com"
                      value={formData.correo}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">Teléfono (9 dígitos) *</label>
                    <input 
                      type="tel" 
                      name="telefono"
                      maxLength="9"
                      className="form-control p-2.5"
                      placeholder="987654321"
                      value={formData.telefono}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">Destino de Interés *</label>
                    <input 
                      type="text" 
                      name="destino"
                      className="form-control p-2.5"
                      placeholder="Ej: Cusco, Oxapampa..."
                      value={formData.destino}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">Fecha Aprox. de Viaje *</label>
                    <input 
                      type="date" 
                      name="fechaViaje"
                      className="form-control p-2.5"
                      value={formData.fechaViaje}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-dark">N° de Personas *</label>
                    <input 
                      type="number" 
                      name="personas"
                      min="1"
                      className="form-control p-2.5"
                      value={formData.personas}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold small text-dark">Mensaje / Detalles Adicionales *</label>
                    <textarea 
                      name="servicio"
                      rows="3"
                      className="form-control p-2.5"
                      placeholder="Escribe aquí cualquier requerimiento especial o consulta..."
                      value={formData.servicio}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12 mt-4">
                    <button 
                      type="submit" 
                      className="btn w-100 fw-bold text-white py-3 text-uppercase rounded-3"
                      style={{ backgroundColor: '#ffa826' }}
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Enviar Cotización'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}