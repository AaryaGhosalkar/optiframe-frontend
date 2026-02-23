import { useNavigate } from "react-router-dom";

export default function CustomerDetails() {
  const navigate = useNavigate();

  const customer = JSON.parse(localStorage.getItem("customer"));

  if (!customer) {
    navigate("/customer-login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("customer");
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Customer Dashboard</h2>
        <p style={styles.email}>Logged in as: {customer.email}</p>

        <div style={styles.buttons}>
          <button
            style={styles.btn}
            onClick={() => navigate("/orders")}
          >
            View Order History
          </button>

          <button
            style={styles.btn}
            onClick={() => navigate("/cart")}
          >
            View Cart
          </button>

          <button
            style={styles.logout}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f6fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "320px",
  },
  email: {
    marginBottom: "20px",
    color: "#555",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  btn: {
    padding: "10px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  logout: {
    padding: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
