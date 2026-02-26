import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    window.location.href = "/login";
    return;
  }

  fetch(" /api/orders")
    .then((res) => res.json())
    .then((data) => {
      const userOrders = data.filter(
        (order) => order.customerEmail === storedUser.email
      );
      setOrders(userOrders);
    })
    .catch((err) => {
      console.error("Error fetching orders:", err);
    });

}, []);

  return (
    <div style={styles.page}>
      <button
        className="lux-btn-outline"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <h2 style={styles.title}>Your Orders</h2>

      <div style={styles.grid}>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} style={styles.card}>
              <div>
                <p style={styles.email}>
                  {order.customerEmail}
                </p>
                <p>Total: ₹{order.totalAmount}</p>
                <p>
                  Status:{" "}
                  <span
                    style={{
                      color:
                        order.status === "Delivered"
                          ? "green"
                          : order.status === "Shipped"
                          ? "#f59e0b"
                          : "#6b7280",
                      fontWeight: "600",
                    }}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              <div style={{ marginTop: "10px" }}>
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "60px 80px",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
    minHeight: "90vh",
  },
  title: {
    marginTop: "25px",
    marginBottom: "40px",
    fontSize: "28px",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  email: {
    fontWeight: "600",
    marginBottom: "8px",
  },
};