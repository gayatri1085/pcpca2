// src/pages/Orders.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";

const statusColors = {
  delivered: { bg: "#dcfce7", color: "#16a34a", label: "✓ Delivered" },
  cancelled: { bg: "#fee2e2", color: "#dc2626", label: "✕ Cancelled" },
  pending:   { bg: "#fef9c3", color: "#ca8a04", label: "⏳ Pending" }
};

export default function Orders() {
  const { state } = useOrders();
  const navigate = useNavigate();
  const { orders, loading, error } = state;

  if (loading) return <div className="loading"><div className="spinner"></div><p>Loading orders...</p></div>;
  if (error)   return <div className="error-state">Error: {error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">All Orders</h1>
        <span className="count-badge">{orders.length} orders</span>
      </div>

      <div className="orders-grid">
        {orders.map(order => {
          const statusMeta = statusColors[order.status] || statusColors.pending;
          const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

          return (
            <div
              key={order.orderId}
              className="order-card"
              data-testid="order-item"
              onClick={() => navigate(`/orders/${order.orderId}`)}
            >
              <div className="card-header">
                <div>
                  <span className="order-id">#{order.orderId}</span>
                  <h3 className="customer-name">{order.customerName}</h3>
                </div>
                <span
                  className="status-badge"
                  style={{ background: statusMeta.bg, color: statusMeta.color }}
                >
                  {statusMeta.label}
                </span>
              </div>

              <div className="card-restaurant">
                <span className="restaurant-icon">🏪</span>
                <span>{order.restaurant}</span>
              </div>

              <div className="card-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="item-row">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">×{item.quantity}</span>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <div className="footer-meta">
                  <span>🕐 {order.deliveryTime}</span>
                  {order.rating && <span>⭐ {order.rating}</span>}
                </div>
                <div className="total-amount">₹{order.totalAmount}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
