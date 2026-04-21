// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { OrdersProvider } from "./context/OrdersContext";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Filter from "./pages/Filter";
import Stats from "./pages/Stats";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">🍜</span>
        <span className="brand-name">FoodDash</span>
      </div>
      <div className="nav-links">
        <NavLink to="/orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Orders
        </NavLink>
        <NavLink to="/filter" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Filter
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Stats
        </NavLink>
      </div>
    </nav>
  );
}

function App() {
  return (
    <OrdersProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Orders />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </OrdersProvider>
  );
}

export default App;
