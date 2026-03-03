import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 🔐 Step 5 — Block if not admin
  if (!user || user.role !== "Admin") {
    return <Navigate to="/admin-login" />;
  }

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
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const res = await fetch("/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 403) {
      alert("Not authorized");
      return;
    }

    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // ================= ADD PRODUCT =================

  const addProduct = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔐 Step 6
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
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // 🔐 Step 6
      },
    });

    fetchProducts();
  };

  // ================= UPDATE STOCK =================

  const updateStock = async (id, newStock) => {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔐 Step 6
      },
      body: JSON.stringify({ stock: newStock }),
    });

    fetchProducts();
  };

  // ================= UPDATE ORDER STATUS =================

  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔐 Step 6
      },
      body: JSON.stringify({ status }),
    });

    fetchOrders();
  };

  // ================= MENU VIEW =================

  if (view === "menu") {
    return (
      <div style={styles.page}>
        <h1>Admin Control Panel</h1>

        <div style={styles.menu}>
          <button onClick={() => setView("add")}>Add Product</button>
          <button onClick={() => setView("inventory")}>
            Manage Inventory
          </button>
          <button onClick={() => setView("orders")}>
            Manage Orders
          </button>
        </div>
      </div>
    );
  }

  // ================= ADD PRODUCT VIEW =================

  if (view === "add") {
    return (
      <div style={styles.page}>
        <button onClick={() => setView("menu")}>← Back</button>
        <h2>Add Product</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          placeholder="Frame Path"
          value={model3d}
          onChange={(e) => setModel3d(e.target.value)}
        />
        <input
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button onClick={addProduct}>Add</button>
      </div>
    );
  }

  // ================= INVENTORY =================

  if (view === "inventory") {
    return (
      <div style={styles.page}>
        <button onClick={() => setView("menu")}>← Back</button>
        <h2>Inventory</h2>

        {products.map((p) => (
          <div key={p._id} style={styles.card}>
            <h3>{p.name}</h3>
            <p>Stock: {p.stock}</p>
            <button onClick={() => deleteProduct(p._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }

  // ================= ORDERS =================

  if (view === "orders") {
    return (
      <div style={styles.page}>
        <button onClick={() => setView("menu")}>← Back</button>
        <h2>Orders</h2>

        {orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <p>{order.customerEmail}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>

            <button
              onClick={() =>
                updateStatus(order._id, "Shipped")
              }
            >
              Shipped
            </button>

            <button
              onClick={() =>
                updateStatus(order._id, "Delivered")
              }
            >
              Delivered
            </button>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

const styles = {
  page: {
    padding: "40px",
  },
  menu: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
};