import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>Please login first</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>Welcome, {user.name}</h1>

        <div style={styles.buttons}>
          <button
            style={styles.button}
            onClick={() => navigate("/orders")}
          >
            Your Orders
          </button>

          <button
            style={styles.button}
            onClick={() => navigate("/products")}
          >
            Continue Shopping
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
  },
  card: {
    background: "#fff",
    padding: "50px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  buttons: {
    marginTop: "30px",
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  button: {
    padding: "12px 24px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};