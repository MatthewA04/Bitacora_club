const pool = require("../config/db");

// Obtener todas las noticias
exports.obtenerNoticias = async (req, res, next) => {
  try {
    const [results] = await pool.query("SELECT * FROM noticias ORDER BY id DESC");
    return res.json(results);
  } catch (error) {
    next(error);
  }
};

// Crear nueva noticia
exports.crearNoticia = async (req, res, next) => {
  const { titulo, categoria, contenido } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const query = "INSERT INTO noticias (titulo, categoria, contenido, imagen) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(query, [titulo, categoria, contenido, imagen]);
    return res.status(201).json({ message: "Noticia creada con éxito.", id: result.insertId });
  } catch (error) {
    next(error);
  }
};

// Actualizar noticia
exports.actualizarNoticia = async (req, res, next) => {
  const { id } = req.params;
  const { titulo, categoria, contenido } = req.body;

  try {
    if (req.file) {
      const imagen = `/uploads/${req.file.filename}`;
      const query = "UPDATE noticias SET titulo = ?, categoria = ?, contenido = ?, imagen = ? WHERE id = ?";
      await pool.query(query, [titulo, categoria, contenido, imagen, id]);
    } else {
      const query = "UPDATE noticias SET titulo = ?, categoria = ?, contenido = ? WHERE id = ?";
      await pool.query(query, [titulo, categoria, contenido, id]);
    }
    return res.json({ message: "Noticia actualizada correctamente." });
  } catch (error) {
    next(error);
  }
};

// Eliminar noticia
exports.eliminarNoticia = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM noticias WHERE id = ?", [id]);
    return res.json({ message: "Noticia eliminada correctamente." });
  } catch (error) {
    next(error);
  }
};