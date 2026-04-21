// src/context/OrdersContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ordersReducer, initialState } from "../reducers/ordersReducer";
import rawOrders from "../data/orders";

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  useEffect(() => {
    // Simulate async API fetch
    dispatch({ type: "FETCH_START" });
    try {
      // Filter valid orders: ignore items with quantity < 0
      const validOrders = rawOrders.map(order => ({
        ...order,
        customerName: order.customerName || "Unknown",
        items: order.items.filter(item => item.quantity >= 0)
      })).filter(order => order.items.length > 0);

      dispatch({ type: "FETCH_SUCCESS", payload: validOrders });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  }, []);

  return (
    <OrdersContext.Provider value={{ state, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used within OrdersProvider");
  return context;
}
