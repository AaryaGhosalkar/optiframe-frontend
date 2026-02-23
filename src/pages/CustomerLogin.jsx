import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const fromCheckout = location.state?.fromCheckout;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://optiframe-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (fromCheckout) {
        navigate("/checkout");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <p style={{ textAlign: "center", marginTop: "10px" }}>
  Don't have an account?{" "}
  <span
    style={{ color: "#4f46e5", cursor: "pointer" }}
    onClick={() => navigate("/register")}
  >
    Register
  </span>
</p>

        <button type="submit" className="lux-btn">
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "350px",
  },
};