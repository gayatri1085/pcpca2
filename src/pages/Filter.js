// src/pages/Filter.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";

const statusColors = {
  delivered: { bg: "#dcfce7", color: "#16a34a", label: "✓ Delivered" },
  cancelled: { bg: "#fee2e2", color: "#dc2626", label: "✕ Cancelled" },
  pending:   { bg: "#fef9c3", color: "#ca8a04", label: "⏳ Pending" }
};

export default function Filter() {
  const { state, dispatch } = useOrders();
  const navigate = useNavigate();
  const { orders, filterQuery } = state;

  const filtered = orders.filter(order => {
    const q = filterQuery.toLowerCase();
    return (
      order.customerName.toLowerCase().includes(q) ||
      order.restaurant.toLowerCase().includes(q) ||
      order.status.toLowerCase().includes(q) ||
      String(order.orderId).includes(q) ||
      order.items.some(item => item.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Filter Orders</h1>
      </div>

      <div className="filter-bar">
        <span className="filter-icon">🔍</span>
        <input
          type="text"
          className="filter-input"
          data-testid="filter-input"
          placeholder="Search by customer, restaurant, item, status, or order ID..."
          value={filterQuery}
          onChange={e => dispatch({ type: "SET_FILTER", payload: e.target.value })}
        />
        {filterQuery && (
          <button
            className="clear-btn"
            onClick={() => dispatch({ type: "SET_FILTER", payload: "" })}
          >
            ✕
          </button>
        )}
      </div>

      <div className="filter-results-info">
        {filterQuery
          ? <span>Showing <strong>{filtered.length}</strong> of {orders.length} orders</span>
          : <span>All <strong>{orders.length}</strong> orders</span>
        }
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <p>No orders match your search.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {filtered.map(order => {
            const statusMeta = statusColors[order.status] || statusColors.pending;
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
      )}
    </div>
  );
}
