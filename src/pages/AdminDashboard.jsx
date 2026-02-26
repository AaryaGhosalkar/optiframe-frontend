import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const staff = JSON.parse(localStorage.getItem("staff"));

  if (!admin && !staff) {
    return <Navigate to="/admin-login" />;
  }

  const role = admin ? "Admin" : "Staff";

  const [view, setView] = useState("menu");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [model3d, setModel3d] = useState("");
  const [stock, setStock] = useState("");

  // ================= FETCH DATA =================

  const fetchProducts = async () => {
    const res = await fetch("https://optiframe-backend.onrender.com/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const res = await fetch("https://optiframe-backend.onrender.com/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // ================= ADD PRODUCT =================

  const addProduct = async () => {
    await fetch("https://optiframe-backend.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        image,
        model3d,
        stock,
      }),
    });

    setName("");
    setPrice("");
    setImage("");
    setModel3d("");
    setStock("");

    fetchProducts();
    alert("Product Added");
  };

  // ================= DELETE PRODUCT =================

  const deleteProduct = async (id) => {
    await fetch(`https://optiframe-backend.onrender.com/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  // ================= UPDATE STOCK =================

  const updateStock = async (id, newStock) => {
    await fetch(`https://optiframe-backend.onrender.com/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: newStock }),
    });

    fetchProducts();
  };

  // ================= UPDATE ORDER STATUS =================

  const updateStatus = async (id, status) => {
    const res = await fetch(`https://optiframe-backend.onrender.com/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      alert("Status update failed");
      return;
    }

    fetchOrders();
  };

  // ================= MENU =================

  if (view === "menu") {
  return (
    <div style={styles.dashboardPage}>
      <div style={styles.dashboardHeader}>
        <h1 style={styles.dashboardTitle}>
          Admin Control Panel
        </h1>
        <p style={styles.dashboardSubtitle}>
          Manage products, inventory, and customer orders
        </p>
      </div>

      <div style={styles.dashboardGrid}>
        <div
          style={styles.dashboardCard}
          onClick={() => setView("add")}
        >
          <h3>Add Product</h3>
          <p>Create new eyewear listing</p>
        </div>

        <div
          style={styles.dashboardCard}
          onClick={() => setView("inventory")}
        >
          <h3>Manage Inventory</h3>
          <p>Update stock & product details</p>
        </div>

        <div
          style={styles.dashboardCard}
          onClick={() => setView("orders")}
        >
          <h3>Manage Orders</h3>
          <p>Track and update order status</p>
        </div>
      </div>
    </div>
  );
}

  // ================= ADD PRODUCT VIEW =================

  if (view === "add") {
  return (
    <div style={styles.page}>
      
      {/* Back stays left */}
      <button
        className="lux-btn-outline"
        onClick={() => setView("menu")}
      >
        ← Back
      </button>

      {/* Centered Content */}
      <div style={styles.centerContainer}>
        <h2 style={styles.heading}>Add Product</h2>

        <div style={styles.formCard}>
          <input
            style={styles.input}
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Frame Path (e.g. /frames/frame1.png)"
            value={model3d}
            onChange={(e) => setModel3d(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <button className="lux-btn" onClick={addProduct}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

  // ================= INVENTORY VIEW =================

  if (view === "inventory") {
  return (
    <div style={styles.page}>
      <button
        className="lux-btn-outline"
        onClick={() => setView("menu")}
      >
        ← Back
      </button>

      <h2 style={styles.sectionTitle}>Inventory</h2>

      <div style={styles.gridContainer}>
        {products.map((p) => (
          <div key={p._id} style={styles.hoverCard}>
            <h3 style={{ marginBottom: "10px" }}>{p.name}</h3>
            <p style={{ marginBottom: "15px" }}>
              Stock: {p.stock}
            </p>

            <button
              className="lux-btn-outline"
              onClick={() => deleteProduct(p._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

  // ================= ORDERS VIEW =================

  if (view === "orders") {
  return (
    <div style={styles.page}>
      <button
        className="lux-btn-outline"
        onClick={() => setView("menu")}
      >
        ← Back
      </button>

      <h2 style={styles.sectionTitle}>Manage Orders</h2>

      <div style={styles.gridContainer}>
        {orders.map((order) => (
          <div key={order._id} style={styles.hoverCard}>
            <p style={{ fontWeight: "600" }}>
              {order.customerEmail}
            </p>

            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>

            <div style={{ marginTop: "15px", display: "flex", gap: "8px" }}>
              <button
                className="lux-btn-outline"
                onClick={() =>
                  updateStatus(order._id, "Shipped")
                }
              >
                Shipped
              </button>

              <button
                className="lux-btn"
                onClick={() =>
                  updateStatus(order._id, "Delivered")
                }
              >
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

  return null;
}

const styles = {
  page: {
    padding: "40px",
    background: "#f5f6fa",
    minHeight: "100vh",
  },
  menu: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    background: "#fff",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },
  centerContainer: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "40px",
},

heading: {
  fontSize: "26px",
  marginBottom: "25px",
  fontWeight: "600",
},

formCard: {
  background: "#ffffff",
  padding: "35px",
  borderRadius: "14px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  width: "400px",
},

input: {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  fontSize: "14px",
},
sectionTitle: {
  marginTop: "25px",
  marginBottom: "30px",
  fontSize: "26px",
  fontWeight: "600",
},

gridContainer: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "25px",
},

hoverCard: {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  transition: "all 0.25s ease",
  cursor: "pointer",
},
dashboardPage: {
  minHeight: "90vh",
  padding: "60px 80px",
  background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
},

dashboardHeader: {
  marginBottom: "50px",
},

dashboardTitle: {
  fontSize: "36px",
  fontWeight: "700",
  marginBottom: "10px",
},

dashboardSubtitle: {
  color: "#6b7280",
  fontSize: "15px",
},

dashboardGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
},

dashboardCard: {
  background: "#ffffff",
  padding: "35px",
  borderRadius: "18px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "all 0.3s ease",
},
};