// src/pages/Stats.js
import React, { useEffect } from "react";
import { useOrders } from "../context/OrdersContext";

export default function Stats() {
  const { state } = useOrders();
  const { orders } = state;

  const totalOrders    = orders.length;
  const deliveredOrders = orders.filter(o => o.status === "delivered").length;
  const cancelledOrders = orders.filter(o => o.status === "cancelled").length;
  const pendingOrders   = orders.filter(o => o.status === "pending").length;

  const totalRevenue = orders
    .filter(o => o.status === "delivered")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const avgRating = (() => {
    const rated = orders.filter(o => o.rating);
    if (!rated.length) return 0;
    return (rated.reduce((sum, o) => sum + o.rating, 0) / rated.length).toFixed(1);
  })();

  const deliveryRate = totalOrders > 0
    ? ((deliveredOrders / totalOrders) * 100).toFixed(1)
    : 0;

  // Expose window.appState as required
  useEffect(() => {
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
      pendingOrders,
      totalRevenue,
      avgRating: parseFloat(avgRating),
      deliveryRate: parseFloat(deliveryRate)
    };
  }, [totalOrders, deliveredOrders, cancelledOrders, pendingOrders, totalRevenue, avgRating, deliveryRate]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Dashboard Stats</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon">📦</div>
          <div className="stat-label">Total Orders</div>
          <div className="stat-value" data-testid="total-orders">{totalOrders}</div>
        </div>

        <div className="stat-card stat-delivered">
          <div className="stat-icon">✅</div>
          <div className="stat-label">Delivered</div>
          <div className="stat-value" data-testid="delivered-orders">{deliveredOrders}</div>
        </div>

        <div className="stat-card stat-cancelled">
          <div className="stat-icon">❌</div>
          <div className="stat-label">Cancelled</div>
          <div className="stat-value" data-testid="cancelled-orders">{cancelledOrders}</div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-label">Pending</div>
          <div className="stat-value">{pendingOrders}</div>
        </div>

        <div className="stat-card stat-revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">₹{totalRevenue.toLocaleString()}</div>
        </div>

        <div className="stat-card stat-rating">
          <div className="stat-icon">⭐</div>
          <div className="stat-label">Avg Rating</div>
          <div className="stat-value">{avgRating}</div>
        </div>
      </div>

      <div className="stats-section">
        <h2 className="section-title">Delivery Performance</h2>
        <div className="progress-bar-wrap">
          <div className="progress-label">
            <span>Delivery Rate</span>
            <span className="progress-pct">{deliveryRate}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${deliveryRate}%` }}
            ></div>
          </div>
        </div>

        <div className="breakdown-grid">
          <div className="breakdown-item">
            <div className="breakdown-dot dot-delivered"></div>
            <div className="breakdown-label">Delivered</div>
            <div className="breakdown-pct">
              {totalOrders > 0 ? ((deliveredOrders / totalOrders) * 100).toFixed(0) : 0}%
            </div>
          </div>
          <div className="breakdown-item">
            <div className="breakdown-dot dot-pending"></div>
            <div className="breakdown-label">Pending</div>
            <div className="breakdown-pct">
              {totalOrders > 0 ? ((pendingOrders / totalOrders) * 100).toFixed(0) : 0}%
            </div>
          </div>
          <div className="breakdown-item">
            <div className="breakdown-dot dot-cancelled"></div>
            <div className="breakdown-label">Cancelled</div>
            <div className="breakdown-pct">
              {totalOrders > 0 ? ((cancelledOrders / totalOrders) * 100).toFixed(0) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
