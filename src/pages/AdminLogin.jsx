import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // OWNER ADMIN
    if (email === "admin@optiframe.com" && password === "admin123") {
      localStorage.setItem("admin", JSON.stringify({ email }));
      navigate("/admin");
      return;
    }

    // STAFF ACCOUNT
    if (email === "staff@optiframe.com" && password === "staff123") {
      localStorage.setItem("staff", JSON.stringify({ email }));
      navigate("/admin");
      return;
    }

    alert("Invalid Credentials");
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Admin / Staff Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    background: "#f5f6fa",
  },
  form: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};