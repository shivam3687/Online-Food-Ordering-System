import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const OrderTracking = () => {
  const { orderId } = useParams();
  const { url, token } = useContext(StoreContext);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Do nothing until token exists
    if (!token || !orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await axios.post(
          `${url}/api/order/single`,
          { orderId },
          { headers: { token } }
        );

        // ✅ Handle different backend response shapes safely
        const fetchedOrder =
          res.data.order || res.data.data || res.data;

        setOrder(fetchedOrder);
      } catch (err) {
        console.error("Order fetch failed:", err);
        setError("Failed to load order details.");
      }
    };

    fetchOrder();
  }, [orderId, token, url]);

  // ❌ Error state
  if (error) {
    return <p style={{ padding: "40px", color: "red" }}>{error}</p>;
  }

  // ⏳ Loading state
  if (!order) {
    return <p style={{ padding: "40px" }}>Loading order details...</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Tracking Order</h2>

      <p>
        <b>Status:</b> {order.status}
      </p>

      <p>
        <b>Amount:</b> ₹{order.amount}
      </p>

      <p><b>Items:</b></p>
      <ul>
        {order.items.map((item, idx) => (
          <li key={idx}>
            {item.name} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderTracking;
