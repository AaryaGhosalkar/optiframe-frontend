import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(" /api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const getQuantity = (id) => {
    const item = cartItems.find((i) => i._id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Explore Frames</h1>

      <div style={styles.grid}>
        {products.map((p) => {
          const qty = getQuantity(p._id);
          const outOfStock = p.stock === 0;

          return (
            <div
              key={p._id}
              style={styles.card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-6px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={styles.imageWrapper}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={styles.image}
                />
              </div>

              <h3 style={styles.name}>{p.name}</h3>
              <p style={styles.price}>₹{p.price}</p>

              {outOfStock && (
                <p style={styles.outOfStock}>Out of Stock</p>
              )}

              {!outOfStock && (
                <button
                  style={styles.tryOnBtn}
                  onClick={() =>
                    navigate("/tryon", {
                      state: { framePath: p.model3d },
                    })
                  }
                >
                  Try On
                </button>
              )}

              {!outOfStock &&
                (qty === 0 ? (
                  <button
                    style={styles.addBtn}
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div style={styles.qtyBox}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => removeFromCart(p._id)}
                    >
                      −
                    </button>

                    <span style={styles.qtyText}>{qty}</span>

                    <button
                      style={styles.qtyBtn}
                      onClick={() => addToCart(p)}
                      disabled={qty >= p.stock}
                    >
                      +
                    </button>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "60px 80px",
    background: "#f8fafc",
    minHeight: "100vh",
  },

  title: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    transition: "all 0.25s ease",
  },

  imageWrapper: {
    background: "#f3f4f6",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "15px",
  },

  image: {
    width: "100%",
    height: "160px",
    objectFit: "contain",
  },

  name: {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "6px",
  },

  price: {
    fontWeight: "600",
    marginBottom: "15px",
  },

  outOfStock: {
    color: "#ef4444",
    fontWeight: "600",
    marginBottom: "10px",
  },

  tryOnBtn: {
    width: "100%",
    padding: "10px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginBottom: "10px",
    fontWeight: "500",
  },

  addBtn: {
    width: "100%",
    padding: "10px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "500",
  },

  qtyBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "14px",
    marginTop: "10px",
  },

  qtyBtn: {
    padding: "6px 14px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
  },

  qtyText: {
    fontSize: "18px",
    fontWeight: "600",
  },
};