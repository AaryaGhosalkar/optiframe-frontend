import { useNavigate } from "react-router-dom";

export default function LoginSelector() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to OptiFrame</h2>
        <p style={styles.subtitle}>
          Choose how you would like to continue
        </p>

        <div style={styles.buttons}>
          <button
            className="lux-btn"
            onClick={() => navigate("/customer-login")}
          >
            Customer Login
          </button>

          <button
            className="lux-btn-outline"
            onClick={() => navigate("/admin-login")}
          >
            Admin / Staff Login
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
  },
  card: {
    background: "#ffffff",
    padding: "50px",
    borderRadius: "18px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
    textAlign: "center",
    width: "400px",
  },
  title: {
    marginBottom: "10px",
    fontSize: "22px",
  },
  subtitle: {
    marginBottom: "30px",
    color: "#6b7280",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
};