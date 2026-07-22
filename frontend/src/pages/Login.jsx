import React, { useState } from "react";
import "./Pages.css";
import { useNavigate } from "react-router-dom";

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ correo: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error al iniciar sesión.");
      }

      // Si las credenciales son correctas, guardamos el usuario en localStorage
      localStorage.setItem("adminUser", JSON.stringify(data.usuario));

      // Notificamos al componente padre que el login fue exitoso
      onLoginSuccess(data.usuario);

      // CORREGIDO: Redireccionar inmediatamente al dashboard administrativo
      navigate("/dashboard"); 

    } catch (err) {
      // Captura fallas de red (ej: servidor apagado o error de CORS)
      if (err.message === "Failed to fetch") {
        setError("No se pudo conectar con el servidor. Verifica que tu Backend esté encendido.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Panel de Administración</h2>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            style={styles.input}
            placeholder="admin@bitacora.com"
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Verificando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f9",
  },
  form: {
    background: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#333",
    fontFamily: "sans-serif",
  },
  error: {
    backgroundColor: "#ffebe9",
    color: "#ea4335",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "16px",
    textAlign: "center",
    fontSize: "14px",
  },
  inputGroup: { marginBottom: "20px" },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#666",
    fontWeight: "bold",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
};