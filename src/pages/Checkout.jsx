import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const customer = JSON.parse(localStorage.getItem("customer"));

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

  useEffect(() => {
    if (!customer) {
      navigate("/customer-login");
    }
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

    const options = {
      key: "rzp_test_1234567890", // <-- Replace with your Razorpay test key
      amount: total * 100,
      currency: "INR",
      name: "OptiFrame",
      description: "Eyewear Purchase",
      handler: async function (response) {
        // After successful payment create order

        await fetch("https://optiframe-backend.onrender.com/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerEmail: customer.email,
            items: cartItems,
            totalAmount: total,
            shippingAddress: form,
            paymentId: response.razorpay_payment_id,
          }),
        });

        alert("Payment Successful!");
        clearCart();
        navigate("/orders");
      },
      prefill: {
        name: form.fullName,
        email: customer.email,
        contact: form.phone,
      },
      theme: {
        color: "#111",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={styles.page}>
      <h1>Checkout</h1>

      <div style={styles.container}>
        {/* Address Form */}
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

        {/* Order Summary */}
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