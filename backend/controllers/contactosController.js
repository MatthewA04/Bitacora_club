const pool = require("../config/db");

// Guardar cotización desde la web
exports.crearCotizacion = async (req, res, next) => {
  const { nombre, correo, telefono, destino, servicio, fechaViaje, personas } = req.body;

  if (!nombre || !correo || !telefono || !destino || !servicio || !fechaViaje || !personas) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben ser completados." });
  }

  if (telefono.length !== 9) {
    return res.status(400).json({ error: "El número de teléfono debe tener exactamente 9 dígitos." });
  }

  try {
    const query = `
      INSERT INTO cotizaciones (nombre, correo, telefono, destino, servicio, fecha_viaje, personas, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pendiente')
    `;
    const [result] = await pool.query(query, [nombre, correo, telefono, destino, servicio, fechaViaje, personas]);
    return res.status(201).json({ message: "¡Cotización procesada con éxito!", id: result.insertId });
  } catch (error) {
    next(error);
  }
};

// Obtener contactos para el Admin
exports.obtenerContactos = async (req, res, next) => {
  try {
    const query = `
      SELECT id, nombre, correo, telefono, destino AS paqueteInteres, 
             servicio AS mensaje, fecha_viaje AS fecha, estado 
      FROM cotizaciones 
      ORDER BY id DESC
    `;
    const [rows] = await pool.query(query);
    return res.json(rows);
  } catch (error) {
    next(error);
  }
};

// Actualizar estado de contacto
exports.actualizarEstado = async (req, res, next) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    await pool.query("UPDATE cotizaciones SET estado = ? WHERE id = ?", [estado, id]);
    return res.json({ message: "Estado de contacto actualizado correctamente." });
  } catch (error) {
    next(error);
  }
};

// Eliminar contacto
exports.eliminarContacto = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM cotizaciones WHERE id = ?", [id]);
    return res.json({ message: "Contacto eliminado con éxito." });
  } catch (error) {
    next(error);
  }
};