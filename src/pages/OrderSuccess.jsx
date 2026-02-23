import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.icon}>✅</h1>
        <h2>Order Placed Successfully!</h2>
        <p>Your order has been confirmed.</p>

        <div style={styles.buttons}>
          <button
            style={styles.primary}
            onClick={() => navigate("/orders")}
          >
            View Orders
          </button>

          <button
            style={styles.secondary}
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
    background: "#f4f6fb",
  },
  card: {
    background: "#fff",
    padding: "50px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
    width: "400px",
  },
  icon: {
    fontSize: "50px",
    marginBottom: "20px",
  },
  buttons: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  primary: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
  secondary: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  },
};