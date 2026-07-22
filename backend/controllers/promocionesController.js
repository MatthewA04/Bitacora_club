const pool = require("../config/db");

// Obtener promociones (con JOIN para traer datos del administrador)
exports.obtenerPromociones = async (req, res, next) => {
  try {
    const query = `
      SELECT p.*, u.nombre AS creado_por 
      FROM promociones p
      LEFT JOIN usuarios_admin u ON p.admin_id = u.id
      ORDER BY p.id DESC
    `;
    const [rows] = await pool.query(query);
    return res.json(rows);
  } catch (error) {
    next(error);
  }
};

// Obtener promoción por ID
exports.obtenerPromocionPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM promociones WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "La promoción requerida no existe." });
    }
    return res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// Crear promoción (CORREGIDO: Incluye admin_id en el INSERT)
exports.crearPromocion = async (req, res, next) => {
  try {
    const {
      titulo,
      destino,
      resumen,
      itinerario,
      incluye,
      no_incluye,
      actividades,
      terminos,
      precio,
      es_recomendado,
    } = req.body;

    if (
      !titulo ||
      !destino ||
      !resumen ||
      !itinerario ||
      !incluye ||
      !no_incluye ||
      !actividades ||
      !terminos ||
      !precio
    ) {
      return res
        .status(400)
        .json({
          error:
            "Todos los campos de texto, destino y el precio son requeridos.",
        });
    }

    const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const recomendadoBool =
      es_recomendado === "true" || es_recomendado === true ? 1 : 0;
      
    // ID del administrador autenticado mediante JWT o Middleware
    const admin_id = req.usuario ? req.usuario.id : null; 

    const query = `
      INSERT INTO promociones 
      (titulo, destino, imagen, resumen, itinerario, incluye, no_incluye, actividades, terminos, precio, es_recomendado, admin_id, fecha) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const [result] = await pool.query(query, [
      titulo,
      destino.toUpperCase(),
      imagenUrl,
      resumen,
      itinerario,
      incluye,
      no_incluye,
      actividades,
      terminos,
      precio,
      recomendadoBool,
      admin_id, // <-- ¡Agregado aquí!
    ]);

    return res
      .status(201)
      .json({
        message: "¡Promoción publicada con éxito!",
        id: result.insertId,
      });
  } catch (error) {
    next(error);
  }
};

// Actualizar promoción
exports.actualizarPromocion = async (req, res, next) => {
  const { id } = req.params;
  const {
    titulo,
    destino,
    resumen,
    itinerario,
    incluye,
    no_incluye,
    actividades,
    terminos,
    precio,
    es_recomendado,
  } = req.body;

  try {
    const destinoMayusculas = destino ? destino.toUpperCase() : "";
    const recomendadoBool =
      es_recomendado === "true" || es_recomendado === true ? 1 : 0;

    if (req.file) {
      const nuevaImagenUrl = `/uploads/${req.file.filename}`;
      const query = `
        UPDATE promociones 
        SET titulo=?, destino=?, resumen=?, itinerario=?, incluye=?, no_incluye=?, actividades=?, terminos=?, precio=?, es_recomendado=?, imagen=? 
        WHERE id=?
      `;
      await pool.query(query, [
        titulo,
        destinoMayusculas,
        resumen,
        itinerario,
        incluye,
        no_incluye,
        actividades,
        terminos,
        precio,
        recomendadoBool,
        nuevaImagenUrl,
        id,
      ]);
    } else {
      const query = `
        UPDATE promociones 
        SET titulo=?, destino=?, resumen=?, itinerario=?, incluye=?, no_incluye=?, actividades=?, terminos=?, precio=?, es_recomendado=? 
        WHERE id=?
      `;
      await pool.query(query, [
        titulo,
        destinoMayusculas,
        resumen,
        itinerario,
        incluye,
        no_incluye,
        actividades,
        terminos,
        precio,
        recomendadoBool,
        id,
      ]);
    }
    return res.json({ message: "Promoción actualizada de forma exitosa." });
  } catch (error) {
    next(error);
  }
};

// Eliminar promoción
exports.eliminarPromocion = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM promociones WHERE id = ?", [id]);
    return res.json({ message: "Promoción eliminada correctamente." });
  } catch (error) {
    next(error);
  }
};

// Obtener destinos activos
exports.obtenerDestinosActivos = async (req, res, next) => {
  try {
    const query =
      "SELECT DISTINCT destino FROM promociones WHERE destino IS NOT NULL AND destino != '' ORDER BY destino ASC";
    const [rows] = await pool.query(query);
    const listaDestinos = rows.map((row) => row.destino);
    return res.json(listaDestinos);
  } catch (error) {
    next(error);
  }
};