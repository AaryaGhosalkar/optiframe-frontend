import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import LoginSelector from "./pages/LoginSelector";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import TryOn from "./pages/TryOn";
import AdminLogin from "./pages/AdminLogin";
import CustomerDahboard from "./pages/CustomerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        OptiFrame
      </Link>

      <div style={styles.links}>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        {user ? (
          <>
            <Link to="/dashboard">My Account</Link>
            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div style={styles.hero}>
      <div style={styles.overlay}></div>

      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>
          Premium Eyewear <br />
          Redefined With AI
        </h1>

        <p style={styles.heroSubtitle}>
          Experience real-time virtual try-on and discover frames
          crafted for confidence and elegance.
        </p>

        <div style={styles.heroButtons}>
          <Link to="/products">
            <button style={styles.primaryBtn}>
              Shop Collection
            </button>
          </Link>

          <Link to="/tryon">
            <button style={styles.secondaryBtn}>
              Try Virtual Studio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<LoginSelector />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/tryon" element={<TryOn />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
      </Routes>
    </>
  );
}

const styles = {
  nav: {
    background: "#ffffff",
    padding: "18px 80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "700",
    textDecoration: "none",
    color: "#1e3a8a",
  },

  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "500",
  },

  link: {
    textDecoration: "none",
    color: "#374151",
  },

  loginBtn: {
    background: "#111827",
    color: "#fff",
    padding: "8px 18px",
    borderRadius: "8px",
    textDecoration: "none",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
  },

  welcome: {
    fontSize: "13px",
    color: "#6b7280",
  },

  hero: {
    position: "relative",
    height: "95vh",
    backgroundImage:
    "url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2070&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#ffffff",
},

overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "linear-gradient(135deg, rgba(0,0,0,0.75), rgba(30,41,59,0.85))",
},

heroContent: {
  position: "relative",
  zIndex: 2,
  maxWidth: "750px",
  padding: "0 20px",
},

heroTitle: {
  fontSize: "48px",
  fontWeight: "700",
  marginBottom: "20px",
  letterSpacing: "1px",
},

heroSubtitle: {
  fontSize: "18px",
  color: "#e5e7eb",
  marginBottom: "35px",
},

heroButtons: {
  display: "flex",
  gap: "25px",
  justifyContent: "center",
},

primaryBtn: {
  background: "linear-gradient(135deg, #1e40af, #4f46e5)",
  color: "#fff",
  padding: "14px 30px",
  borderRadius: "10px",
  border: "none",
  fontSize: "15px",
  fontWeight: "600",
  boxShadow: "0 8px 25px rgba(79,70,229,0.4)",
},

secondaryBtn: {
  background: "#ffffff",
  color: "#111827",
  padding: "14px 30px",
  borderRadius: "10px",
  border: "none",
  fontSize: "15px",
  fontWeight: "600",
},
};