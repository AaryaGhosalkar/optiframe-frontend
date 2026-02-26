import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!storedUser) {
      window.location.href = "/login";
      return;
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + gst;

  const handlePayment = async () => {
    if (!form.fullName || !form.phone || !form.address1 || !form.pincode) {
      alert("Please fill required fields");
      return;
    }

    try {
      // 1️⃣ Create Razorpay order from backend
      const res = await fetch(
        " /api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total }),
        }
      );

      const order = await res.json();

      // 2️⃣ Open Razorpay popup
      const options = {
        key: "rzp_test_SJjZfILcxAlVBJ", // <-- PUT YOUR TEST KEY HERE
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "OptiFrame",
        description: "Eyewear Purchase",

        handler: async function (response) {
          // 3️⃣ Save order in database
          await fetch(
            " /api/orders",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                customerEmail: storedUser.email,
                items: cartItems,
                totalAmount: total,
                shippingAddress: form,
                paymentId: response.razorpay_payment_id,
              }),
            }
          );

          clearCart();
          window.location.href = "/order-success";
        },

        prefill: {
          name: form.fullName,
          email: storedUser.email,
          contact: form.phone,
        },

        theme: { color: "#111" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert("Payment failed");
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <div style={styles.page}>
      <h1>Checkout</h1>

      <div style={styles.container}>
        <div style={styles.formSection}>
          <h2>Shipping Details</h2>

          <input name="fullName" placeholder="Full Name*" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number*" onChange={handleChange} />
          <input name="address1" placeholder="Address Line 1*" onChange={handleChange} />
          <input name="address2" placeholder="Address Line 2" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="state" placeholder="State" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode*" onChange={handleChange} />
          <input name="landmark" placeholder="Landmark (Optional)" onChange={handleChange} />
        </div>

        <div style={styles.summary}>
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item._id} style={styles.itemRow}>
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <div style={styles.row}><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div style={styles.row}><span>Shipping</span><span>₹{shipping}</span></div>
          <div style={styles.row}><span>GST (18%)</span><span>₹{gst}</span></div>

          <h3>Total: ₹{total}</h3>

          <button style={styles.payBtn} onClick={handlePayment}>
            Pay with Razorpay
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "40px", background: "#f5f6fa", minHeight: "100vh" },
  container: { display: "flex", gap: "40px" },
  formSection: { flex: 1, display: "flex", flexDirection: "column", gap: "12px" },
  summary: { width: "350px", background: "#fff", padding: "20px", borderRadius: "8px" },
  itemRow: { display: "flex", justifyContent: "space-between", marginBottom: "8px" },
  row: { display: "flex", justifyContent: "space-between", marginBottom: "5px" },
  payBtn: {
    marginTop: "20px",
    padding: "12px",
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
};