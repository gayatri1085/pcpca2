// src/pages/OrderDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";

const statusColors = {
  delivered: { bg: "#dcfce7", color: "#16a34a", label: "✓ Delivered" },
  cancelled: { bg: "#fee2e2", color: "#dc2626", label: "✕ Cancelled" },
  pending:   { bg: "#fef9c3", color: "#ca8a04", label: "⏳ Pending" }
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useOrders(); // 🔥 added dispatch

  const order = state.orders.find(o => o.orderId === parseInt(id));

  if (state.loading)
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );

  if (!order)
    return (
      <div className="page">
        <div className="not-found">
          <div className="not-found-icon">🔍</div>
          <h2>Order #{id} not found</h2>
          <button className="btn-back" onClick={() => navigate("/orders")}>
            ← Back to Orders
          </button>
        </div>
      </div>
    );

  const statusMeta = statusColors[order.status] || statusColors.pending;

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔥 HANDLERS
  const markAsDelivered = () => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: {
        id: order.orderId,
        status: "delivered"
      }
    });
  };

  const cancelOrder = () => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: {
        id: order.orderId,
        status: "cancelled"
      }
    });
  };

  return (
    <div className="page">
      <button className="btn-back" onClick={() => navigate("/orders")}>
        ← Back to Orders
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <div>
            <p className="detail-order-id">Order #{order.orderId}</p>
            <h1 className="detail-customer">{order.customerName}</h1>
            <p className="detail-restaurant">🏪 {order.restaurant}</p>
          </div>

          <span
            className="status-badge status-lg"
            style={{ background: statusMeta.bg, color: statusMeta.color }}
          >
            {statusMeta.label}
          </span>
        </div>

        {/* 🔥 ACTION BUTTONS */}
        <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
          <button
            onClick={markAsDelivered}
            disabled={order.status === "delivered"}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background:
                order.status === "delivered" ? "#d1d5db" : "#16a34a",
              color: "white"
            }}
          >
            Mark as Delivered
          </button>

          <button
            onClick={cancelOrder}
            disabled={order.status === "cancelled"}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background:
                order.status === "cancelled" ? "#d1d5db" : "#dc2626",
              color: "white"
            }}
          >
            Cancel Order
          </button>
        </div>

        <div className="detail-section">
          <h2 className="section-title">Items Ordered</h2>

          <div className="items-table">
            <div className="table-head">
              <span>Item</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Subtotal</span>
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="table-row">
                <span className="item-name">{item.name}</span>
                <span>₹{item.price}</span>
                <span>×{item.quantity}</span>
                <span className="item-subtotal">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}

            <div className="table-subtotal">
              <span>Subtotal</span>
              <span></span>
              <span></span>
              <span>₹{subtotal}</span>
            </div>
          </div>
        </div>

        <div className="detail-meta-grid">
          <div className="meta-card">
            <div className="meta-icon">💰</div>
            <div className="meta-label">Total Amount</div>
            <div className="meta-value">₹{order.totalAmount}</div>
          </div>

          <div className="meta-card">
            <div className="meta-icon">🕐</div>
            <div className="meta-label">Delivery Time</div>
            <div className="meta-value">{order.deliveryTime}</div>
          </div>

          <div className="meta-card">
            <div className="meta-icon">⭐</div>
            <div className="meta-label">Rating</div>
            <div className="meta-value">
              {order.rating ? `${order.rating} / 5` : "Not rated"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
