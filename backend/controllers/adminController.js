const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Login de administradores
exports.login = async (req, res, next) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: "Por favor, ingresa correo y contraseña." });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM usuarios_admin WHERE correo = ?", [correo]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    const usuario = rows[0];
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrecto) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    return res.json({
      message: "¡Inicio de sesión exitoso!",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Métricas del Dashboard (Optimizado con Promise.all)
// controllers/adminController.js

exports.obtenerMetricas = async (req, res, next) => {
  try {
    const [
      [totalesCotizaciones],
      [pendientesCotizaciones],
      [totalesNoticias],
      [totalesPromociones],
      ultimosContactosResultado, 
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) AS total FROM cotizaciones"),
      pool.query("SELECT COUNT(*) AS total FROM cotizaciones WHERE estado = 'pendiente'"),
      pool.query("SELECT COUNT(*) AS total FROM noticias"),
      pool.query("SELECT COUNT(*) AS total FROM promociones"),
      pool.query(`
        SELECT id, nombre, correo, telefono, destino AS paqueteInteres, fecha_viaje AS fecha, estado 
        FROM cotizaciones 
        ORDER BY id DESC 
        LIMIT 4
      `),
    ]);

    // ultimosContactosResultado[0] contiene las filas devueltas por la consulta (arreglo)
    const ultimosContactos = ultimosContactosResultado[0];

    return res.json({
      totales: totalesCotizaciones[0]?.total || 0,
      pendientes: pendientesCotizaciones[0]?.total || 0,
      noticias: totalesNoticias[0]?.total || 0,
      promociones: totalesPromociones[0]?.total || 0,
      ultimosContactos: ultimosContactos || [],
    });
  } catch (error) {
    next(error);
  }
};