import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.page}>
      <div style={styles.headerSection}>
  <button
    className="lux-btn-outline"
    onClick={() => navigate("/products")}
  >
    ← Back
  </button>

  <h2 style={styles.heading}>Your Cart</h2>
</div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={styles.layout}>
          
          {/* LEFT SIDE – PRODUCTS */}
          <div style={styles.productsSection}>
            {cartItems.map((item) => (
              <div key={item._id} style={styles.productCard}>
                
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.image}
                />

                <div style={styles.productDetails}>
                  <h3>{item.name}</h3>
                  <p style={styles.price}>₹{item.price}</p>

                  <div style={styles.qtyRow}>
                    <button
                      className="lux-btn-outline"
                      onClick={() => removeFromCart(item._id)}
                    >
                      –
                    </button>

                    <span style={styles.qtyText}>
                      {item.quantity}
                    </span>

                    <button
                      className="lux-btn-outline"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={styles.itemTotal}>
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE – SUMMARY */}
          <div style={styles.summarySection}>
            <h3 style={{ marginBottom: "20px" }}>
              Order Summary
            </h3>

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr style={{ margin: "20px 0" }} />

            <div style={styles.summaryRow}>
              <strong>Total</strong>
              <strong>₹{total}</strong>
            </div>

            <button
              className="lux-btn"
              style={{ width: "100%", marginTop: "25px" }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              className="lux-btn-outline"
              style={{ width: "100%", marginTop: "12px" }}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "60px 80px",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
    minHeight: "90vh",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "600",
    marginBottom: "40px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "40px",
  },
  productsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  productCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "25px",
    background: "#ffffff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
    background: "#f3f4f6",
    borderRadius: "14px",
    padding: "15px",
  },
  productDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  price: {
    fontWeight: "600",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "10px",
  },
  qtyText: {
    fontWeight: "600",
    fontSize: "16px",
  },
  itemTotal: {
    fontWeight: "600",
    fontSize: "16px",
  },
  summarySection: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    height: "fit-content",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  headerSection: {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "20px",
  marginBottom: "40px",
},
};